import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState, usernameState } from "../../../recoils/Recoil";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useRecoilState(tokenState);
  const [username, setUsername] = useRecoilState(usernameState);

  const name = localStorage.getItem("name");
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

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      // 로컬스토리지에서 Token 삭제
      setJwtToken("");
      localStorage.removeItem("jwtToken");
      // Also clear the username in state
      setUsername("");
      // Navigate back to the login page 로그인 화면으로 돌아감
      moveToLogin();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setJwtToken(storedToken);
      // 여기서는 username도 로컬스토리지에 저장되어 있고, 이를 불러올 수 있다고 가정합니다.
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []); // 빈 의존성 배열을 사용하여 이 훅이 컴포넌트가 마운트될 때만 실행되도록 합니다.

  return (
    <div className="header">
      <div className="header-left">
        <h2 onClick={moveToHome}>프로젝트 명</h2>
        <button>
          <span>서비스 소개</span>
        </button>
        <button>
          <span>Q&A</span>
        </button>
        <button>
          <span>커뮤니티</span>
        </button>
        <button>
          <span>마이페이지</span>
        </button>
      </div>
      <div className="header-right">
        {jwtToken ? (
          <React.Fragment>
            <span>
              어서오세요!{" "}
              <button className="username" onClick={moveTomyPage}>
                <span>{name}</span>
              </button>
              님
            </span>
            <button className="login" onClick={handleLogout}>
              <span>로그아웃</span>
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button className="login" onClick={moveToLogin}>
              <span>로그인</span>
            </button>
            <button className="register" onClick={moveToRegister}>
              <span>회원가입</span>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
