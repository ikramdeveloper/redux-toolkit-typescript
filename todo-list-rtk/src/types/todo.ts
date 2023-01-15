export interface TodoInterface {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoResult {
  todos: TodoInterface[];
}
