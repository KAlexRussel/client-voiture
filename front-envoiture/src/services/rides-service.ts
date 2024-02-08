import { TPlacenter, TRides, TSearchRide } from 'src/types/ride';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// Get price calculate
export const getRidePriceService = async (data: TPlacenter) => {
  const response = await axios.post(API_ENDPOINTS.rides.price, data);
  return response;
};

// Create a new ride
export const createRideService = async (data: TRides) => {
  const response = await axios.post(API_ENDPOINTS.rides.create, data);
  return response;
};

// search a ride
export const searchRideService = async (data: TSearchRide) => {
  const response = await axios.get(API_ENDPOINTS.rides.searchRide(data.start, data.end, data.startAt, data.availablePlaces));
  return response;
};

// delete a ride
export const deleteRideByIdService = async (id: number) => {
  const response = await axios.delete(API_ENDPOINTS.rides.delete(id));
  return response;
};