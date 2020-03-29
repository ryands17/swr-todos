import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { SWRConfig } from 'swr'
import './App.css'
import { AddTodo } from 'components/AddTodo'
import { TodoList } from 'components/TodoList'
import { UpdateAppToast } from 'components/UpdateAppToast'

export const App: React.FC = () => {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args: [string, AxiosRequestConfig]) => {
          const res = await axios(...args)
          return res.data
        },
      }}
    >
      <UpdateAppToast />
      <div className="todoapp">
        <AddTodo />
        <TodoList />
      </div>
    </SWRConfig>
  )
}
