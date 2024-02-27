import React from "react";
import styles from "../assets/auth.module.css";

const LoginForm = () => {
  return (
    <div className={styles.authbox}>
      <div className={styles.content}>
        <header>
          <h1 className={styles.authtitle}>Welcome back</h1>
        </header>
        <section>
          <form action="" className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label className={styles.labelstyle} for="username">
                Username
              </label>
              <input type="text" placeholder="Enter username" id="username" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.labelstyle} for="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
              />
            </div>
            <div className={styles.inputGroup}>
              <button className={styles.buttonstyle}>Login</button>
            </div>
          </form>
        </section>
        <footer>
          <span>
            Dont have an account yet?{" "}
            <a href="/register" title="Forgot Password">
              Create One.
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default LoginForm;
