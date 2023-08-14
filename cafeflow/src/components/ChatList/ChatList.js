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

  // 최신 순으로 채팅방 나열, 가장 최근의 채팅방이 상단으로 이동
  const sortedChatRooms = chatRooms.sort((a, b) => {
    if (a.messages.length === 0 && b.messages.length === 0) return 0;
    if (a.messages.length === 0) return 1; // a가 메시지가 없으면 b보다 아래로
    if (b.messages.length === 0) return -1; // b가 메시지가 없으면 a보다 아래로

    const aLatestTime = a.messages[a.messages.length - 1].timestamp
      .toDate()
      .getTime();
    const bLatestTime = b.messages[b.messages.length - 1].timestamp
      .toDate()
      .getTime();

    return bLatestTime - aLatestTime; // 내림차순 정렬
  });

  return (
    <div className="ChatListContainer1">
      <div className="ChatListContainer2">
        <div className="ChatListContainer4">
          <h1>ChatList</h1>
          <span>채팅 목록</span>
        </div>
        <div className="ChatListDivider"></div>
        <div className="ChatListContainer3">
          {sortedChatRooms.map((chatRoom) => (
            <div
              className="ChatList"
              key={chatRoom.id}
              onClick={() => goToChatRoom(chatRoom.id)}
            >
              <div className="leftContent">
                <img src={user}></img>
                {/* 채팅방에서 상대방의 이름을 users로부터 추출 */}
                <span>
                  {chatRoom.users
                    .filter((user) => user !== currentUser)
                    .join(", ")}
                </span>
              </div>
              {/* leftContent 종료 */}
              {/* 가장 최근의 메세지와 그 시간을 표시 */}
              {chatRoom.messages.length > 0 && (
                <div className="CurrentMsg">
                  <p>
                    {chatRoom.messages[chatRoom.messages.length - 1].content
                      .length > 10
                      ? chatRoom.messages[
                          chatRoom.messages.length - 1
                        ].content.substring(0, 10) + "..."
                      : chatRoom.messages[chatRoom.messages.length - 1].content}
                  </p>
                  <span>
                    {chatRoom.messages[chatRoom.messages.length - 1].timestamp
                      .toDate()
                      .toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
