import { post, patch, xdelete } from './index'
import { baseUrl } from 'config/env'

export const todosUrls = {
  todos: `${baseUrl}/todos`,
}

export const addTodo = post(todosUrls.todos)

export const editTodo = patch(todosUrls.todos)

export const deleteTodo = xdelete(todosUrls.todos)
