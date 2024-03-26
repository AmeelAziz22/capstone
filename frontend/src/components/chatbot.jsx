import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";
import API from "../services/api-service";
import Cookies from "js-cookie";

let userID = Cookies.get("user_id");

const AIChatbot = () => {
  const options = {
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

  let selectedStocks = [];
  let selectedDateRange = [];

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
      message: "Okay. What stocks do you want to use?",
      // get selected stocks from portfolio
      path: "pick_date_range",
    },
    pick_external_stocks: {
      message: "Okay. What stocks do you want to use?",
      // get stocks from not owned stocks
      path: "pick_date_range",
    },
    pick_date_range: {
      message: "Okay. What date range do you want to use?",
      // get date range from user
      path: "process_options",
    },
    process_options: {
      message: `Sounds good! Let me process your request...`,
      transition: { duration: 1000 },
      path: async (params) => {
        switch (params.userInput) {
          case "Analyze Stocks":
            // API.fetchStocks(userID)
            //   .then((response) => {
            //     console.log(response);
            //   })
            //   .catch(console.error);
            return "";
          case "Buy Stocks":
            break;
          case "Sell Stocks":
            break;
          case "Analyze Portfolio":
            break;
          default:
            break;
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
      <ChatBot options={options} flow={flow} />
    </>
  );
};

export default AIChatbot;
