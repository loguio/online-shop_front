import { Route, Routes } from "react-router-dom";
import NoMatch from "../pages/NoMatch";
import { Login } from "../pages/auth/Login";
import { LoginState, useAuth } from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import AdminPage from "../pages/admin/AdminPage";
import ProductPage from "../pages/products/page";
import ProductDetailPage from "../pages/products/[id]/ProductDetail";
import PayementPage from "../pages/payement/Payement";
import PayementSuccess from "../pages/payement/success/PayementSucess";
import PayementCancel from "../pages/payement/cancel/PayementCancel";
import CartPage from "../pages/cart/CartPage";
import Header from "../components/header/header";
import Home from "../pages/page";
import Profile from "../pages/profile/Profile";

const AppRoot = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <Header></Header>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="login" element={<Login signin={false} />} />
        <Route path="signin" element={<Login signin />} />
        <Route path="products" element={<ProductPage />}>
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
        {userInfo?.state == LoginState.LOGGED_IN && (
          <>
            <Route path="profil" element={<Profile />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="payement" element={<PayementPage />}>
              <Route path="success" element={<PayementSuccess />} />
              <Route path="success" element={<PayementCancel />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
};
export default AppRoot;
