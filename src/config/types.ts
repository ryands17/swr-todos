export type Todo = {
  id: string
  title: string
  completed: boolean
}

export type Todos = Todo[]

export type QueryTodo = Todos | undefined
