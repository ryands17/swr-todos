import { post, put, xdelete, get } from './index'
import { baseUrl } from 'config/utils'
import { Todo, Todos } from 'config/types'

export const todosUrls = {
  todos: `${baseUrl}/todos`,
}

export const fetchTodos = get<Todos>(todosUrls.todos)

export const addTodo = post<Todo>(todosUrls.todos)

export const editTodo = put<Todo>(todosUrls.todos)

export const deleteTodo = xdelete(todosUrls.todos)
