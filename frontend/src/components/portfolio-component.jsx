import React, { useState } from "react";
import SymbolOverview from "./stock-widgets/symbol-overview";
import useDeepCompareEffect from "use-deep-compare-effect";
import { StockSummary } from "./stock-widgets/stock-table";
import PortfolioSummary from "./stock-widgets/portfolio-summary";
import API from "../services/api-service";
import Cookies from "js-cookie";

const Home = () => {
  let [stocks, setStocks] = useState([]);
  let [selectedStock, setSelectedStock] = useState("GOOG");
  let [summaryData, setSummaryData] = useState([]);

  let userID = Cookies.get("user_id");

  let selectStock = (stockSymbol) => {
    console.log("Selected stock: " + stockSymbol);
    setSelectedStock(stockSymbol);
  };

  useDeepCompareEffect(() => {
    const fetchAndSetStocks = () => {
      API.fetchStocks(userID).then(setStocks).catch(console.error);
      // console.log("Fetched stocks: ", stocks);
    };

    const fetchandSetSummaryData = () => {
      API.portfolioHistory(userID)
        .then((response) => {
          // console.log("Response: ", response, "USER ID: ", userID);
          setSummaryData(response);
        })
        .catch(console.error);
      // console.log("Fetched summary data: ", summaryData);
    };

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
        <div className="flex flex-row justify-center items-center">
          <SymbolOverview selectedStock={selectedStock} />
          <br />
          <PortfolioSummary summaryData={summaryData} />
          <br />
        </div>
        <div className="flex flex-row justify-left items-center ml-24">
          <StockSummary stocks={stocks} selectStock={selectStock} />
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;
