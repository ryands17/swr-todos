import { patch, put, xdelete, get } from './index'
import { baseUrl } from 'config/env'
import { Todo, Todos } from 'types/Todo'

export const todosUrls = {
  todos: `${baseUrl}/todos`,
}

export const fetchTodos = get<Todos>(todosUrls.todos)

export const addTodo = patch<Todo>(todosUrls.todos)

export const editTodo = put<Todo>(todosUrls.todos)

export const deleteTodo = xdelete(todosUrls.todos)
