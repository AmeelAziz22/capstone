import React from "react";
import RegisterForm from "../components/register-form";
import styles from "../assets/auth.module.css";
import logo from "../assets/logo.svg";

function Register() {
  return (
    <div className={`${styles.wrap} bg-gray-800`}>
      <a className={styles.logow} href="/#">
        <img className="w-auto h-7" src={logo} alt="" />
      </a>
      <RegisterForm />
    </div>
  );
}
export default Register;
