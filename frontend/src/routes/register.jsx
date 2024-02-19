import React from "react";
import RegisterForm from "../components/register-form";
import '../assets/auth.css'
import logo from '../assets/logo.svg';


function Register() {
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
        <RegisterForm/>
      </div>
    </>
  );
}
export default Register;
