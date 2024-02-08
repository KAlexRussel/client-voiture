import { Dispatch } from '@reduxjs/toolkit';
import {
  addUserAvatarByIdService,
  addUserDocumentByIdService,
  addUserStripeAccountService,
  getUserBookingsByIdService,
  getUserByIdService,
  updateUserByIdService,
} from 'src/services/user-service';
import {
  TDocument,
  TStripeAccount,
  TUser,
  TUserProfilImage,
  TUserUpdateInfo,
  TVehicle,
} from 'src/types/account';
import {
  addUserVehicleByIdService,
  getUserVehicleByIdService,
  updateUserVehicleByIdService,
} from 'src/services/vehicle-service';
import {
  activatePaymentAccount,
  addUserProfilImage,
  getUserBookingInformation,
  getUserProfil,
  getUserVehicleInformation,
  startLoading,
} from '../reducer/account-reducer';


export function getAccountProfilAction(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await getUserByIdService(id);
      dispatch(getUserProfil(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateAccountProfilAction(id: number, data: TUserUpdateInfo) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await updateUserByIdService(id, data);
      dispatch(getUserProfil(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addUserDocumentsAction(id: number, data: TDocument) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await addUserDocumentByIdService(id, data);
      dispatch(getUserProfil(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addUserVehicleAction(data: TVehicle) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await addUserVehicleByIdService(data);
      dispatch(getUserVehicleInformation(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addAvatarAction(id: number, data: TUserProfilImage) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await addUserAvatarByIdService(id, data);
      console.log(res);
      dispatch(addUserProfilImage(res.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function getUserVehicleAction(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await getUserVehicleByIdService(id);
      dispatch(getUserVehicleInformation(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function updateUserVehicleAction(id: number, data: TVehicle) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await updateUserVehicleByIdService(id, data);
      dispatch(getUserVehicleInformation(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function getCurrentUserBookingsAction(userId: number) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await getUserBookingsByIdService(userId);
      dispatch(getUserBookingInformation(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function activatePaymentAccountAction(data: TStripeAccount) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await addUserStripeAccountService(data);
      console.log('ttt', res.data)
      // dispatch(activatePaymentAccount(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}
