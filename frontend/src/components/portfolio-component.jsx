import React, { useState } from "react";
import SymbolOverview from "./stock-widgets/symbol-overview";
import useDeepCompareEffect from "use-deep-compare-effect";
import { StockSummary } from "./stock-widgets/stock-chart";
import PortfolioSummary from "./stock-widgets/portfolio-summary";
import API from "../services/api-service";

const Home = () => {
  let [stocks, setStocks] = useState([]);
  let [selectedStock, setSelectedStock] = useState("GOOG");

  let selectStock = (stockSymbol) => {
    console.log("Selected stock: " + stockSymbol);
    setSelectedStock(stockSymbol);
  };

  // let userID = "user1";

  useDeepCompareEffect(() => {
    const fetchAndSetStocks = () => {
      API.fetchStocks(1).then(setStocks).catch(console.error);
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
          <PortfolioSummary />
          <br></br>
          <SymbolOverview selectedStock={selectedStock} />
          <br></br>
          <StockSummary stocks={stocks} selectStock={selectStock} />
        </div>
      </div>
    </>
  );
};

export default Home;
