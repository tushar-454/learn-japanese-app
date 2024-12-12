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
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/admin/lessons/${id}`,
        method: 'DELETE',
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ id, lesson_name, lesson_number, vocabulary }) => ({
        url: `/admin/lessons/${id}`,
        method: 'PUT',
        body: { lesson_name, lesson_number, vocabulary },
      }),
    }),
    createLesson: builder.mutation({
      query: ({ lesson_name, lesson_number }) => ({
        url: `/admin/lessons`,
        method: 'POST',
        body: { lesson_name, lesson_number },
      }),
    }),
  }),
});

export const {
  useLessonsQuery,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
  useCreateLessonMutation,
} = lessonSlice;
export default lessonSlice;
