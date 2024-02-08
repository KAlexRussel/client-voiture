
export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  authUser: AuthUserType;
};

// ----------------------------------------------------------------------

type CanRemove = {
  login?: (email: string, password: string) => Promise<void>;
  register?: (
    email: string,
    password: string,
    fname: string,
    lname: string,
    birthDate: string,
    phoneNumber: string,
    sex: string,
    confirmPassword: string
  ) => Promise<void>;
  //
  verifyCode?: (email: string, otp: string) => Promise<void>;
  forgotPassword?: (email: string) => Promise<void>;
  newPassword?: (email: string, otp: string, password: string) => Promise<void>;
};

export type JWTContextType = CanRemove & {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyCode: (email: string, otp: string) => Promise<void>;
  register: (email: string, password: string, fname: string, lname: string, birthDate: string, phoneNumber: string, sex: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  newPassword: (email: string, otp: string, password: string) => Promise<void>;
};
