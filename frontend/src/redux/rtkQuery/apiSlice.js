import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5500/api/todos", // sever base Url
  }),
  // Tags for cache Invalidation
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/", // GET /api/todos
      // Transform Error response according to need and based on the server response
      transformErrorResponse: (response) => {
        return response.data?.error || "Something went wrong!";
      },
      providesTags: (result) =>
        result
          ? [
              // Tag each individual Todo
              ...result.map((todo) => ({ type: "Todos", id: todo._id })),
              // Tag the entire list
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }], // Tag the entire list even if api call fails
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/", // POST /api/todos
        method: "POST",
        body: newTodo,
      }),
      transformErrorResponse: (response) => {
        return response.data?.error || "Something went wrong!";
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }], // Invalidate the whole Todo's list on add or delete operation
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`, // Delete /api/:id
        method: "DELETE",
      }),
      transformErrorResponse: (response) => {
        return response.data?.error || "Something went wrong!";
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }], // Invalidate the whole Todo's list on add or delete operation
    }),
    updateTodoTitle: builder.mutation({
      query: ({ id, updatingTitle }) => ({
        url: `/${id}`, // Patch /api/:id
        method: "PATCH",
        body: { title: updatingTitle },
      }),
      transformErrorResponse: (response) => {
        return response.data?.error || "Something went wrong!";
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Todos", id }], // Invalidate only a specific Todo on update
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoTitleMutation,
} = todosApi;
