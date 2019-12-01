import React, { useRef, useState, useEffect } from 'react'
import cx from 'clsx'
import { Todo } from 'types/Todo'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'
import { patch, xdelete } from 'services/main'
import useSWR, { mutate } from 'swr'
import { baseUrl } from 'config/env'

type ITodoItem = {
  todo: Todo
}

export const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
  const { data } = useSWR<Todo[]>(`${baseUrl}/todos`)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  const handleEdit = ({ title, id }: { title: string; id: string }) => {
    setIsEditing(true)
    setEditTitle(title)
    setEditId(id)
  }

  const handleSubmit = async (id: string) => {
    if (editTitle.trim()) {
      await patch<Todo>(id, {
        title: editTitle,
      })
      if (data) {
        const updatedTodos = [...data]
        let index = updatedTodos.findIndex(t => t.id === todo.id)
        updatedTodos[index].title = editTitle
        mutate(`${baseUrl}/todos`, updatedTodos)
      }
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

  useEffect(() => {
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
          onChange={async () => {
            await patch<Todo>(todo.id, {
              completed: !todo.completed,
            })
            if (data) {
              const updatedTodos = [...data]
              let index = updatedTodos.findIndex(t => t.id === todo.id)
              updatedTodos[index].completed = !updatedTodos[index].completed
              mutate(`${baseUrl}/todos`, updatedTodos)
            }
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
        <button
          className="destroy"
          onClick={async () => {
            await xdelete(todo.id)
            if (data) {
              const updatedTodos = [...data]
              let index = updatedTodos.findIndex(t => t.id === todo.id)
              updatedTodos.splice(index, 1)
              mutate(`${baseUrl}/todos`, updatedTodos)
            }
          }}
        />
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
