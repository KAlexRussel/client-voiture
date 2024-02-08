import { TStripeAccount } from 'src/types/account';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// Get user by id
export const getUserByIdService = async (id: number) => {
  const response = await axios.get(API_ENDPOINTS.user.getById(id));
  return response;
};

// update user by id
export const updateUserByIdService = async (id: number, data: any) => {
  const response = await axios.patch(API_ENDPOINTS.user.getById(id), data);
  return response;
};

// add user document by id
export const addUserDocumentByIdService = async (id: number, data: any) => {
  const response = await axios.post(API_ENDPOINTS.user.addDocument(id), data);
  return response;
};

// add user profil image by id
export const addUserAvatarByIdService = async (id: number, data: any) => {
  const response = await axios.post(API_ENDPOINTS.user.addProfilImage(id), data);
  return response;
};

// get user rides by id
export const getUserRidesByIdService = async (userId: number) => {
  const response = await axios.get(API_ENDPOINTS.user.getAllUserRides(userId));
  return response;
};

// get user bookings by id
export const getUserBookingsByIdService = async (userId: number) => {
  const response = await axios.get(API_ENDPOINTS.user.getAllUserBooking(userId));
  return response;
};

// add user stripe account
export const addUserStripeAccountService = async (data: TStripeAccount) => {
  const response = await axios.post(API_ENDPOINTS.user.createStripePayment, data);
  return response;
};

// delete user stripe account
export const deleteUserStripeAccountService = async (userId: number) => {
  const response = await axios.delete(API_ENDPOINTS.user.deleteStripePayment(userId));
  return response;
};