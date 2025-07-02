"use client";

import styles from "./login.module.css";
import FormLogin from "./FormLogin";

export default function Login() {
  return (
    <div className={styles.loginBody}>
      <h2>Connexion</h2>
      <FormLogin />
    </div>
  );
}
