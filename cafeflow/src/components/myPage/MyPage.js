import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../Constant";

import "./MyPage.css";

const MyPage = () => {
  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/get-info?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { email, nickname, point } = response.data;
        setEmail(email);
        setNickname(nickname);
        setPoint(point);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(token);
      });
  }, [token, email]); // email도 의존성 배열에 추가하여 email 값이 변경될 때마다 API 호출

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
            <h3>
              내공 점수
              <div className="profileBox">{point}</div>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
