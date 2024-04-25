import React from "react";
import ChatBot, { PathsContext } from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";
import API from "../services/api-service";
import Cookies from "js-cookie";
import { DropdownList } from "./dropdown-list";

let userID = Cookies.get("user_id");

const AIChatbot = () => {
  const [paths, setPaths] = React.useState(["start"]);
  const [message, setMessage] = React.useState("");
  const [nextPath, setNextPath] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selectedStock, setSelectedStock] = React.useState("");
  const [selectedDateRange, setSelectedDateRange] = React.useState("");
  const [stockElemIndex, setStockElemIndex] = React.useState(0);
  const [dateElemIndex, setDateElemIndex] = React.useState(0);
  const [allStockPred, setAllStockPred] = React.useState([]);
  const dateRanges = new Map();
  dateRanges.set("2 Weeks", 10);
  dateRanges.set("1 Month", 20);
  dateRanges.set("3 Months", 60);
  dateRanges.set("6 Months", 120);
  dateRanges.set("1 Year", 240);

  //
  // These functions fix up the button and dropdown after selection, then moves to the next step
  // -----------------------------------------------------------------------------------------------------
  const confirmStockPick = () => {
    console.log(
      document.querySelector(
        `#stock-dropdown-${stockElemIndex} > div > div > div`
      ).innerHTML
    );
    setSelectedStock(
      document.querySelector(
        `#stock-dropdown-${stockElemIndex} > div > div > div`
      ).innerHTML
    );
    document.querySelector(`#confirm-stock-btn-${stockElemIndex}`).innerHTML =
      document.querySelector(
        `#stock-dropdown-${stockElemIndex} > div > div > div`
      ).innerHTML;
    document.querySelector(
      `#confirm-stock-btn-${stockElemIndex}`
    ).disabled = true;
    document
      .querySelector(`#confirmStockWrapper-${stockElemIndex}`)
      .classList.add("justify-end");

    //disable dropdown selector
    document
      .querySelector(`#stock-dropdown-${stockElemIndex}`)
      .classList.add("hidden");
    setPaths((prev) => {
      // console.log("Path: ", ...prev);
      return [...prev, "pick_date_range"];
    });
  };

  const confirmStockPick2 = () => {
    console.log(
      document.querySelector(
        `#stock-dropdown-${stockElemIndex} > div > div > div`
      ).innerHTML
    );
    setSelectedStock(
      document.querySelector(
        `#stock-dropdown-${stockElemIndex} > div > div > div`
      ).innerHTML
    );
    document.querySelector(`#confirm-stock-btn-${stockElemIndex}`).innerHTML =
      document.querySelector(
        `#stock-dropdown-${stockElemIndex} > div > div > div`
      ).innerHTML;
    document.querySelector(
      `#confirm-stock-btn-${stockElemIndex}`
    ).disabled = true;
    document
      .querySelector(`#confirmStockWrapper-${stockElemIndex}`)
      .classList.add("justify-end");

    //disable dropdown selector
    document
      .querySelector(`#stock-dropdown-${stockElemIndex}`)
      .classList.add("hidden");
    setPaths((prev) => {
      // console.log("Path: ", ...prev);
      return [...prev, "process_options"];
    });
  };

  const confirmDatePick = () => {
    setSelectedDateRange(
      dateRanges.get(
        document.querySelector(
          `#date-dropdown-${dateElemIndex} > div > div > div`
        ).innerHTML
      )
    );
    document.querySelector(`#confirm-date-btn-${dateElemIndex}`).innerHTML =
      document.querySelector(
        `#date-dropdown-${dateElemIndex} > div > div > div`
      ).innerHTML;
    document.querySelector(
      `#confirm-date-btn-${dateElemIndex}`
    ).disabled = true;
    document
      .querySelector(`#confirmDateWrapper-${dateElemIndex}`)
      .classList.add("justify-end");

    //disable dropdown selector
    let thing = document.querySelector(`#date-dropdown-${dateElemIndex}`);
    thing.classList.add("hidden");
    setPaths((prev) => {
      // console.log("Path: ", ...prev);
      return [...prev, "process_options"];
    });
  };
  // -----------------------------------------------------------------------------------------------------

  const prepCustomMessage = (message, nextPath) => {
    setMessage(() => {
      return message;
    });
    setNextPath(() => {
      return nextPath;
    });
  };

  const parseVolatility = (volatility) => {
    if (volatility.advice === "High Risk") {
      return "high risk. This is better for a short term plan.";
    } else if (volatility.advice === "Low Risk") {
      return "low risk. This is better for a long term plan.";
    } else {
      return "moderate risk. This is better for a medium term plan.";
    }
  };

  const options = {
    advance: { useCustomPaths: true },

    theme: {
      embedded: false,
      showFooter: false,
      primaryColor: "#1e3a8a",
      secondaryColor: "#1e5a9a",
    },
    notification: {
      disabled: true,
    },
    tooltip: {
      text: "AI Chatbot",
    },
    header: {
      title: <h3 style={{ cursor: "pointer", margin: 0 }}>AI Chatbot</h3>,
      showAvatar: false,
      avatar: undefined,
    },
    bodyStyle: {
      backgroundColor: "#131722",
    },
    chatInputAreaStyle: {
      backgroundColor: "#475569",
      color: "#fff",
      display: "none",
    },
    chatInputContainerStyle: {
      backgroundColor: "#131722",
      borderTop: "none",
      display: "none",
    },
    headerStyle: {
      backgroundColor: "#1e3a8a",
      borderBottom: "none",
    },
    chatHistoryButtonStyle: {
      backgroundColor: "#1e3a8a",
      color: "#fff",
    },
    chatHistoryButtonHoveredStyle: {
      backgroundColor: "#1e5a9a",
      color: "#fff",
    },
    botOptionStyle: {
      backgroundColor: "#1e3a8a",
      color: "#fff",
      //   padding: "7px 14px",
    },
    botOptionHoveredStyle: {
      backgroundColor: "#1e5a9a",
      color: "#fff",
    },
  };

  const flow = {
    start: {
      message:
        "Hi! I am your personal AI assistant, and can help provide some analysis on your stocks.",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message: "How can I help you?",
      options: [
        "Show Stock Metrics",
        "Analyze Stocks",
        "Buy Stocks",
        "Sell Stocks",
        "Analyze Portfolio",
      ],
      path: (params) => {
        setSelectedOption(params.userInput);
        console.log("Selected Option: ", selectedOption);

        switch (params.userInput) {
          case "Show Stock Metrics":
            return "pick_own_stocks_2";
          case "Analyze Stocks":
            return "pick_own_stocks";
          case "Sell Stocks":
            return "pick_own_stocks";
          case "Buy Stocks":
            return "pick_external_stocks";
          case "Analyze Portfolio":
            // get all stocks in portfolio
            return "pick_date_range";

          default:
            return "process_options";
        }
      },
    },
    pick_own_stocks: {
      message: "Okay. What stock do you want to use?             ",
      // get selected stocks from portfolio
      render: async (params) => {
        let stocks = await API.fetchStocks(userID);
        setStockElemIndex(stockElemIndex + 1);
        return (
          <div
            id={`confirmStockWrapper-${stockElemIndex}`}
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id={`stock-dropdown-${stockElemIndex}`}
              items={stocks.map((stock) => {
                return stock.symbol;
              })}
            />
            <button
              id={`confirm-stock-btn-${stockElemIndex}`}
              className="ml-3 mr-2 bg-chatbotDarkBlue rounded-2xl pt-2 pb-2 pl-4 pr-4 text-white"
              onClick={confirmStockPick}
            >
              Confirm
            </button>
          </div>
        );
      },
      path: () => {
        console.log("SELECTED: " + selectedOption);
        if (selectedStock !== "") {
          if (selectedOption === "Show Stock Metrics") {
            return "process_options";
          } else {
            return "pick_date_range";
          }
        }
      },
    },
    pick_own_stocks_2: {
      message: "Okay. What stock do you want to use?             ",
      // get selected stocks from portfolio
      render: async (params) => {
        let stocks = await API.fetchStocks(userID);
        setStockElemIndex(stockElemIndex + 1);
        return (
          <div
            id={`confirmStockWrapper-${stockElemIndex}`}
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id={`stock-dropdown-${stockElemIndex}`}
              items={stocks.map((stock) => {
                return stock.symbol;
              })}
            />
            <button
              id={`confirm-stock-btn-${stockElemIndex}`}
              className="ml-3 mr-2 bg-chatbotDarkBlue rounded-2xl pt-2 pb-2 pl-4 pr-4 text-white"
              onClick={confirmStockPick2}
            >
              Confirm
            </button>
          </div>
        );
      },
      path: () => {
        console.log("SELECTED: " + selectedOption);
        if (selectedStock !== "") {
          return "process_options";
        }
      },
    },
    pick_external_stocks: {
      message: "Okay. What stock do you want to use?             ",
      // get selected stocks from portfolio
      render: async (params) => {
        let stocks = await API.getAllStocks();
        setStockElemIndex(stockElemIndex + 1);
        return (
          <div
            id={`confirmStockWrapper-${stockElemIndex}`}
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id={`stock-dropdown-${stockElemIndex}`}
              items={stocks.map((stock) => {
                return stock.displaySymbol;
              })}
            />
            <button
              id={`confirm-stock-btn-${stockElemIndex}`}
              className="ml-3 mr-2 bg-chatbotDarkBlue rounded-2xl pt-2 pb-2 pl-4 pr-4 text-white"
              onClick={confirmStockPick}
            >
              Confirm
            </button>
          </div>
        );
      },
      path: async () => {
        if (selectedStock !== "") {
          // console.log("Picking stock: ", selectedStock);
          return "pick_date_range";
        }
      },
    },
    pick_date_range: {
      message: "Okay. What date range do you want to use?",
      render: async (params) => {
        setDateElemIndex(dateElemIndex + 1);
        return (
          <div
            id={`confirmDateWrapper-${dateElemIndex}`}
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id={`date-dropdown-${dateElemIndex}`}
              items={Array.from(dateRanges.keys())}
            />
            <button
              id={`confirm-date-btn-${dateElemIndex}`}
              className="ml-3 mr-2 bg-chatbotDarkBlue rounded-2xl pt-2 pb-2 pl-4 pr-4 text-white"
              onClick={confirmDatePick}
            >
              Confirm
            </button>
          </div>
        );
      },
      path: async () => {
        if (selectedStock !== "") {
          // console.log("Picking date: ", selectedStock);
          return "process_options";
        }
      },
    },
    process_options: {
      message: `Sounds good! Let me process your request...`,
      transition: { duration: 1000 },
      path: async (params) => {
        switch (selectedOption) {
          // SHOW STOCK METRICS
          case "Show Stock Metrics":
            await API.getStockMetrics(selectedStock)
              .then((response) => {
                console.log(response);
                response.volatility.advice = parseVolatility(
                  response.volatility
                );
                prepCustomMessage(
                  `${response.macd.advice} ${response.rsi.advice} For volatility, there is a ${response.volatility.advice}`,
                  "end"
                );
              })
              .catch(console.error);
            return "custom_message";

          // ANALYZE STOCKS
          case "Analyze Stocks":
            await API.getStockPredictions(selectedDateRange, selectedStock)
              .then((response) => {
                console.log(response);
                if (response["increase"] === true) {
                  prepCustomMessage(
                    `We expect ${selectedStock} stock to increase by the next ${selectedDateRange} days with a model of validation accuracy of ${response["increase_accuracy"]}%`,
                    "end"
                  );
                } else {
                  prepCustomMessage(
                    `We expect ${selectedStock} stock to increase by the next ${selectedDateRange} days with a model of validation accuracy of ${Math.round(
                      (Math.round(response.increase_accuracy * 100) / 100) * 100
                    )}%`,
                    "end"
                  );
                }
              })
              .catch(console.error);
            return "custom_message";

          // BUY STOCKS
          case "Buy Stocks":
            await API.getStockPredictions(selectedDateRange, selectedStock)
              .then((response) => {
                console.log(response);
                if (response["increase"] === true) {
                  prepCustomMessage(
                    `We expect ${selectedStock} stock to increase by the next ${selectedDateRange} days with a model of validation accuracy of ${Math.round(
                      (Math.round(response.increase_accuracy * 100) / 100) * 100
                    )}%`,
                    "buy_increase"
                  );
                } else {
                  prepCustomMessage(
                    `We expect ${selectedStock} stock to decrease by the next ${selectedDateRange} days with a model of validation accuracy of ${Math.round(
                      (Math.round(response.increase_accuracy * 100) / 100) * 100
                    )}%`,
                    "sell_decrease"
                  );
                }
              })
              .catch(console.error);
            return "custom_message";

          // SELL STOCKS
          case "Sell Stocks":
            await API.getStockPredictions(selectedDateRange, selectedStock)
              .then((response) => {
                console.log(response);
                if (response["increase"] === true) {
                  prepCustomMessage(
                    `We expect ${selectedStock} stock to increase by the next ${selectedDateRange} days with a model of validation accuracy of ${Math.round(
                      (Math.round(response.increase_accuracy * 100) / 100) * 100
                    )}%`,
                    "buy_increase"
                  );
                } else {
                  prepCustomMessage(
                    `We expect ${selectedStock} stock to decrease by the next ${selectedDateRange} days with a model of validation accuracy of 
                    ${Math.round(
                      (Math.round(response.increase_accuracy * 100) / 100) * 100
                    )}%`,
                    "sell_decrease"
                  );
                }
              })
              .catch(console.error);
            return "custom_message";

          // ANALYZE PORTFOLIO
          case "Analyze Portfolio":
            let response = await API.fetchStocks(userID);
            const stocks = response.map((stock) => stock.symbol);
            response = await API.getMultipleStockPredictions(
              selectedDateRange,
              stocks
            );
            let response2 = await API.getPortfolioVolatility(userID);
            setAllStockPred(Object.values(response));
            const increaseValues = Object.values(response).map(
              (data) => data.increase
            );

            let volatilityAdvice = response2.advice;
            volatilityAdvice = parseVolatility(volatilityAdvice);
            console.log(volatilityAdvice);

            if (increaseValues.some((val) => val === undefined)) {
              prepCustomMessage(
                "We dont have all the stock in your portfolio ready for analysis, come back later",
                "end"
              );
            } else if (increaseValues.every((val) => val === true)) {
              prepCustomMessage(
                `Based on our models we expect your portfolio to increase by about ${Math.abs(
                  response.low_percent
                )}-${Math.abs(
                  response.high_percent
                )}% in the next ${selectedDateRange} days with a ${volatilityAdvice}`,
                "portfolio_options"
              );
            } else if (increaseValues.every((val) => val === false)) {
              prepCustomMessage(
                `Based on our models we expect your portfolio to decrease by about ${Math.abs(
                  response.low_percent
                )}-${Math.abs(
                  response.high_percent
                )}% in the next ${selectedDateRange} days with a ${volatilityAdvice}`,
                "portfolio_options"
              );
            } else {
              prepCustomMessage(
                `Based on our models your portfolio contains stocks with both increasing and decreasing projections within ${selectedDateRange} days. It has a volatility with ${volatilityAdvice}`,
                "portfolio_options"
              );
            }
            return "custom_message";

          // STOCK INDICATOR
          case "Stock Indicator":
            await API.getStockPredictions(
              selectedDateRange,
              selectedStock
            ).then((response) => {
              console.log(response);
              prepCustomMessage(
                `The stock indicator for ${selectedStock} change in the next ${selectedDateRange} days is "${response["indicator"]}"`,
                "end"
              );
            });
            return "custom_message";

          // PROJECTED GRAPH
          case "Projected Graph":
            return "end";

          // DEFAULT
          default:
            return "end";
        }
      },
    },
    buy_increase: {
      message:
        "Since the stock is likely to increase, I can calculate more information for you:",
      options: ["Stock Indicator", "No, I'm good"],
      path: (params) => {
        if (params.userInput === "Stock Indicator") {
          setSelectedOption("Stock Indicator");
          return "process_options";
        } else if (params.userInput === "Projected Graph") {
          setSelectedOption("Projected Graph");
          return "end";
        } else {
          return "end";
        }
      },
    },
    sell_decrease: {
      message:
        "Since the stock is likely to decrease we recommend you sell, I can calculate more information for you:",
      options: ["Stock Indicator", "No, I'm good"],
      path: (params) => {
        if (params.userInput === "Stock Indicator") {
          setSelectedOption("Stock Indicator");
          return "process_options";
        } else if (params.userInput === "Projected Graph") {
          setSelectedOption("Projected Graph");
          return "end";
        } else {
          return "end";
        }
      },
    },
    portfolio_options: {
      message:
        "Would you like more infomation about the performance of your specific stocks?",
      options: ["Show stock predictions", "No, I'm good"],
      path: (params) => {
        if (params.userInput === "Show stock predictions") {
          console.log(allStockPred);
          return "stock_predictions";
        } else {
          return "end";
        }
      },
    },
    stock_predictions: {
      render: (
        <div className="flex flex-col align-middle justify-center">
          <h2 className="text-white text-center">Stock Predictions</h2>
          <table className="mx-8 text-gray-400 border-separate space-y-6 text-sm border-spacing-15 rounded-sm drop-shadow-lg">
            <thead className=" bg-blue-900 text-gray-200">
              <tr>
                <th className="p-3">Symbol</th>
                <th className="p-3 text-center">Prediction</th>
                <th className="p-3 text-center">% Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {allStockPred.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.stock_symbol}</td>
                  <td>
                    {stock.increase
                      ? `${Math.abs(stock.low_percent)}-${Math.abs(
                          stock.high_percent
                        )}% Increase`
                      : `${Math.abs(stock.high_percent)}-${Math.abs(
                          stock.low_percent
                        )}% Decrease`}
                  </td>
                  <td>{`${Math.round(
                    (Math.round(stock.increase_accuracy * 100) / 100) * 100
                  )}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      transition: { duration: 1000 },
      path: "end",
    },
    custom_message: {
      message: () => {
        console.log("Next path: ", nextPath);
        return message;
      },
      transition: { duration: 1000 },
      path: nextPath,
    },
    end: {
      message: "Hope this helped! Do you need help with anything else?",
      options: ["Yes", "No"],
      path: (params) => {
        if (params.userInput === "Yes") {
          return "show_options";
        } else {
          return "quit";
        }
      },
    },
    quit: {
      message: "Goodbye!",
      end: true,
    },
  };

  return (
    <>
      <PathsContext.Provider value={{ paths: paths, setPaths: setPaths }}>
        <ChatBot options={options} flow={flow} />
      </PathsContext.Provider>
    </>
  );
};

export default AIChatbot;
