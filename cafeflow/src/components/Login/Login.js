import React from "react";

import "./Login.css";

const Login = () => {
  return (
    <div>
      <div className="login-container">
        <form className="login-form">
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요"
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="input"
          />
          <button type="submit" className="submit">
            로그인
          </button>
          <button type="submit" className="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
