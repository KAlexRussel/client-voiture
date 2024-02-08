import { createSlice } from '@reduxjs/toolkit';
import { TUserAccountState } from 'src/types/user';

const initialState: TUserAccountState = {
  isLoading: false,
  profil: null,
  error: null,
  passeTrajet: [],
  comingTrajet: null,
};

const userAccount = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    //  START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //  HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //  GET User Profil
    getUserProfil(state, action) {
      state.isLoading = false;
      state.profil = action.payload;
    },
    //  GET passe Trajet
    getPasseTrajet(state, action) {
      state.isLoading = false;
      state.passeTrajet = action.payload;
    },
    //  GET coming Trajet
    getComingTrajet(state, action) {
      state.isLoading = false;
      state.comingTrajet = action.payload;
    },
  },
});

// to root reducer
export default userAccount.reducer;

// to action
export const { getUserProfil, getPasseTrajet, startLoading, hasError } = userAccount.actions;