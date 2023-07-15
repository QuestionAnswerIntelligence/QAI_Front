import React from "react";

import "./Register.css";

const Register = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <input type="text" name="name" placeholder="이름" className="input" />
        <input
          type="date"
          name="birth"
          placeholder="생년월일"
          className="input"
        />
        <input
          type="text"
          name="id"
          placeholder="아이디 (2~10자의 영문과 숫자를 조합해주세요)"
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 확인"
          className="input"
        />
        <button type="submit" className="submit">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
