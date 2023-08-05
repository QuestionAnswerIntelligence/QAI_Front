import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase";

import "./ChatBody.css";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useParams();

  const currentUser = localStorage.getItem("nickname");

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(chatId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setMessages(snapshot.data().messages);
        } else {
          console.log(`No document found for chatId: ${chatId}`);
        }
      });

    // cleanup function
    return () => unsubscribe();
  }, [chatId]);

  return (
    <div className="bodyContainer">
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.sender === currentUser ? "messageRight" : "messageLeft"
          }
        >
          <div className="messageBox">
            <div className="messageSender">{message.sender}</div>
            <div className="messageContent">{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
