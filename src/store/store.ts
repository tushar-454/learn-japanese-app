import authApi from '@/api/authSlice';
import lessonApi from '@/api/lessonSlice';
import vocabularyApi from '@/api/vocabularySlice';
import userReducer from '@/store/slice/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [vocabularyApi.reducerPath]: vocabularyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(lessonApi.middleware)
      .concat(vocabularyApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
