import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    verify: '/otp/verify',
    login: '/login',
    logout: '/logout',
    register: '/register',
    forgotPassword: '/password/request',
    resetPassword: '/password/reset',
  },
  rides: {
    price: '/price',
    getAll: '/rides',
    create: '/rides',
    searchRide: (start: string, end: string, startAt: string, availablePlaces?: number) =>
      `/rides?start[eq]=${start}&&end[eq]=${end}&&startAt[lke]=${startAt}`,
    getById: (id: number) => `/rides/${id}`,
    update: (id: number) => `/rides/${id}`,
    delete: (id: number) => `/rides/${id}`,
  },
  user: {
    getAll: '/users',
    addProfilImage: (userId: number) => `/users/${userId}/image`,
    getById: (id: number) => `/users/${id}`,
    update: (id: number) => `/users/${id}`,
    addDocument: (id: number) => `/documents/${id}`,
    getAllUserRides: (userId: number) => `/rides?userId[eq]=${userId}`,
    getAllUserBooking: (userId: number) => `/bookings?userId[eq]=${userId}`,
    createStripePayment: '/account',
    deleteStripePayment: (userId: number) => `/account/${userId}`,
  },
  review: {
    getAll: '/reviews',
    getByUserId: (userId: number) => `/reviews?userId[eq]=${userId}`,
    getById: (id: number) => `/reviews/${id}`,
    addReview: `/reviews`,
  },
  chat: {
    messages: {
      getAll: '/messages',
      getByUserId: (userId: number) => `/messages?userId[eq]=${userId}`,
      getById: (id: number) => `/messages/${id}`,
      deleteById: (id: number) => `/messages/${id}`,
      addMessage: '/messages',
    },
    conversations: {
      getAll: '/conversations',
      getByUserId: (userId: number) => `/conversations?userId[eq]=${userId}`,
      getById: (id: number) => `/conversations/${id}`,
      deleteById: (id: number) => `/conversations/${id}`,
      newConversation: '/conversations'
    },
    participants: {
      getAll: '/participants',
      getByUserId: (userId: number) => `/participants?userId[eq]=${userId}`,
      getById: (id: number) => `/participants/${id}`,
      deleteById: (id: number) => `/participants/${id}`,
      newConversation: '/participants'
    },
  },
  vehicle: {
    getAll: '/vehicles',
    create: '/vehicles',
    getById: (id: number) => `/vehicles/${id}`,
    update: (id: number) => `/vehicles/${id}`,
    delete: (id: number) => `/vehicles/${id}`,
  },
};
