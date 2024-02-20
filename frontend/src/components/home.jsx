import React from "react";
import SymbolOverview from "./stock-widgets/symbol-overview";

const Home = () => {
  // let symbols = [
  //   ["Apple", "AAPL|1D|USD"],
  //   ["Google", "GOOGL|1D|USD"],
  //   ["Microsoft", "MSFT|1D|USD"],
  // ];

  return (
    <>
      <div className="flex flex-grow flex-col p-8 bg-gray-800">
        <h1 className="pb-8 text-white font-bold text-4xl">Portfolio</h1>

        <div className="justify-center items-center">
          <SymbolOverview/>
        </div>
      </div>
    </>
  );
};

export default Home;
