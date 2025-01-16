import axios from "axios";
import { User } from "../contexts/AuthContext";

export const getMeRequest = async (): Promise<User> => {
  return await axios.get("/users/me");
};

export const loginRequest = async (
  userName: string,
  password: string
): Promise<{ access_token: string; refresh_token: string }> => {
  return (await axios.post("/auth/login", { userName, password })).data;
};
export const registerRequest = async (
  userName: string,
  password: string
): Promise<{ access_token: string; refresh_token: string }> => {
  const res = await axios.post("/auth/signin", { userName, password });
  return res.data;
};
