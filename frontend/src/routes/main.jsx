import React from "react";

import Sidebar from "../components/sidebar";
import Home from "../components/home";

function Main() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar></Sidebar>

        <Home></Home>
      </div>
    </>
  );
}
export default Main;
