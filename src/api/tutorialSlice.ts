import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tutorialSlice = createApi({
  reducerPath: 'tutorials',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    tutorials: builder.query({
      query: () => '/tutorials',
    }),
  }),
});

export const { useTutorialsQuery } = tutorialSlice;
export default tutorialSlice;
