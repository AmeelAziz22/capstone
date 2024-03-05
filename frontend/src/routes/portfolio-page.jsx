import React from "react";
import Sidebar from "../components/sidebar";
import Portfolio from "../components/portfolio-component";

function Main() {
  return (
    <>
      <div className="flex flex-row bg-gray-800 ">
        <Sidebar></Sidebar>
        <Portfolio></Portfolio>
      </div>
    </>
  );
}

export default Main;
