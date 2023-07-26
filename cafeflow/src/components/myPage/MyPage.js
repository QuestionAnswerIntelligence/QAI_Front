import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoils/Recoil";

import { API_URL } from "../Constant";
import "./MyPage.css";

const MyPage = () => {
  const [users, setUsers] = useState([]);
  const token = useRecoilValue(tokenState); // Recoil을 이용해 저장된 토큰 정보를 가져옵니다.

  useEffect(() => {
    axios
      .get(`${API_URL}/get-info`, {
        headers: {
          Authorization: `Bearer ${token}`, // 서버에 전달할 토큰을 header에 포함시킵니다.
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);
  return (
    <div className="container">
      <h1>내 정보</h1>
      <div>
        <h3>
          아이디
          <div className="profileBox">
            <span>{users.name}</span>
          </div>
        </h3>
        <h3>
          이름
          <div className="profileBox">
            <span>{}</span>
          </div>
        </h3>
        <h3>
          나이
          <div className="profileBox">
            <span>{}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default MyPage;
