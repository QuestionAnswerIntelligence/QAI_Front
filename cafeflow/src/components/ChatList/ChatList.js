import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase";

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
    <div className="a">
      <div className="container1">
        {chatRooms.map((chatRoom) => (
          <div key={chatRoom.id} onClick={() => goToChatRoom(chatRoom.id)}>
            {chatRoom.users.filter((user) => user !== currentUser).join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
