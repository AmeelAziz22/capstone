import React, { useEffect, useRef, memo } from 'react';

const StockChart = ({ ticker }) =>  {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
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
        support_host: "https://www.tradingview.com"
      });
        script.innerHTML = config;
    if (!container.current.hasChildNodes()) {
      container.current.appendChild(script);
    }
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
    </div>
  );
}

export default memo(StockChart);