import { configureStore } from "@reduxjs/toolkit";

import { todosApi } from "./rtkQuery/todosApi";
import authReducer from "./slices/authSlice";
import { authApi } from "./rtkQuery/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Adding the todosApi to store
    [todosApi.reducerPath]: todosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todosApi.middleware)
      .concat(authApi.middleware),
});
