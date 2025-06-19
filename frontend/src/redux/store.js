import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./slices/todosSlice";
import { todosApi } from "./rtkQuery/apiSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    // Adding the todosApi to store
    [todosApi.reducerPath]: todosApi.reducer,
  },
   // Adding the api middleware enables caching, invalidation, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
