import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getMeRequest, loginRequest, registerRequest } from "../api/auth";
import { updateLastLoginManagedUser } from "../api/users";
import { UserCredential } from "../models/auth";

type UserInfo =
  | {
      state: LoginState.LOGGED_OUT;
    }
  | ({ state: LoginState.LOGGED_IN } & User);

export type User = {
  id: string;
  userName: string;
  lastLogin?: Date;
  refreshToken: string;
};
interface IAuthContext {
  userInfo: UserInfo | null;
  login: ({ userName, password }: UserCredential) => Promise<AuthStatus>;
  logout: () => Promise<void>;
  register: ({ userName, password }: UserCredential) => Promise<AuthStatus>;
  //   changePassword: (
  //     password: NewPasswordWithConfirmation
  //   ) => Promise<AuthStatus>;
  // resetPassword: (email: string) => Promise<AuthStatus>;
  //   hasAccess: (access: Access, task?: Task) => boolean;
  retrieveUserInfos: () => void;
}

export enum AuthStatus {
  OK,
  WRONG_CREDENTIALS,
  INVALID_FORMAT,
  LOGIN_UNAVAILABLE,
  ERROR,
}

export enum LoginState {
  LOGGED_IN,
  LOGGED_OUT,
}

const AuthContext = createContext<IAuthContext>({
  userInfo: null,
  login: async () => AuthStatus.ERROR,
  logout: async () => {},
  register: async () => AuthStatus.ERROR,
  //   changePassword: async () => AuthStatus.ERROR,
  // resetPassword: async () => AuthStatus.ERROR,
  //   hasAccess: () => true,
  retrieveUserInfos: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);

      const interceptor = axios.interceptors.request.use((config) => {
        if (config?.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      });

      updateUserInfo();

      return () => axios.interceptors.request.eject(interceptor);
    }
    updateUserInfo();
  }, [accessToken, isReady]);

  const retrieveUserInfos = async () => {
    if (!isReady) {
      return;
    }

    if (!accessToken) {
      setUserInfo({ state: LoginState.LOGGED_OUT });
    }

    try {
      const me = await getMeRequest();
      if (me) {
        setUserInfo({
          state: LoginState.LOGGED_IN,
          ...(me as {
            id: string;
            userName: string;
            refreshToken: string;
          }),
        });
      } else {
        setUserInfo({ state: LoginState.LOGGED_OUT });
      }
    } catch {
      setUserInfo({ state: LoginState.LOGGED_OUT });
    }
  };
  const updateUserInfo = async () => {
    if (!isReady) {
      return;
    }

    if (!accessToken) {
      setUserInfo({ state: LoginState.LOGGED_OUT });
    }
    try {
      const me = await getMeRequest();
      const info = await updateLastLoginManagedUser();
      if (info) {
        setUserInfo({
          state: LoginState.LOGGED_IN,
          ...info,
          lastLogin: me.lastLogin,
        });
      } else {
        setUserInfo({ state: LoginState.LOGGED_OUT });
      }
    } catch (e) {
      setUserInfo({ state: LoginState.LOGGED_OUT });
    }
  };
  const login = async ({
    userName,
    password,
  }: UserCredential): Promise<AuthStatus> => {
    try {
      const result = await loginRequest(userName, password);

      if (!result) {
        //Unknown error
        return AuthStatus.ERROR;
      }
      setAccessToken(result.access_token);

      localStorage.setItem("refreshToken", result.refresh_token);
      setUserInfo(null); //Forces router to wait until user data has been re-retrieved

      return AuthStatus.OK;
    } catch (err) {
      if (axios.isAxiosError(err) && err.request.status === 401) {
        //Wrong credentials
        return AuthStatus.WRONG_CREDENTIALS;
      }
      return AuthStatus.ERROR;
    }
  };
  const logout = async () => {
    setAccessToken(null);
    setUserInfo(null); //Forces router to wait until user data has been re-retrieved
    updateLastLoginManagedUser();
    localStorage.setItem("accessToken", "");
  };
  const register = async ({
    userName,
    password,
  }: UserCredential): Promise<AuthStatus> => {
    try {
      const result = await registerRequest(userName, password);

      if (!result) {
        return AuthStatus.ERROR;
      }
      localStorage.setItem("refreshToken", result.refresh_token);
      setAccessToken(result.access_token);
      console.log(result);
      return AuthStatus.OK;
    } catch (err) {
      console.log("register error");
      if (axios.isAxiosError(err)) {
        if (err.request.status === 400) {
          //Wrong credentials
          return AuthStatus.INVALID_FORMAT;
        }
        if (err.request.status === 409) {
          //Email already used
          return AuthStatus.LOGIN_UNAVAILABLE;
        }
      }
      return AuthStatus.ERROR;
    }
  };
  // const hasAccess = (access: Access, task?: Task) =>
  //   !task ||
  //   (userInfo?.state === LoginState.LOGGED_IN &&
  //     userInfo.role?.roleAccess.some(
  //       (el) =>
  //         el.task === task &&
  //         (el.access === Access.BOTH || el.access === access)
  //     ));

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
        register,
        // changePassword,
        // resetPassword,
        // acceptConditions,
        // hasAccess,
        retrieveUserInfos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext<IAuthContext>(AuthContext);
