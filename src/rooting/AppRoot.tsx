import { Route, Routes } from "react-router-dom";
import NoMatch from "../pages/NoMatch";
import HeadBar from "../pages/Layout/HeadBar";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/Home";
import { Profil } from "../pages/Profile";
import { LoginState, useAuth } from "../contexts/AuthContext";

const AppRoot = () => {
  const { userInfo } = useAuth();
  return (
    <HeadBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login signin={false} />} />
        <Route path="signin" element={<Login signin />} />
        <Route path="*" element={<NoMatch />} />
        {userInfo?.state == LoginState.LOGGED_IN && (
          <Route path="profil" element={<Profil />} />
        )}
      </Routes>
    </HeadBar>
  );
};
export default AppRoot;
