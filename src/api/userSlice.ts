import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userSlice = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/admin`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    users: builder.query({
      query: () => '/users',
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: { role },
      }),
    }),
  }),
});

export const { useUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = userSlice;
export default userSlice;
