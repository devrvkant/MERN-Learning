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
      // Optimistic Update
      onQueryStarted: async (newTodo, { dispatch, queryFulfilled }) => {
        // create the tempId
        const tempId = `temp-${Date.now()}`;
        // Optimistically update the cache
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.push({
              _id: tempId, // Temporary Id & completed false manually because server not added this todo yet
              ...newTodo,
              completed: false,
              isPending: true, // for differenciating and avoiding userActions on tempTodo
            });
          })
        );
        try {
          // waiting for realTodo from server so we can merge optimistic state with real ServerState manually
          const { data: realTodo } = await queryFulfilled;
          // now replace it manually
          dispatch(
            todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
              const index = draft.findIndex((todo) => todo._id === tempId);
              if (index !== -1) {
                draft[index] = {
                  ...realTodo,
                  isPending: false, // after getting server response enable the user actions
                };
              } // replace with realTodo(serverState)
            })
          );
        } catch {
          // Revert optimistic update on error
          patchResult.undo();
        }
      },
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
    updateTodoStatus: builder.mutation({
      query: ({ id, updatingStatus }) => ({
        url: `/${id}`, // Patch /api/:id
        method: "PATCH",
        body: { completed: updatingStatus },
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
  useUpdateTodoStatusMutation,
} = todosApi;
