import React from "react";

import Sidebar from "../components/sidebar";
import FAQ from "../components/faq";

function FaqPage() {
  return (
    <>
      <div className="flex flex-row h-screen bg-gray-800">
        <Sidebar></Sidebar>
        <div className="flex flex-grow flex-col p-8 ml-60 ">
        <FAQ></FAQ>
        </div>
      </div>
    </>
  );
}
export default FaqPage;
