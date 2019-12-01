import React from 'react'
import './App.css'
import { AddTodo } from 'components/AddTodo'
import { TodoList } from 'components/TodoList'

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <AddTodo />
      <TodoList />
    </div>
  )
}
