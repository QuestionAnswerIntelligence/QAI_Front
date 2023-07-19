import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoils/Recoil";

import { API_URL } from "../Constant";
import "./MyPage.css";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({ email: "", name: "", age: "" });
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data.dat);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // AxiosError에 특화된 처리
          console.error(error.response);
          console.log(email);
        } else {
          // 일반적인 오류 처리
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [token]);

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
          이름
          <div className="profileBox">
            <span>{userInfo.name}</span>
          </div>
        </h3>
        <h3>
          나이
          <div className="profileBox">
            <span>{userInfo.age}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default MyPage;
