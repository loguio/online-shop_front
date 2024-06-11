import { Route, Routes } from "react-router-dom";
import NoMatch from "../pages/NoMatch";
import HeadBar from "../pages/Layout/HeadBar";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/Home";
import { Signup } from "../pages/auth/Signup";

const AppRoot = () => (
  <HeadBar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </HeadBar>
);
export default AppRoot;
