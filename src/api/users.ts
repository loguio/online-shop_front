import axiosI from "../axiosInterceptor";
import { User } from "../contexts/AuthContext";

export const updateLastLoginManagedUser = async (): Promise<User> => {
  return (await axiosI.patch("/users/last-login")).data;
};
