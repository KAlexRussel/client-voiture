import axios, { API_ENDPOINTS } from 'src/utils/axios';

// Send a new message
export const sendNewMsgService = async (data: any) => {
    const response = await axios.post(API_ENDPOINTS.review.addReview, data);
    return response;
  };