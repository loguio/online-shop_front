import { useEffect, useState } from "react";
import { LoginState, User, useAuth } from "../contexts/AuthContext";

export const Profil = () => {
  const [user, setUser] = useState<User>();
  const { userInfo } = useAuth();
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    const result = userInfo;
    console.log(result);
    if (result && result.state == LoginState.LOGGED_IN) {
      setUser(result);
    }
  };
  return (
    <>
      <h1>Welcome Profil {user?.userName}</h1>
    </>
  );
};
