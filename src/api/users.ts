import axios from "axios";
import { User } from "../contexts/AuthContext";

export const updateLastLoginManagedUser = async (): Promise<User> => {
  return (await axios.patch("/users/last-login")).data;
};
