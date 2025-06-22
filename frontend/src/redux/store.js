import { configureStore } from "@reduxjs/toolkit";

import { todosApi } from "./rtkQuery/apiSlice";

export const store = configureStore({
  reducer: {
    // Adding the todosApi to store
    [todosApi.reducerPath]: todosApi.reducer,
  },
   // Adding the api middleware enables caching, invalidation, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
