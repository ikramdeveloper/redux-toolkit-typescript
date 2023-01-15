import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TODO_BASE_URL, DEFAULT_USER_ID } from "../constants";
import { TodoInterface } from "../types/todo";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: TODO_BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoInterface[], void>({
      query: () => "/",
      transformResponse: (res: any) =>
        res.sort((a: TodoInterface, b: TodoInterface) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<TodoInterface, Partial<TodoInterface>>({
      query: ({ todo }) => {
        const newTodo = { todo } as TodoInterface;
        newTodo.completed = false;
        newTodo.userId = DEFAULT_USER_ID;
        return {
          url: "/",
          method: "POST",
          body: newTodo,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<TodoInterface, TodoInterface>({
      query: (todo) => ({
        url: `/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<Partial<TodoInterface>, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
