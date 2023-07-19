import axios from "axios";
import React, { useState } from "react";

import { useSetRecoilState } from "recoil";
import { tokenState, usernameState } from "../../recoils/Recoil";
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
  const age = useSetRecoilState(usernameState);

  const handleLogin = () => {
    axios
      .post(`${API_URL}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);

        const { jwtToken, email, age, name } = response.data;

        setToken(jwtToken);
        console.log("email: ", email);
        console.log("name: ", name);
        console.log("age: ", age);
        console.log("jwtToken: ", jwtToken);

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("email", response.data.email);

        alert("로그인에 성공했습니다.");
        navigate("/myPage");
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
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="input"
          onClick={handleLogin}
          style={{ width: 416 }}
        >
          로그인
        </button>
        <button
          type="submit"
          className="input"
          onClick={moveToRegister}
          style={{ width: 416 }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
