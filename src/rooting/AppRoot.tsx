import { Route, Routes } from "react-router-dom";
import NoMatch from "../pages/NoMatch";
import HeadBar from "../pages/Layout/HeadBar";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/Home";
import { Profil } from "../pages/Profile";
import { LoginState, useAuth } from "../contexts/AuthContext";
import ArticleCreation from "../pages/admin/ArticleCreation";
import ArticleList from "../pages/admin/ItemList";

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
          <>
            <Route path="profil" element={<Profil />} />
            <Route path="admin" element={<ArticleCreation />} />
            <Route path="articles" element={<ArticleList />} />
          </>
        )}
      </Routes>
    </HeadBar>
  );
};
export default AppRoot;
