import React from "react";

import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate("/");
  };
  const moveToLogin = () => {
    navigate("/login");
  };
  const moveToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="header">
      <div className="title">
        <h2 onClick={moveToHome}>프로젝트 명</h2>
      </div>
      <div className="header-right">
        <button className="login" onClick={moveToLogin}>
          <span>로그인</span>
        </button>
        <button className="register" onClick={moveToRegister}>
          <span>회원가입</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
