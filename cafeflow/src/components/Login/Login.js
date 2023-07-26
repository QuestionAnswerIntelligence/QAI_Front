import axios from "axios";
import React, { useState } from "react";

import { useSetRecoilState } from "recoil";
import {
  tokenState,
  ageState,
  emailState,
  nicknameState,
} from "../../recoils/Recoil";
import { API_URL } from "../Constant";

import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const moveToRegister = () => {
    navigate("/register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setToken = useSetRecoilState(tokenState);
  const setAge = useSetRecoilState(ageState);
  const setEmail1 = useSetRecoilState(emailState);
  const setNickname = useSetRecoilState(nicknameState);

  const handleLogin = () => {
    axios
      .post(`${API_URL}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const { jwtToken, email, age, nickname } = response.data;

        console.log(response.data);
        setToken(jwtToken);
        setAge(age);
        setEmail1(email);
        setNickname(nickname);

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("email", email);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("age", age);

        alert("로그인에 성공했습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        alert("로그인에 실패했습니다.");
      });
  };
  return (
    <div>
      <div className="login-container">
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요"
          className="input1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          className="input1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit1" className="input2" onClick={handleLogin}>
          로그인
        </button>
        <button type="submit1" className="input2" onClick={moveToRegister}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
