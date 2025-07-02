"use client";

import { useNavigate } from "react-router-dom";
import AdminTabsPage from "../../components/AdminTabsPage";
import { LoginState, useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function AdminPage() {
  const { userInfo, isAuthReady } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthReady) return;

    if (!userInfo || userInfo.state == LoginState.LOGGED_OUT) {
      navigate("/login");
    }
  }, [userInfo, isAuthReady]);

  return (
    <div style={{ height: "100%" }}>
      <AdminTabsPage />
    </div>
  );
}
