import React from "react";

import { useRecoilValue } from "recoil";
import { emailState, nicknameState } from "../../recoils/Recoil";
import "./MyPage.css";
import { ageState } from "../../recoils/Recoil";

const MyPage = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const age = localStorage.getItem("age");

  return (
    <div className="container">
      <h1>내 정보</h1>
      <div>
        <h3>
          아이디
          <div className="profileBox">
            <span>{email}</span>
          </div>
        </h3>
        <h3>
          닉네임
          <div className="profileBox">
            <span>{nickname}</span>
          </div>
        </h3>
        <h3>
          나이
          <div className="profileBox">
            <span>{age}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default MyPage;
