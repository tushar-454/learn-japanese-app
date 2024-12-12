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
  }),
});

export const { useVocabularyQuery } = vocabularySlice;
export default vocabularySlice;
