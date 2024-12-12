import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const lessonSlice = createApi({
  reducerPath: 'lessons',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    lessons: builder.query({
      query: () => '/lessons',
    }),
  }),
});

export const { useLessonsQuery } = lessonSlice;
export default lessonSlice;
