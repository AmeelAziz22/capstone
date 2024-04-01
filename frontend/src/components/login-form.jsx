import React from "react";
import styles from "../assets/auth.module.css";
import API from "../services/api-service";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';




const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault(); 
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    API.token(username, password)
    .then(data => {
      console.log('Token response:', data);
      if (data.message) {
        // Authentication successful
        console.log('Authentication successful');
        // Redirect or set authentication state
        Cookies.set('user_id', data.user_id, { expires: 7 });
        navigate('/portfolio');
      } else {
        // Authentication failed
        console.log("invalid")
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error here
    });
    
  }
  return (
    <div className={styles.authbox}>
      <div className={styles.content}>
        <header>
          <h1 className={styles.authtitle}>Welcome back</h1>
        </header>
        <section>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label className={styles.labelstyle} htmlFor="username">
                Username
              </label>
              <input type="text" placeholder="Enter username" id="username" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.labelstyle} htmlFor="password">
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
