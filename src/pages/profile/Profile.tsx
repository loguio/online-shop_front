"use client";
import styles from "./profil.module.css";
import FormProfil from "./FormProfil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginState, useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { userInfo, isAuthReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthReady) return;

    if (!userInfo || userInfo.state == LoginState.LOGGED_OUT) {
      navigate("/login");
    }
  }, [userInfo, isAuthReady]);
  return (
    <div className={styles.loginBody}>
      <h2 className="">Mon Profile</h2>
      <FormProfil />
    </div>
  );
}
