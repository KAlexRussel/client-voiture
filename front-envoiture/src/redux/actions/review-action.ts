import { Dispatch } from '@reduxjs/toolkit';
import { createReviewService, getUserReviewService } from 'src/services/reviews-service';
import { TReviewNew } from 'src/types/reviews';
import { getUserReview, newReview, startLoading } from '../reducer/review-reducer';

export function getUserReviewAction(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await getUserReviewService(id); // user avec l'id 1 pour mes tests
      dispatch(getUserReview(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addNewReviewAction(data: TReviewNew) {
    return async (dispatch: Dispatch) => {
      dispatch(startLoading());
      try {
        const res = await createReviewService(data);
        dispatch(getUserReview(res.data.data));
        dispatch(newReview(res.data.data))
      } catch (error) {
        console.error(error);
      }
    };
  }
