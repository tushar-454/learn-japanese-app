import { createSlice } from '@reduxjs/toolkit';

export interface InitialAuthSlices {
  isLoading: boolean;
  isError: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
    photo: string;
    role: string;
  };
}

const initialState: InitialAuthSlices = {
  isLoading: true,
  isError: false,
  user: null,
};

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUser: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.user = payload;
    },
    logoutUser: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.user = null;
    },
  },
});

export const { storeUser, logoutUser } = authSlices.actions;
export default authSlices.reducer;
