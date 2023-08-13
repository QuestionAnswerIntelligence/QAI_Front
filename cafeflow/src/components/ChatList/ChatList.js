import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import user from "../../icons/user.png";

import "./ChatList.css";

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("nickname");

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .where("users", "array-contains", currentUser)
      .onSnapshot((snapshot) => {
        const fetchedChatRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatRooms(fetchedChatRooms);
      });

    return () => unsubscribe();
  }, [currentUser]);

  const goToChatRoom = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="ChatListContainer1">
      <div className="ChatListContainer2">
        <div className="ChatListContainer4">
          <h1>ChatList</h1>
          <span>채팅 목록</span>
        </div>
        <div className="ChatListDivider"></div>
        <div className="ChatListContainer3">
          {chatRooms.map((chatRoom) => (
            <div
              className="ChatList"
              key={chatRoom.id}
              onClick={() => goToChatRoom(chatRoom.id)}
            >
              <img src={user}></img>{" "}
              {chatRoom.users.filter((user) => user !== currentUser).join(", ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
