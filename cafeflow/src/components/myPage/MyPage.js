import React from "react";

import "./MyPage.css";

const MyPage = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const age = localStorage.getItem("age");

  return (
    <div className="a">
      <div className="container1">
        <div className="container">
          <h1>내 정보</h1>
          <div>
            <h3>
              아이디
              <div className="profileBox">{email}</div>
            </h3>
            <h3>
              닉네임
              <div className="profileBox">{nickname}</div>
            </h3>
            {/* <h3>
          나이
          <div className="profileBox">{age}</div>
        </h3> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
