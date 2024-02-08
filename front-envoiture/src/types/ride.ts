import { TUser } from "./account";

export type TStep = {
  id: number;
  designation: string;
  updatedAt: string;
  createdAt: string;
};

export type TCalculatePrice = {
  max: number;
  min: number;
  percentage: string;
  recommanded: number;
  distance: number;
  speed: string;
  time: number;
};

export type TPlacenter = {
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
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
  user: any;
};

export type TSearchRide = {
  start: string;
  end: string;
  startAt: string;
  availablePlaces?: number;
};

export type TRidesFilters = {
  type: string;
  isBagAllowed: boolean;
  isAnimalAllowed: boolean;
  price: number;
  isFoodAllowed: boolean,
  isMusicAllowed: boolean,
  isDetourAllowed: boolean
};

export type TRideTableFilterValue = string | string[] | Date | number | boolean | null;

export type TRides = {
  id?: number
  userId: number;
  start: string;
  end: string;
  price: number;
  startAt: string;
  type: string;
  placesNumber: number;
  availablePlaces: number;
  tripTime: number;
  acceptAuctions: boolean;
  isDetourAllowed: boolean;
  isMusicAllowed: boolean;
  isFoodAllowed: boolean,
  isAnimalAllowed: boolean;
  isBagAllowed: boolean;
  isFood: boolean;
  isBookable: boolean;
  user: TUser
};

export type TRideState = {
  calculatedPrice: TCalculatePrice;
  isLoading: boolean;
  newRide: TRides | null;
  searchRidesResult: TRides[];
  selectedRide: TRides | null;
  cityAutocompletList: any[];
  searchItems: any | null,
};
