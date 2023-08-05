import React from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatFooter from "./ChatFooter/ChatFooter";
import ChatBody from "./ChatBody/ChatBody";
import "./ChatPage.css";

const ChatPage = () => {
  const { chatId } = useParams();
  return (
    <div className="chatpage">
      <div className="chatContainer">
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPage;
