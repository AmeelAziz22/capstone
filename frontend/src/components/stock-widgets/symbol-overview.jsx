// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function SymbolOverview() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1D|USD"
            ],
            [
              "Google",
              "GOOGL|1D|USD"
            ],
            [
              "Microsoft",
              "MSFT|1D|USD"
            ]
          ],
          "chartOnly": false,
          "width": 500,
          "height": 400,
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
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
    if (!container.current.hasChildNodes()) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-500px" ref={container}>
      {/* <div className="tradingview-widget-container__widget"></div> */}
      {/* <div className="tradingview-widget-copyright"> */}
      {/* </div> */}
    </div>
  );
}

export default memo(SymbolOverview);
