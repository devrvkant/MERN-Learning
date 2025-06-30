import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
    verifyEmail: builder.mutation({
      query: (verificationOTP) => ({
        url: "/verify-email",
        method: "POST",
        body: { verificationOTP },
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Something went wrong!";
      },
    }),
  }),
});

export const { useSignUpMutation, useVerifyEmailMutation } = authApi;
