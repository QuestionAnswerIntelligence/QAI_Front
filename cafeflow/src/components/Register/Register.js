import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../Constant";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/sign-up`, {
        email: email,
        password: password,
        nickname: nickname,
        age: age,
      })
      .then((response) => {
        console.log(response);
        alert("회원가입이 완료되었습니다.");

        /* 회원가입 성공 후 로그인 페이지로 이동 */
        navigate("/login");
      })
      .catch((error) => {
        /* console에 에러 찍어보기 */
        console.log(error.response);
        alert("회원가입에 실패했습니다.");
      });
  };
  return (
    <div className="login-container">
      <form className="login-form">
        <input
          type="string"
          name="nickname"
          placeholder="닉네임"
          className="input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="string"
          name="birth"
          placeholder="나이"
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="string"
          name="id"
          placeholder="아이디 (2~10자의 영문과 숫자를 조합해주세요)"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit" onClick={handleRegister}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
