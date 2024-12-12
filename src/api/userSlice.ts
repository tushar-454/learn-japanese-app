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
  }),
});

export const { useUsersQuery } = userSlice;
export default userSlice;
