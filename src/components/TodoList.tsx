import * as React from 'react'
import { useQuery } from 'react-query'
import { TodoItem } from './TodoItem'
import { fetchTodos } from 'services/todos'

export const TodoList: React.FC = () => {
  const { data: todos } = useQuery('todos', fetchTodos, {
    staleTime: 10000,
  })
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
        {todos && todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    </section>
  )
}
