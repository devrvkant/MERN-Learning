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
      // Optional: Handle errors
      transformErrorResponse: (response) => {
        return  response.data?.error;
      },
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
