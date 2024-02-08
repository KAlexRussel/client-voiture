import { useEffect, useCallback, useMemo } from 'react';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { useDispatch, useSelector } from 'src/redux/store';
import { getAccountProfilAction } from 'src/redux/actions/account-action';
import { removeAuthUser, getAuthUser, startLoading } from 'src/redux/reducer/auth-reducer';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const dispatch = useDispatch();
  const { authUser, loading } = useSelector((state) => state.authUser);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
      } else {
        dispatch(removeAuthUser());
      }
    } catch (error) {
      dispatch(removeAuthUser());
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, [initialize, authUser]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const data = {
        email,
        password,
      };

      const response = await axios.post(API_ENDPOINTS.auth.login, data);
      const { token, user } = response.data;
      if (token && user) {
        setSession(token);
        dispatch(startLoading());
        dispatch(getAuthUser(user));
        dispatch(getAccountProfilAction(user.id));
      }
    },
    [dispatch]
  );

  // Verify Code
  const verifyCode = useCallback(
    async (email: string, otp: string) => {
      const data = {
        email,
        otp,
      };

      const response = await axios.post(API_ENDPOINTS.auth.verify, data);
      const { token, user } = response.data;
      if (token) {
        setSession(token);
        dispatch(startLoading());
        dispatch(getAuthUser(user));
        dispatch(getAccountProfilAction(user.id));
      }
    },
    [dispatch]
  );

  // forgot Password
  const forgotPassword = useCallback(
    async (email: string) => {
      const data = {
        email,
      };
      await axios.post(API_ENDPOINTS.auth.forgotPassword, data);
    },
    []
  );

    // reset Password
    const newPassword = useCallback(
      async (email: string, otp: string, password: string) => {
        const data = {
          email,
          otp,
          password
        };
        await axios.post(API_ENDPOINTS.auth.resetPassword, data);
      },
      []
    );

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      fname: string,
      lname: string,
      birthDate: string,
      phoneNumber: string,
      sex: string
    ) => {
      const data = {
        email,
        password,
        fname,
        lname,
        birthDate,
        phoneNumber,
        sex,
      };

      await axios.post(API_ENDPOINTS.auth.register, data);
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch(startLoading());
    dispatch(removeAuthUser());
  }, [dispatch]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = authUser ? 'authenticated' : 'unauthenticated';
  const status = loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: authUser,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      verifyCode,
      forgotPassword,
      newPassword
    }),
    [login, logout, register, verifyCode, forgotPassword, newPassword, authUser, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
