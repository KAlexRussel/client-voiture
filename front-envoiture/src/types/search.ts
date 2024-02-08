export type TTrajetTableFilterValue = string | string[] | Date | number | null;

export type TTrajetFilters = {
  type: string;
  bagage: string;
  animal: string;
  price: number;
};

export type TTrajetTableFilters = {
  from: string;
  to: string;
  date: string | Date;
  price: number;
  nbPassenger: number | string;
  type: string;
};

export type TReview = {
  name: string;
  age: number;
  image: string;
  trajetDate: string;
  comment: string;
  rate: number;
};

export type TPublisher = {
  name: string;
  age: number ;
  rating: number;
  carName: string;
  carImage?: string;
  profilImage: string;
  phoneNumber: string;
  review: TReview[];
};

export type TTrajet = {
  id?: number;
  from: string;
  to: string;
  date: string | Date;
  price: number;
  nbPassenger: number | string;
  availablePlace: number;
  type: string;
  animal: string;
  bagage: string;
  TrajetPublisher: TPublisher;
};

export type TSearch = {
  from: string;
  to: string;
  date: string | Date | null;
  // price?: string | number;
  nbPassenger: number;
  // type?: string
};

export type CityData = {
  place_name: string;
  center: [number, number]; // longitude, lagitude
};

export type TSearchState = {
  trajets: TTrajet[];
  searchResult: TTrajet[];
  trajet: TTrajet | null;
  isLoading: boolean;
  error: null;
  searchItems: TSearch;
  searchCityList: any[]
};
