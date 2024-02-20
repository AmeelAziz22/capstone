import React, { useState } from "react";
import SymbolOverview from "./stock-widgets/symbol-overview";
import useDeepCompareEffect from "use-deep-compare-effect";
import StockChart from "./stock-widgets/stock-chart";
import API from "../services/api-service";

const Home = () => {
  let [stocks, setStocks] = useState([]);

  // let userID = "user1";

  useDeepCompareEffect(() => {
    const fetchAndSetStocks = () => {
      API.fetchStocks().then(setStocks).catch(console.error);
      console.log("Fetched stocks");
    };

    // get stocks once on page load
    fetchAndSetStocks();

    // update stocks every minute
    const intervalId = setInterval(fetchAndSetStocks, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [stocks]);

  return (
    <>
      <div className="flex flex-grow flex-col p-8 bg-gray-800">
        <h1 className="pb-8 text-white font-bold text-4xl">Portfolio</h1>
        <div className="flex flex-col justify-center items-center">
          <SymbolOverview />
          <br></br>
          <StockChart stocks={stocks} />
        </div>
      </div>
    </>
  );
};

export default Home;
