import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";


const AIChatbot = () => {
    const options={
        theme: {
            embedded: false,
            showFooter:false,
        },
        notification: {
            disabled: true,
        },
        tooltip: {
            text: "AI Chatbot",
        },
        header: {
            title: (
                <h3 style={{cursor: "pointer", margin: 0}}>
                    AI Chatbot
                </h3>
            ),
            showAvatar: false,
            avatar: undefined,
        },
        
    }


    const flow = {
		start: {
			message: "Hello there! I am a demo for custom bot options!",
			chatDisabled: true
        }
	}

	return (
        <>
             <ChatBot options={options} flow={flow}/>
        </>
        );
};

export default AIChatbot