import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../Constant";

import "./MyPage.css";

const MyPage = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("jwtToken");
  const point = localStorage.getItem("point");

  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    point: 0,
  });
  useEffect(() => {
    axios
      .get(`${API_URL}/get-info?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo({ email, nickname, point });
      })
      .catch((error) => {
        console.log(error);
        console.log(token);
      });
  }, [token]);
  return (
    <div className="a">
      <div className="container1">
        <div className="container">
          <h1>내 정보</h1>
          <div>
            <h3>
              아이디
              <div className="profileBox">{userInfo.email}</div>
            </h3>
            <h3>
              닉네임
              <div className="profileBox">{userInfo.nickname}</div>
            </h3>
            <h3>
              내공 점수
              <div className="profileBox">{userInfo.point}</div>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
