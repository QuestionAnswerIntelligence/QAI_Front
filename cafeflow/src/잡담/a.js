import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { tokenState } from "../Recoil";

import { API_URL } from "../Constant";
import "./MyPage.css";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-info`, {
          headers: {
            Authorization: `Bearer ${token}`, // header에 토큰 포함
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchData();
  }, [token]);

  const { id, name, age } = userInfo; // userInfo를 구조 분해 할당

  return (
    <div className="container">
      <h1>내 정보</h1>
      <div>
        <h3>
          아이디
          <div className="profileBox">
            <span>{id}</span>
          </div>
        </h3>
        <h3>
          이름
          <div className="profileBox">
            <span>{name}</span>
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
