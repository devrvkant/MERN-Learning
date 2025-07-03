import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { clearUser, setUser } from "../slices/authSlice";

// Define the apiSlice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5500/api/auth", // sever base Url
    credentials: "include", // include cookies if your backend sets httpOnly cookies
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/signup", // POST /api/auth/signup
        method: "POST",
        body: { name, email, password },
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
      // here not because stil user has unverified account not a proper verified & authenticated Account which is firstly happens when email is also verified
    }),
    logIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login", // POST /api/auth/login
        method: "POST",
        body: { email, password },
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const user = data.user;
          dispatch(setUser(user));
        } catch (err) {
          dispatch(clearUser());
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/logout", // POST /api/auth/logout
        method: "POST",
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Clear user data on successful logout
          dispatch(clearUser());
        } catch (err) {
          // Even if server logout fails, clear local state for security
          dispatch(clearUser());
        }
      },
    }),
    verifyEmail: builder.mutation({
      query: (verificationOTP) => ({
        url: "/verify-email", // POST /api/auth/verify-email
        method: "POST",
        body: { verificationOTP },
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const user = data.user;
          // Set the user data in the state after successful email verification
          dispatch(setUser(user));
        } catch (err) {
          dispatch(clearUser());
        }
      },
    }),
    checkAuth: builder.query({
      query: () => "/check-auth", // GET /api/auth/check-auth
      transformResponse: (response) => {
        return response.user;
      },
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          dispatch(clearUser());
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password", // POST /api/auth/forgot-password
        method: "POST",
        body: { email },
      }),
      transformResponse: (response) => {
        return response?.message || "Password reset link sent to your email.";
      },
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/reset-password/${token}`, // PATCH /api/auth/reset-password/:token
        method: "PATCH",
        body: { password },
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Invalid or expired reset link!";
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCheckAuthQuery,
  useLogOutMutation,
} = authApi;
