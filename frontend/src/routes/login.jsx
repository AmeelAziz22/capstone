import React from "react";
import LoginForm from "../components/login-form";
import styles from "../assets/auth.module.css";
import logo from "../assets/logo.svg";

function Login() {
  return (
    <>
      <div className={`${styles.wrap} bg-gray-800`}>
        <a className={styles.logow} href="/#">
          <img class="w-auto h-7" src={logo} alt="" />
        </a>
        <LoginForm />
      </div>
    </>
  );
}
export default Login;
