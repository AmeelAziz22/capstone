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

  const flow = {
    start: {
      message: "Hello there! I am a demo for custom bot options!",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message: "What do you want to do?",
      options: ["Fetch Stocks", "Option 2", "Option 3"],
      path: "process_options",
    },
    show_options_with_text: {
      message: "What do you want to do?",
      options: ["Fetch Stocks", "Option 2", "Option 3"],
      path: "process_options",
    },
    process_options: {
      message: "You selected {{option}}",
      transition: { duration: 1000 },
      path: async (params) => {
        switch (params.userInput) {
          case "Fetch Stocks":
            API.fetchStocks(userID)
              .then((response) => {
                console.log(response);
              })
              .catch(console.error);
        }
        return "show_options";
      },
    },
  };

  return (
    <>
      <ChatBot options={options} flow={flow} />
    </>
  );
};

export default AIChatbot;
