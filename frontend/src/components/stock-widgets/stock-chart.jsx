import React, { useEffect, useRef, memo } from "react";

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

export const StockSummary = ({ stocks }) => {
  const rows = [];

  stocks.forEach((stock) => {
    rows.push(
      <tr key={stock.symbol} className="bg-gray-900 rounded-sm">
        <td className="p-3 font-bold text-center">{stock.symbol}</td>
        <td className="p-3 text-center">{stock.shares}</td>
        <td className="p-3 text-center">{stock.curPrice} USD</td>
        <td className="p-3 text-center">{stock.avgPrice} USD</td>
        <td className="p-3 text-center">{stock.priceChange} USD</td>
      </tr>
    );
  });

  return (
    <>
      <div className="flex items-center justify-center rounded-md">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible">
            <table className="w-[70vw] text-gray-400 border-separate space-y-6 text-sm border-spacing-15 rounded-sm">
              <thead className=" bg-blue-900 text-gray-200">
                <tr>
                  <th className="p-3">Symbol</th>
                  <th className="p-3 text-center">Shares</th>
                  <th className="p-3 text-center">Current Price</th>
                  <th className="p-3 text-center">Average Price</th>
                  <th className="p-3 text-center">Price Change</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
