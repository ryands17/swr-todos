import React, { useState } from 'react'
import { ENTER, uuidv4 } from 'config/utils'
import { useMutation, queryCache } from 'react-query'
import { addTodo } from 'services/todos'
import { Todo } from 'types/Todo'

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('')
  const [mutate] = useMutation(addTodo, {
    onMutate: (newTodo) => {
      // Snapshot the previous value
      const previousTodos = queryCache.getQueryData('todos')

      // Optimistically update to the new value
      queryCache.setQueryData('todos', (old: Todo[]) => [...old, newTodo])

      // Return the snapshotted value
      return () => queryCache.setQueryData('todos', previousTodos)
    },
  })

  return (
    <header className="header">
      <h1 style={{ textTransform: 'uppercase' }}>todos</h1>
      <input
        className="new-todo"
        onChange={({ target }) => setTitle(target.value)}
        onKeyPress={async ({ key }) => {
          if (key === ENTER && title.trim()) {
            let todo = {
              id: uuidv4(),
              title,
              completed: false,
            }
            mutate(todo)
            setTitle('')
          }
        }}
        value={title}
        placeholder="What needs to be done?"
      />
    </header>
  )
}
