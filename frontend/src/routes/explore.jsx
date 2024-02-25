import React from "react";

import Sidebar from "../components/sidebar";
import StockSearch from "../components/stock-search";

function Explore() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar></Sidebar>

        <StockSearch></StockSearch>
      </div>
    </>
  );
}
export default Explore;
