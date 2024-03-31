import React from "react";
import ChatBot, { PathsContext } from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";
import API from "../services/api-service";
import Cookies from "js-cookie";
import { DropdownList } from "./dropdown-list";

let userID = Cookies.get("user_id");

const AIChatbot = () => {
  const [paths, setPaths] = React.useState(["start"]);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selectedStock, setSelectedStock] = React.useState("");
  const [selectedDateRange, setSelectedDateRange] = React.useState("");
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
    setSelectedStock(
      document.querySelector("#stock-dropdown > div > div > div").innerHTML
    );
    document.querySelector("#confirm-stock-btn").innerHTML = selectedStock;
    document.querySelector("#confirm-stock-btn");
    document.querySelector("#confirmStockWrapper").classList.add("justify-end");
    document.querySelector("#confirm-stock-btn").disabled = true;

    //disable dropdown selector
    document.querySelector("#stock-dropdown").classList.add("hidden");
    setPaths((prev) => {
      // console.log("Path: ", ...prev);
      return [...prev, "pick_date_range"];
    });
  };

  const confirmDatePick = () => {
    setSelectedDateRange(
      dateRanges.get(
        document.querySelector("#date-dropdown > div > div > div").innerHTML
      )
    );
    document.querySelector("#confirm-date-btn").innerHTML = selectedStock;
    document.querySelector("#confirm-date-btn");
    document.querySelector("#confirmDateWrapper").classList.add("justify-end");
    document.querySelector("#confirm-date-btn").innerHTML = selectedDateRange;
    //disable dropdown selector
    document.querySelector("#date-dropdown").classList.add("hidden");
    setPaths((prev) => {
      // console.log("Path: ", ...prev);
      return [...prev, "process_options"];
    });
  };
  // -----------------------------------------------------------------------------------------------------

  const insertMessage = (message) => {
    setMessages((prev) => {
      const newMessage = {
        content: message,
        sender: "bot",
        type: "string",
      };
      return [...prev, newMessage];
    });
  };

  const options = {
    advance: { useCustomPaths: true, useCustomMessages: true },

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
        "Analyze Stocks",
        "Buy Stocks",
        "Sell Stocks",
        "Analyze Portfolio",
      ],
      path: (params) => {
        setSelectedOption(params.userInput);

        switch (params.userInput) {
          case "Analyze Stocks":
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
        return (
          <div
            id="confirmStockWrapper"
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id="stock-dropdown"
              items={stocks.map((stock) => {
                return stock.symbol;
              })}
            />
            <button
              id="confirm-stock-btn"
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
    pick_external_stocks: {
      message: "Okay. What stock do you want to use?             ",
      // get selected stocks from portfolio
      render: async (params) => {
        // TODO add external stock fetching
        let stocks = await API.fetchStocks(userID);
        return (
          <div
            id="confirmStockWrapper"
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id="stock-dropdown"
              items={stocks.map((stock) => {
                return stock.symbol;
              })}
            />
            <button
              id="confirm-stock-btn"
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
        return (
          <div
            id="confirmDateWrapper"
            className="flex flex-row p-3 items-center"
          >
            <DropdownList
              id="date-dropdown"
              items={Array.from(dateRanges.keys())}
            />
            <button
              id="confirm-date-btn"
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
        console.log("Selected option: ", selectedOption);
        switch (selectedOption) {
          case "Analyze Stocks":
            API.getStockPredictions(selectedDateRange, selectedStock)
              .then((response) => {
                console.log(response);
              })
              .catch(console.error);
            return "end";
          case "Buy Stocks":
            return "end";
          case "Sell Stocks":
            return "end";
          case "Analyze Portfolio":
            return "end";
          default:
            return "end";
        }
        return "show_options";
      },
    },
    end: {
      message: "Hope this helped! ",
      options: ["I need help with something else"],
      path: "show_options",
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
