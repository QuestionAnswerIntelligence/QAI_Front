import React from "react";
import { useNavigate } from "react-router-dom";

import layer1 from "../../icons/layer1.png";
import layer2 from "../../icons/layer2.png";
import character from "../../icons/character.png";
import arrow from "../../icons/Arrow.png";
import "./Home.css";
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
    rel="stylesheet"
  />
</head>;

const Home = () => {
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="main">
        <div className="explain">
          <head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
          </head>

          <h1 class="animate__animated animate__fadeInLeftBig">
            매일 쏟아지는 AI 신기술 정보와
            <br />
            명쾌한 답변을
            <br />
            실시간으로 받아보세요
          </h1>
          <span class="animate__animated animate__fadeIn animate__delay-1s">
            매일 00개의 Q&A와 신기술 업데이트를 받아보세요
            <br />
            해당 부분은 위 소개에 대한 부속 설명을 적는 곳입니다
          </span>
          <button className="goLogin" onClick={moveToLogin}>
            <span>지금 바로 로그인하기 </span>
            <img
              src={arrow}
              style={{ marginLeft: "12px", width: "25px", height: "25px" }}
            ></img>
          </button>
        </div>
        <div className="character">
          <img src={character} className="char"></img>
          {/* 메인 화면 밑에 구현 완료하면 주석 풀 예정 */}
          {/* <div className="layer-left">
          <img src={layer2}></img>
        </div>
        <div className="layer-right">
          <img src={layer2}></img>
        </div> */}
        </div>
      </div>

      <div className="main2"></div>
      <div className="main3"></div>
      <div className="aa" style={{ backgroundColor: "green" }}></div>
    </div>
  );
};

export default Home;
