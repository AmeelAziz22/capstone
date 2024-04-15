import React, { useEffect, useRef } from "react";
import API from "../../services/api-service";
import Cookies from "js-cookie";

export const StockChart = ({ ticker }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    const config = JSON.stringify({
      autosize: true,
      symbol: ticker,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });
    script.innerHTML = config;
    if (!container.current.hasChildNodes()) {
      container.current.appendChild(script);
    }
  }, [ticker]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export const StockSummary = ({ stocks, selectStock, reload }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const symbol = event.target[0].value;
    if (symbol) {
      API.updateStock(
        Cookies.get("user_id"),
        symbol.toUpperCase(),
        event.target.qty.value,
        event.target.avgPrice.value
      );
      selectStock(symbol);
      reload();
    }
  };

  const rows = [];

  stocks.forEach((stock) => {
    rows.push(
      <tr
        key={stock.symbol}
        className="bg-gray-900 rounded-sm hover:bg-slate-700 cursor-pointer transition duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-slate-800"
        onClick={() => {
          selectStock(stock.symbol);
        }}
      >
        <td className="p-3 font-bold text-center">{stock.symbol}</td>
        <td className="p-3 text-center">{stock.shares}</td>
        <td className="p-3 text-center">
          {stock.current_price.toFixed(2)} USD
        </td>
        <td className="p-3 text-center">
          {stock.average_price.toFixed(2)} USD
        </td>
        <td className="p-3 text-center">{stock.price_change.toFixed(2)} %</td>
        <td className="p-3 text-center">
          <button
            className="pl-5 pr-5 pt-2 pb-2 bg-red-900 rounded-md text-white font-bold active:bg-red-700 drop-shadow-lg hover:bg-red-600"
            onClick={() => {
              API.updateStock(Cookies.get("user_id"), stock.symbol, 0, 0);
              reload();
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="flex items-center justify-center rounded-md">
        <div className="col-span-12">
          <div className="flex flex-col overflow-auto lg:overflow-visible">
            {/* UPDATE STOCK SECTION */}
            <div className="flex align-middle justify-center w-[35vw] border-spacing-15 rounded-sm">
              {/* text and button to update stock using API.updateStock() */}
              <div className="flex flex-row justify-center items-center">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className=" text-white font-bold bg-slate-600 pl-4 rounded-md pt-3 pb-3 ring-blue-700 ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 caret-white drop-shadow-lg uppercase"
                    placeholder="Enter stock symbol"
                  />
                  <input
                    type="text"
                    name="qty"
                    autoComplete="off"
                    placeholder="QTY"
                    className="text-white text-center font-bold bg-slate-600 rounded-md w-16 ml-4 pt-3 pb-3 ring-blue-700 ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 caret-white drop-shadow-lg uppercase"
                  />
                  <input
                    type="text"
                    name="avgPrice"
                    autoComplete="off"
                    placeholder="AVG PRICE"
                    className="text-white text-center font-bold bg-slate-600 rounded-md w-24 ml-4 pt-3 pb-3 ring-blue-700 ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 caret-white drop-shadow-lg uppercase"
                  />
                  <button className="ml-5 pl-7 pr-7 pt-3 pb-3 bg-blue-900 rounded-md text-white font-bold active:bg-blue-800 drop-shadow-lg">
                    Update Stock
                  </button>
                </form>
              </div>
            </div>

            <br />

            {/* STOCKS TABLE */}
            <div className="flex flex-col align-middle justify-center">
              <table className="w-[35vw] text-gray-400 border-separate space-y-6 text-sm border-spacing-15 rounded-sm drop-shadow-lg">
                <thead className=" bg-blue-900 text-gray-200">
                  <tr>
                    <th className="p-3">Symbol</th>
                    <th className="p-3 text-center">Shares</th>
                    <th className="p-3 text-center">Current Price</th>
                    <th className="p-3 text-center">Average Price</th>
                    <th className="p-3 text-center">Price Change</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
