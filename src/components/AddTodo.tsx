import React, { useState } from 'react'
import produce from 'immer'
import { ENTER, uuidv4 } from 'config/utils'
import { useMutation, useQueryClient } from 'react-query'
import { addTodo } from 'services/todos'
import { Todos, QueryTodo } from 'config/types'

export const AddTodo: React.FC = () => {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const { mutate } = useMutation(addTodo, {
    onMutate: newTodo => {
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todos>('todos')

      // Optimistically update to the new value
      queryClient.setQueryData<QueryTodo>('todos', todos =>
        produce(todos, draft => {
          draft?.push(newTodo)
        })
      )

      // Return the snapshotted value
      return () => queryClient.setQueryData('todos', previousTodos)
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
