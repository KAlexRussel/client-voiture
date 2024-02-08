export type TLicence = {
  licenseImageRecto: string;
  licenseImageVerso: string;
};

export type TStripeAccount = {
  userId: number,
  url: string
};

export type TUserProfilImage = {
  imageName: string,
}

export type TIdCard = {
  idCardImageRecto: string;
  idCardImageVerso: string;
};

export type TDocument = {
  idCardImageRecto: string;
  idCardImageVerso: string;
  licenseImageRecto: string;
  licenseImageVerso: string;
};

export type TBooking = {
  id: number;
  rideId: number;
  suggestedPrice: number;
  price: number;
  validatedAt: string;
  paymentStatus: string;
  paidAt: string;
  fee: number;
  isValidated: number; //boolean;;
  updatedAt: string;
  createdAt: string;
  createdBy: TUser;
  bookedBy: TUser;
  ride: TRides;
};

export type TStep = {
  id: number;
  designation: string;
  updatedAt: string;
  createdAt: string;
};

export type TRides = {
  id: number;
  start: string;
  end: string;
  price: number;
  startAt: string;
  type: string;
  availablePlaces: number;
  placesNumber: number;
  tripTIme: number;
  acceptAuctions: boolean;
  isDetourAllowed: boolean;
  isMusicAllowed: boolean;
  isAnimalAllowed: boolean;
  isFoodAllowed: boolean;
  isBagAllowed: boolean;
  isBookable: boolean;
  views: string;
  createdAt: string;
  updatedAt: string;
  steps: TStep[];
};

export type TVehicle = {
  id?: number;
  userId: number;
  designation: string;
  description: string;
  imageName?: string;
  isMusicAllowed: boolean | number;
  isAnimalAllowed: boolean | number;
  isBagAllowed: boolean | number;
  isFoodAllowed: boolean | number;
};

export type TUserUpdateInfo = {
  fname: string;
  lname: string;
  birthDate: string;
  phoneNumber: string;
  sex: string;
  isAcceptedAutomatically: boolean;
  isDetourPossible: boolean;
};

export type TUser = {
  id: number;
  email: string;
  fname: string;
  lname: string;
  imageName: string;
  birthDate: string;
  age: string;
  phoneNumber: string;
  isActive: boolean; 
  sex: string;
  paymentAccount: string;
  isAcceptedAutomatically: boolean;
  isDetourPossible: boolean; 
  receivingNewsPapers: boolean; 
  license: TLicence;
  idCard: TIdCard;
  createdBookings: []; //TBooking[]
  reservedBookings: [];
  ride: TRides[];
  vehicle: TVehicle;
  reviews: any[]
};

export type TAccountState = {
  // profil: TUser | null;
  profil: any;
  isLoading: boolean;
  error: null;
};
