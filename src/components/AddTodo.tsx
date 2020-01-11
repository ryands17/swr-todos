import React, { useState } from 'react'
import { ENTER, uuidv4 } from 'config/utils'
import { Todo } from 'types/Todo'
import useSWR, { mutate } from 'swr'
import { todosUrls, addTodo } from 'services/todos'

export const AddTodo: React.FC = () => {
  const { data } = useSWR<Todo[]>(todosUrls.todos)
  const [title, setTitle] = useState('')

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
            await addTodo(todo)
            data && mutate(todosUrls.todos, [...data, todo])
            setTitle('')
          }
        }}
        value={title}
        placeholder="What needs to be done?"
      />
    </header>
  )
}
