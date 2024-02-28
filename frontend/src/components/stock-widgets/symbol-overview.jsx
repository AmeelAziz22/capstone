// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function SymbolOverview({ selectedStock }) {
  const container = useRef();

  useEffect(() => {
    const loadWidget = () => {
      if (!container.current) {
        console.error("TradingView widget container not found");
        return;
      }

      // Clean the container to ensure no duplicate widgets are initialized
      container.current.innerHTML = "";

      const script = document.createElement("script");

      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.id = "symbol-overview";
      script.onload = () => {
        // This callback ensures the script has loaded before attempting to use any elements it might create
        // You might need to adjust this logic based on how the TradingView widget initializes itself
      };
      script.textContent = JSON.stringify({
        symbols: [["Apple", `${selectedStock}|1D|USD`]],
        chartOnly: false,
        width: "100%",
        height: "100%",
        locale: "en",
        colorTheme: "dark",
        autosize: false,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        fontSize: "10",
        noTimeScale: false,
        valuesTracking: "1",
        changeMode: "price-and-percent",
        chartType: "area",
        maLineColor: "#2962FF",
        maLineWidth: 1,
        maLength: 9,
        lineWidth: 2,
        lineType: 0,
        dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
        timeHoursFormat: "12-hours",
      });

      container.current.appendChild(script);
    };

    // Ensure the script is loaded after the DOM content is fully loaded
    if (document.readyState === "complete") {
      loadWidget();
    } else {
      window.addEventListener("load", loadWidget);
      // Clean up
      return () => window.removeEventListener("load", loadWidget);
    }
  }, [selectedStock]);

  return (
    <div className="flex items-center justify-center w-[70vw] h-[30vw]">
      <div className="tradingview-widget-container rounded-sm" ref={container}>
        <div className=".tradingview-widget-copyright w-0 h-0"></div>
      </div>
    </div>
  );
}

export default SymbolOverview;
