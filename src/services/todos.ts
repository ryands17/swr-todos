import { post, patch, xdelete } from './index'
import { baseUrl } from 'config/env'
import { Todo } from 'types/Todo'

export const todosUrls = {
  todos: `${baseUrl}/todos`,
}

export const addTodo = post<Todo>(todosUrls.todos)

export const editTodo = patch<Todo>(todosUrls.todos)

export const deleteTodo = xdelete(todosUrls.todos)
