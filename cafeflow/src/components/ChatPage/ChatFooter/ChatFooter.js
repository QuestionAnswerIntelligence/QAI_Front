import React, { useState } from "react";
import db from "../../firebase";
import firebase from "firebase/compat/app";

import "./ChatFooter.css";
import { useParams } from "react-router-dom";

const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const { chatId } = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();

    const sender = localStorage.getItem("nickname");

    db.collection("chats")
      .doc(chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender,
          content: message,
          timestamp: new Date(),
        }),
      });

    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="footerContainer">
          <input
            type="text"
            className="msgBox"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send" type="submit"></button>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
