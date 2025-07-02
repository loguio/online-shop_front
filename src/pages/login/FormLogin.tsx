"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { AuthStatus, useAuth } from "../../contexts/AuthContext";
import { authStatusToString } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { submitLogin } = useAuth();

  const navigate = useNavigate(); // <-- créer le router

  const submit = async () => {
    if (email && password) {
      const status = await submitLogin({ email, password });
      if (status !== AuthStatus.OK) {
        setErrorMessage(authStatusToString(status));
        return;
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
    navigate("/"); // <-- redirection côté client
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className={styles.formLogin}
    >
      <div>
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

      <div>
        <input
          type="password"
          className={styles.formInputLogin}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {errorMessage && <div>{errorMessage}</div>}

      <button type="submit" className={styles.formButtonLogin}>
        Se connecter
      </button>

      <div>
        <div
          onClick={() => navigate("/register")} // <-- redirection côté client
          className={styles.formAuthMethod}
        >
          Créer un compte
        </div>
      </div>
    </form>
  );
}
