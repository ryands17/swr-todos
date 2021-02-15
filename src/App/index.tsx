import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { AddTodo } from 'components/AddTodo'
import { TodoList } from 'components/TodoList'
import { UpdateAppToast } from 'components/UpdateAppToast'
import { queryClient } from 'config/utils'

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <UpdateAppToast />
        <AddTodo />
        <TodoList />
      </QueryClientProvider>
    </div>
  )
}
