import React from "react";
import Sidebar from "../components/sidebar";
import News from "../components/news";

function NewsPage() {
  return (
    <>
      <div className="flex flex-row h-screen bg-gray-800">
        <Sidebar></Sidebar>
        <div className="flex flex-grow flex-col p-8 ml-60 ">

        <News></News>
        </div>

      </div>
    </>
  );
}
export default NewsPage;
