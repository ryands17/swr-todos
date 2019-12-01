import React, { useState } from 'react'
import { ENTER, uuidv4 } from 'config/utils'
import { post } from 'services/main'
import { Todo } from 'types/Todo'
import { baseUrl } from 'config/env'
import useSWR, { mutate } from 'swr'

export const AddTodo: React.FC = () => {
  const { data } = useSWR<Todo[]>(`${baseUrl}/todos`)
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
            await post<Todo>(todo)
            data && mutate(`${baseUrl}/todos`, [...data, todo])
            setTitle('')
          }
        }}
        value={title}
        placeholder="What needs to be done?"
      />
    </header>
  )
}
