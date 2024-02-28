import React, { useState } from "react";
import SymbolOverview from "./stock-widgets/symbol-overview";
import useDeepCompareEffect from "use-deep-compare-effect";
import { StockSummary } from "./stock-widgets/stock-chart";
import PortfolioSummary from "./stock-widgets/portfolio-summary";
import API from "../services/api-service";

const Home = () => {
  let [stocks, setStocks] = useState([]);
  let [selectedStock, setSelectedStock] = useState("GOOG");
  let [summaryData, setSummaryData] = useState([]);

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

    const fetchandSetSummaryData = () => {
      API.portfolioHistory(1).then(setSummaryData).catch(console.error);
      console.log("Fetched summary data");
    }

    // get stocks and portfolio history once on page load
    fetchAndSetStocks();
    fetchandSetSummaryData();

    // update stocks every minute
    const intervalId = setInterval(fetchAndSetStocks, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [stocks]);

  

  return (
    <>
      <div className="flex flex-grow flex-col p-8 ml-60">
        <h1 className="pb-8 text-white font-bold text-4xl">Portfolio</h1>
        <div className="flex flex-col justify-center items-center">
          <PortfolioSummary summaryData={summaryData} />
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
