import { createSlice } from '@reduxjs/toolkit';
import { TAccountState } from 'src/types/account';

const initialState: TAccountState = {
  isLoading: false,
  profil: null,
  error: null,
};

const userAccount = createSlice({
  name: 'account',
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
    //  GET User vehicle information
    getUserVehicleInformation(state, action) {
      state.isLoading = false;
      state.profil.vehicle = action.payload;
    },
    //  GET User rides information
    getUserRidesInformation(state, action) {
      state.isLoading = false;
      state.profil.rides = action.payload;
    },
    //  GET User booking information
    getUserBookingInformation(state, action) {
      state.isLoading = false;
      state.profil.createdBookings = action.payload;
    },
    //  GET User booking information
    addUserProfilImage(state, action) {
      state.isLoading = false;
      state.profil.imageName = action.payload.imageName;
    },
    // activate payment account
    activatePaymentAccount(state, action) {
      state.isLoading = false;
      state.profil.paymentAccount = action.payload;
    },
  },
});

// to root reducer
export default userAccount.reducer;

// to action
export const { activatePaymentAccount, addUserProfilImage, getUserProfil, startLoading, hasError, getUserVehicleInformation, getUserBookingInformation, getUserRidesInformation } =
  userAccount.actions;
