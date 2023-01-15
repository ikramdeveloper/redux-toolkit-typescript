import { ReactNode, useState } from "react";
import TodoExcerpt from "./TodoExcerpt";
import AddTodoForm from "./AddTodoForm";
import { useGetTodosQuery } from "../../api/apiSlice";
import { TodoInterface } from "../../types/todo";

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  console.log("todos", todos);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo: TodoInterface) => (
      <TodoExcerpt key={todo.id} todo={todo} />
    ));
  } else if (isError) {
    content = <p>{error as ReactNode}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      <AddTodoForm />
      {content}
    </main>
  );
};
export default TodoList;
