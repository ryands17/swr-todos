import React, { memo } from 'react'
import useSWR from 'swr'
import { Todo } from 'types/Todo'
import { baseUrl } from 'config/env'
import { TodoItem } from './TodoItem'

export const TodoList: React.FC = memo(() => {
  const { data, error } = useSWR<Todo[]>(`${baseUrl}/todos`)

  if (error) return <h3>{error.message}</h3>

  return (
    <section className="main">
      <input
        // onChange={() => toggleAllTasksMutation()}
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        defaultChecked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {data && data.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    </section>
  )
})
