"use client";

import { useState } from "react";
import styles from "./register.module.css";
import { AuthStatus, useAuth } from "../../contexts/AuthContext";
import { authStatusToString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { submitRegister } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    if (email && password && userName) {
      const status = await submitRegister({ email, password });
      if (status != AuthStatus.OK) {
        setErrorMessage(authStatusToString(status));
        return;
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
    navigate("/");
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      // action={""}
      className={styles.formLogin}
    >
      <div className="">
        <input
          type="text"
          className={styles.formInputLogin}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div className="">
        <input
          type="text"
          className={styles.formInputLogin}
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div className="">
        <input
          type="password"
          className={styles.formInputLogin}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {errorMessage && <div className="">{errorMessage}</div>}

      <button type="submit" className={styles.formButtonLogin}>
        Créer un compte
      </button>

      <div className="">
        <div
          onClick={() => navigate("/login")}
          className={styles.formAuthMethod}
        >
          Se connecter
        </div>
      </div>
    </form>
  );
}
