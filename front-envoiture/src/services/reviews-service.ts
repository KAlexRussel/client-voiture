import { TReviewNew } from 'src/types/reviews';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// Create a new review
export const createReviewService = async (data: TReviewNew) => {
  const response = await axios.post(API_ENDPOINTS.review.addReview, data);
  return response;
};

// get user reviews
export const getUserReviewService = async (userId: number) => {
  const response = await axios.get(API_ENDPOINTS.review.getByUserId(userId));
  return response;
};