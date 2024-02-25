import React, {useState} from "react";
import StockChart from "./stock-widgets/stock-chart";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../assets/search.css'


const StockSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ticker,setTicker] = useState(searchParams.get("ticker"));
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const query = event.target.ticker.value.trim();
      if (query !== '') {
        setTicker(query)
        navigate(`/explore?ticker=${encodeURIComponent(query)}`);
        navigate(0)
      }
    };

  return (
    <>
      <div className="flex flex-grow flex-col p-8 bg-gray-800">
        <h1 className="pb-8 text-white font-bold text-4xl">Explore</h1>
            <div>
                <form onSubmit={handleSubmit} id="search-form">
                <input
                    className="searchBar"
                    name="ticker"
                    type="text"
                    placeholder="Search Ticker"
                    autoComplete="off"
                    autoFocus
                />
                </form>
            </div>
            <StockChart ticker={ticker} />
      </div>
    </>
  );
};

export default StockSearch;
