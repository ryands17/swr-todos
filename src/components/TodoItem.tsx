import * as React from 'react'
import cx from 'clsx'
import { useMutation, queryCache } from 'react-query'
import { Todo } from 'types/Todo'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'
import { deleteTodo, editTodo } from 'services/todos'

type TodoItem = {
  todo: Todo
}

export const TodoItem: React.FC<TodoItem> = ({ todo }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editTitle, setEditTitle] = React.useState('')
  const [editId, setEditId] = React.useState<string | null>(null)

  const [deleteT] = useMutation(deleteTodo, {
    onMutate: (deletedId) => {
      const previousTodos = queryCache.getQueryData('todos')
      queryCache.setQueryData('todos', (old: Todo[]) =>
        old.filter((todo) => todo.id !== deletedId)
      )

      return () => queryCache.setQueryData('todos', previousTodos)
    },
  })

  const [editT] = useMutation(editTodo, {
    onMutate: (edited) => {
      const previousTodos = queryCache.getQueryData('todos') as Todo[]
      const updatedTodos = [...previousTodos]
      const index = updatedTodos.findIndex((todo) => todo.id === edited.id)

      if (index !== -1) {
        updatedTodos[index] = {
          ...updatedTodos[index],
          ...edited.body,
        }
        queryCache.setQueryData('todos', updatedTodos)
      }

      return () => queryCache.setQueryData('todos', previousTodos)
    },
  })

  const handleEdit = ({ title, id }: { title: string; id: string }) => {
    setIsEditing(true)
    setEditTitle(title)
    setEditId(id)
  }

  const handleSubmit = async (id: string) => {
    if (editTitle.trim()) {
      editT({
        id,
        body: {
          title: editTitle,
        },
      })
      setEditTitle('')
      setIsEditing(false)
      setEditId(null)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    if (isEditing) setEditTitle(value)
  }

  const handleKeyUp = ({ which, id }: { which: number; id: string }) => {
    if (which === ESCAPE_KEY) {
      setIsEditing(false)
      setEditTitle('')
      setEditId(null)
    } else if (which === ENTER_KEY) {
      handleSubmit(id)
    }
  }

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [isEditing])

  return (
    <li
      className={cx({
        completed: todo.completed,
        editing: editId === todo.id && isEditing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          onChange={() => {
            editT({
              id: todo.id,
              body: {
                completed: !todo.completed,
              },
            })
          }}
          checked={todo.completed}
          readOnly
          type="checkbox"
        />
        <label
          onDoubleClick={() => handleEdit({ title: todo.title, id: todo.id })}
        >
          {todo.title}
        </label>
        <button className="destroy" onClick={() => deleteT(todo.id)} />
      </div>
      {editId && (
        <input
          className="edit"
          ref={inputRef}
          value={editTitle}
          onChange={handleChange}
          onBlur={() => handleSubmit(todo.id)}
          onKeyUp={({ which }) => handleKeyUp({ which, id: todo.id })}
        />
      )}
    </li>
  )
}
