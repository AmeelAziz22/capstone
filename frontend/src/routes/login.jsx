import React from "react";
import LoginForm from "../components/login-form";
import '../assets/auth.css'
import logo from '../assets/logo.svg';


function Login() {
  return (
    <>
      <div className="wrap bg-gray-800">
        <a className="logow" href="/#">
            <img
                class="w-auto h-7"
                src={logo}
                alt=""
            />
        </a>
        <LoginForm/>
      </div>
    </>
  );
}
export default Login;
