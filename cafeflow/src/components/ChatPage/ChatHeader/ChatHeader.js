import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ChatHeader.css";

const ChatHeader = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const nickname = localStorage.getItem("nickname"); // 로그인한 사용자의 이름을 가져옴
  const ChatTitle = chatId.replace(nickname, "").replace("_", ""); // ChatId에서 로그인한 사용자의 이름과 언더바를 제거

  const goChatList = () => {
    navigate("/chats");
  };
  return (
    <div className="headerContainer">
      <button className="goBack" onClick={goChatList}></button>
      <span style={{ color: "white", fontSize: "22px" }}>{ChatTitle}</span>
    </div>
  );
};

export default ChatHeader;
