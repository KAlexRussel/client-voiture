import { createSlice } from '@reduxjs/toolkit';
import { AuthStateType } from 'src/auth/types';

const initialState: AuthStateType = {
  authUser: null,
  loading: true,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //  START LOADING
    startLoading(state) {
      state.loading = true;
    },
    //  GET auth user
    getAuthUser(state, action) {
      state.loading = false;
      state.authUser = action.payload;
    },
    //  GET remove auth user
    removeAuthUser(state) {
      state.loading = false;
      state.authUser = null;
    },
  },
});

// to root reducer
export default user.reducer;

// to action
export const { removeAuthUser, getAuthUser, startLoading } = user.actions;
