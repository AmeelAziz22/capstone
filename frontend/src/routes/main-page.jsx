import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";

function Main() {
  return (
    <div className="flex flex-row bg-gradient-to-tr from-gray-900 to-gray-700 text-white h-screen p-10 justify-center">
      <div className="flex flex-col justify-center items-center">
        <img className="w-auto h-36" src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="h-[250px] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100 "></div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-10">
          Welcome to your personal
          <br />
          AI stock analysis platform
        </h1>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Main;
