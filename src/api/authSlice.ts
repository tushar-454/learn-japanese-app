import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/auth`,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ name, email, password, photo }) => ({
        url: '/register',
        method: 'POST',
        body: { name, email, password, photo },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    token: builder.query({
      query: () => '/token',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        body: {},
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useTokenQuery, useLogoutMutation } = authApi;
export default authApi;
