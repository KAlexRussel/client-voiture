import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { TReviewState } from 'src/types/reviews';

const initialState: TReviewState = {
  isLoading: false,
  reviewList: [],
  newReview: null,
};

const review = createSlice({
  name: 'review',
  initialState,
  reducers: {
    //  START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //  GET user review list
    getUserReview(state, action) {
      state.isLoading = false;
      state.reviewList = action.payload;
    },
    //  new review
    newReview(state, action) {
      state.isLoading = false;
      state.reviewList = action.payload;
    },
  },
});

// to root reducer
export default review.reducer;

// to action
export const { getUserReview, newReview, startLoading } = review.actions;
