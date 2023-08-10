import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { FiMenu } from "react-icons/fi"; // 햄버거 메뉴 아이콘
import { MdClose } from "react-icons/md"; // 메뉴 닫기 아이콘

import { tokenState, nicknameState } from "../../../recoils/Recoil";

import "./Header.css";
import Logo from "../../../icons/Logo.png";
import divider from "../../../icons/Divider.png";

const Header = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useRecoilState(tokenState);
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const moveToHome = () => {
    navigate("/");
  };
  const moveToLogin = () => {
    navigate("/login");
  };
  const moveToRegister = () => {
    navigate("/register");
  };
  const moveTomyPage = () => {
    navigate("/myPage");
  };
  const moveToQnA = () => {
    navigate("/qnalist");
  };
  const moveToCommunity = () => {
    navigate("/community");
    //navigate("/freelist");
    //navigate("/sharelist");
  };

  const moveToChat = () => {
    navigate("/chats");
  };
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      // 로컬스토리지에서 Token 삭제
      setJwtToken("");
      setNickname("");

      // 로컬스토리지에 저장된 정보들을 삭제하여 로그인 상태가 아님에도 불구하고
      // 삭제 및 수정 버튼이 나타나는 버그를 해결
      localStorage.removeItem("nickname");
      localStorage.removeItem("age");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("jwtToken");

      // 로그인 화면으로 돌아감
      moveToLogin();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setJwtToken(storedToken);
      // 여기서는 username도 로컬스토리지에 저장되어 있고, 이를 불러올 수 있다고 가정합니다.
      const storedNickname = localStorage.getItem("nickname");
      if (storedNickname) {
        setNickname(storedNickname);
      }
    }
  }, []); // 빈 의존성 배열을 사용하여 이 훅이 컴포넌트가 마운트될 때만 실행되도록 합니다.

  // 드롭다운 메뉴를 보여주거나 숨기는 함수
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const DropdownMenu = () => {
    return (
      <div className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>
        <button className="login">
          <span>{nickname}</span>
        </button>
        <button className="login" onClick={moveTomyPage}>
         <span>마이페이지</span>
        </button>
        <button className="login" onClick={moveToQnA}>
          <span>Q&A</span>
        </button>
        <button className="login" onClick={handleLogout}>
          <span>로그아웃</span>
        </button>
      </div>
    );
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src={Logo}
          style={{ width: "40px", height: "40px" }}
          onClick={moveToHome}
        ></img>
        <h2 onClick={moveToHome}>AIConnectia</h2>
      </div>
      <div className="header-center">
        <button>
          <span style={{ color: "#564E97" }}>New technology</span>
        </button>
        <button onClick={moveToQnA}>
          <span>Q&A</span>
        </button>
        <button onClick={moveToCommunity}>
          <span>Community</span>
        </button>
        <button onClick={moveToChat}>
          <span>Chat</span>
        </button>
      </div>
      <div className="header-right">
        {jwtToken ? (
          <React.Fragment>
            <button className="user" onClick={moveTomyPage}></button>
            <span>
              <button className="username" onClick={moveTomyPage}>
                <span>{nickname}</span>
              </button>
              님
            </span>
            <img
              src={divider}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            ></img>
            <button className="register" onClick={handleLogout}>
              <span>로그아웃</span>
            </button>
            <button className="hamburger-icon" onClick={toggleDropdown}>
              <FiMenu size={30} />
            </button>
            {isDropdownVisible && <DropdownMenu />}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button className="login" onClick={moveToLogin}>
              <span>Login</span>
            </button>
            <img
              src={divider}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            ></img>
            <button className="register" onClick={moveToRegister}>
              <span>Register</span>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
