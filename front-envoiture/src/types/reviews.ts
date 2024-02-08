export type TReviewNew = {
  userId: any;
  rideId?: number;
  isPrivate: boolean;
  rate: number | null;
  comment: string | null;
};

export type TReview = {
  id: number;
  userId: number;
  rideId: number;
  isPrivate: boolean;
  rate: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  ride: any;
  user: any;
};

export type TReviewState = {
  isLoading: boolean;
  reviewList: TReview[];
  newReview: any;
};
