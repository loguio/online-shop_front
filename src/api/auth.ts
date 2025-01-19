import axiosI from "../axiosInterceptor";
import { User } from "../contexts/AuthContext";

export const getMeRequest = async (): Promise<User> => {
  return await axiosI.get("/users/me");
};

export const loginRequest = async (
  userName: string,
  password: string
): Promise<{ access_token: string; refresh_token: string }> => {
  return (await axiosI.post("/auth/login", { userName, password })).data;
};
export const registerRequest = async (
  userName: string,
  password: string
): Promise<{ access_token: string; refresh_token: string }> => {
  const res = await axiosI.post("/auth/signin", { userName, password });
  return res.data;
};
