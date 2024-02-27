// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function SymbolOverview({ selectedStock }) {
  const container = useRef();

  if (selectedStock === null || selectedStock === undefined || selectedStock === "") {
    selectedStock = "AAPL";
  }

  useEffect(() => {
    if (document == null) {
      return;
    }

    const script = document.createElement("script");
    const currentContainer = container.current;
    while (currentContainer.firstChild) {
      currentContainer.removeChild(currentContainer.firstChild);
    }
    

    console.log("selectedStock: ", selectedStock);

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "${selectedStock}|1D|USD"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "timeHoursFormat": "12-hours"
        }`;

    container.current.appendChild(script);

    return () => {
      if (currentContainer.firstChild) {
        currentContainer.removeChild(currentContainer.firstChild);
      }
    };
  }, [selectedStock]);

  return (
    <div className="flex items-center justify-center w-[70vw] h-[30vw]">
      <div className="tradingview-widget-container rounded-sm" ref={container}>
        {/* <div className="tradingview-widget-container__widget"></div> */}
        {/* <div className="tradingview-widget-copyright"> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default memo(SymbolOverview);
