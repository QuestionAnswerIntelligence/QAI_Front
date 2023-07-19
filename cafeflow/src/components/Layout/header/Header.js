import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState, usernameState } from "../../../recoils/Recoil";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useRecoilState(tokenState);
  const [username, setUsername] = useRecoilState(usernameState);

  const moveToHome = () => {
    navigate("/");
  };
  const moveToLogin = () => {
    navigate("/login");
  };
  const moveToRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    // 로컬스토리지에서 Token 삭제
    setJwtToken("");
    localStorage.removeItem("jwtToken");
    // Also clear the username in state
    setUsername("");
    // Navigate back to the login page 로그인 화면으로 돌아감
    moveToLogin();
  };

  return (
    <div className="header">
      <div className="title">
        <h2 onClick={moveToHome}>프로젝트 명</h2>
      </div>
      <div className="header-right">
        {jwtToken ? (
          <button className="logout" onClick={handleLogout}>
            <span>로그아웃</span>
          </button>
        ) : (
          <button className="login" onClick={moveToLogin}>
            <span>로그인</span>
          </button>
        )}
        {jwtToken ? (
          <button className="username" disabled>
            <span>{username}</span>
          </button>
        ) : (
          <button className="register" onClick={moveToRegister}>
            <span>회원가입</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
