import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { FiMenu } from "react-icons/fi"; // 햄버거 메뉴 아이콘
import { MdClose } from "react-icons/md"; // 메뉴 닫기 아이콘

import {
  tokenState,
  nicknameState,
  imgUrlState,
} from "../../../recoils/Recoil";
import userDefaultImg from "../../../icons/Account_circle.png";

import "./Header.css";
import LogoQAI from "../../../icons/LogoQAI.png";
import divider from "../../../icons/Divider.png";

const Header = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useRecoilState(tokenState);
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const { memberId } = useParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [imgUrl, setImgUrl] = useRecoilState(imgUrlState);

  const [colorNewTec, setColorNewTec] = useState("white");
  const [colorQnA, setColorQnA] = useState("white");
  const [colorCommunity, setColorCommunity] = useState("white");
  const [colorChat, setColorChat] = useState("white");
  const [color, setColor] = useState("white");

  const handleMouseEnterNewTec = () => {
    setColorNewTec("#6565b8");
    setColor("purple");
    setTimeout(() => {
      setColorNewTec("white");
      setColor("white");
    }, 1000); // 1초 후에 색을 다시 원래 색상으로 변경
  };

  const handleMouseLeaveNewTec = () => {
    setColorNewTec("white");
  };

  const handleMouseEnterQnA = () => {
    setColorQnA("#6565b8");
    setColor("purple");
    setTimeout(() => {
      setColorQnA("white");
      setColor("white");
    }, 1000); // 1초 후에 색을 다시 원래 색상으로 변경
  };

  const handleMouseLeaveQnA = () => {
    setColorQnA("white");
  };

  const handleMouseEnterCommunity = () => {
    setColorCommunity("#6565b8");
    setColor("purple");
    setTimeout(() => {
      setColorCommunity("white");
      setColor("white");
    }, 1000); // 1초 후에 색을 다시 원래 색상으로 변경
  };

  const handleMouseLeaveCommunity = () => {
    setColorCommunity("white");
  };

  const handleMouseEnterChat = () => {
    setColorChat("#6565b8");
    setColor("purple");
    setTimeout(() => {
      setColorChat("white");
      setColor("white");
    }, 1000); // 1초 후에 색을 다시 원래 색상으로 변경
  };

  const handleMouseLeaveChat = () => {
    setColorChat("white");
  };

  const moveToHome = () => {
    navigate("/");
  };
  const moveToNewTec = () => {
    navigate("/newtec_list");
  };
  const moveToLogin = () => {
    navigate("/login");
  };
  const moveToRegister = () => {
    navigate("/register");
  };
  const moveTomyPage = () => {
    navigate("/myPage/:memberId");
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
      setImgUrl("");

      // 로컬스토리지에 저장된 정보들을 삭제하여 로그인 상태가 아님에도 불구하고
      // 삭제 및 수정 버튼이 나타나는 버그를 해결
      localStorage.removeItem("nickname");
      localStorage.removeItem("age");
      localStorage.removeItem("memberId");
      localStorage.removeItem("email");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("point");
      localStorage.removeItem("imageUrl");

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
          <span className="span">{nickname}</span>
        </button>
        <button className="login" onClick={moveTomyPage}>
          <span className="span">마이페이지</span>
        </button>
        <button className="login" onClick={moveToQnA}>
          <span className="span">Q&A</span>
        </button>
        <button className="login" onClick={handleLogout}>
          <span className="span">Logout</span>
        </button>
      </div>
    );
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src={LogoQAI}
          style={{
            width: "100px",
            height: "100px",
          }}
          onClick={moveToHome}
        ></img>
        <h2
          onClick={moveToHome}
          style={{ fontSize: "40px", marginright: "4px" }}
        >
          QAI
        </h2>
      </div>
      <div className="header-center">
        <button>
          <span
            onClick={moveToNewTec}
            className="span"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: colorNewTec,
            }}
            onMouseEnter={handleMouseEnterNewTec}
            onMouseLeave={handleMouseLeaveNewTec}
          >
            New technology
          </span>
        </button>
        <button onClick={moveToQnA}>
          <span
            onClick={moveToNewTec}
            className="span"
            style={{ fontSize: "20px", fontWeight: "bold", color: colorQnA }}
            onMouseEnter={handleMouseEnterQnA}
            onMouseLeave={handleMouseLeaveQnA}
          >
            Q&A
          </span>
        </button>
        <button onClick={moveToCommunity}>
          <span
            onClick={moveToNewTec}
            className="span"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: colorCommunity,
            }}
            onMouseEnter={handleMouseEnterCommunity}
            onMouseLeave={handleMouseLeaveCommunity}
          >
            Community
          </span>
        </button>
        <button onClick={moveToChat}>
          <span
            onClick={moveToNewTec}
            className="span"
            style={{ fontSize: "20px", fontWeight: "bold", color: colorChat }}
            onMouseEnter={handleMouseEnterChat}
            onMouseLeave={handleMouseLeaveChat}
          >
            Chat
          </span>
        </button>
      </div>
      <div className="header-right">
        {jwtToken ? (
          <React.Fragment>
            <button
              className="user"
              onClick={moveTomyPage}
              style={
                imgUrl === null
                  ? {
                      backgroundImage: `url('${userDefaultImg}')`,
                      backgroundPosition: "center",
                    }
                  : {
                      backgroundImage: `url('${imgUrl}')`,
                      border: "1px solid black",
                      borderRadius: "50px",
                      backgroundPosition: "center",
                      width: "50px",
                      height: "50px",
                    }
              }
            ></button>
            <span>
              <button className="username" onClick={moveTomyPage}>
                <span className="span">{nickname}</span>
              </button>
              님
            </span>
            <img
              src={divider}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            ></img>
            <button className="register" onClick={handleLogout}>
              <span className="btn_login_out">Logout</span>
            </button>
            <button className="hamburger-icon" onClick={toggleDropdown}>
              <FiMenu size={30} />
            </button>
            {isDropdownVisible && <DropdownMenu />}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button className="register" onClick={moveToLogin}>
              <span className="btn_login_out">Login</span>
            </button>
            <img
              src={divider}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            ></img>
            <button className="register" onClick={moveToRegister}>
              <span className="btn_login_out">Register</span>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
