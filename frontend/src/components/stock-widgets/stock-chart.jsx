import React from "react";

const StockChart = ({ stocks }) => {
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

export default StockChart;
