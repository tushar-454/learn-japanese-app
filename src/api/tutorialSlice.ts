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
    deleteTutorials: builder.mutation({
      query: (id) => ({
        url: `/admin/tutorials/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTutorials: builder.mutation({
      query: ({ id, title, description, video_url }) => ({
        url: `/admin/tutorials/${id}`,
        method: 'PUT',
        body: { title, description, video_url },
      }),
    }),
    createTutorials: builder.mutation({
      query: ({ title, description, video_url }) => ({
        url: `/admin/tutorials`,
        method: 'POST',
        body: { title, description, video_url },
      }),
    }),
  }),
});

export const {
  useTutorialsQuery,
  useDeleteTutorialsMutation,
  useUpdateTutorialsMutation,
  useCreateTutorialsMutation,
} = tutorialSlice;
export default tutorialSlice;
