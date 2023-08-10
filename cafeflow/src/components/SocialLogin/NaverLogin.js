import React from "react";

import naver from "../../icons/naver.png";

const NaverLogin = () => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/login/oauth2/callback/naver";
  const STATE = "project"; // 상태 유지를 위한 임의 값
  const NAVER_AUTH_URL = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  return (
    <img
      alt="네이버 로그인"
      src={naver}
      width="50px"
      height="50px"
      onClick={() => (window.location.href = NAVER_AUTH_URL)}
    />
  );
};

export default NaverLogin;
