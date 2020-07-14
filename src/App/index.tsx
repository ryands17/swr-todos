import * as React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import './App.css'
import { AddTodo } from 'components/AddTodo'
import { TodoList } from 'components/TodoList'
import { UpdateAppToast } from 'components/UpdateAppToast'

export const App: React.FC = () => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen />
      <UpdateAppToast />
      <div className="todoapp">
        <AddTodo />
        <TodoList />
      </div>
    </>
  )
}
