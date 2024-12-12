import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const vocabularySlice = createApi({
  reducerPath: 'vocabulary',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    vocabulary: builder.query({
      query: ({ query }) => `/vocabulary?${query}`,
    }),
    adminVocabulary: builder.query({
      query: () => `/admin/vocabulary`,
    }),
    createVocabulary: builder.mutation({
      query: ({ word, pronunciation, meaning, when_to_say, lesson_no }) => ({
        url: `/admin/vocabulary`,
        method: 'POST',
        body: { word, pronunciation, meaning, when_to_say, lesson_no },
      }),
    }),
    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `/admin/vocabulary/${id}`,
        method: 'DELETE',
        body: {},
      }),
    }),
    updateVocabulary: builder.mutation({
      query: ({ id, word, pronunciation, meaning, when_to_say, lesson_no }) => ({
        url: `/admin/vocabulary/${id}`,
        method: 'PUT',
        body: { word, pronunciation, meaning, when_to_say, lesson_no },
      }),
    }),
  }),
});

export const {
  useVocabularyQuery,
  useAdminVocabularyQuery,
  useCreateVocabularyMutation,
  useDeleteVocabularyMutation,
  useUpdateVocabularyMutation,
} = vocabularySlice;
export default vocabularySlice;
