import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5500/api/todos", // sever base Url
  }),
  endpoints: (builder) => ({

    getTodos: builder.query({
      query: () => "/", // GET /api/todos
      // Transform Error response according to need and based on the server response
      transformErrorResponse: (response) => {
        return  response.data?.error;
      },
    }),
    addTodo: builder.mutation({
      query: (newTodo) =>({
        url: '/', // POST /api/todos
        method: 'POST',
        body: newTodo
      })
    })
    
  }),
});

export const { useGetTodosQuery } = todosApi;
