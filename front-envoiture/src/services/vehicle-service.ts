import { TVehicle } from 'src/types/account';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// add user Vehicle informations by id
export const addUserVehicleByIdService = async (data: TVehicle) => {
  const response = await axios.post(API_ENDPOINTS.vehicle.create, data);
  return response;
};

// Get user Vehicle informations by id
export const getUserVehicleByIdService = async (id: number) => {
  const response = await axios.get(API_ENDPOINTS.vehicle.getById(id));
  return response;
};

// update user Vehicle informations by id
export const updateUserVehicleByIdService = async (id: number, data: any) => {
  const response = await axios.patch(API_ENDPOINTS.vehicle.update(id), data);
  return response;
};
