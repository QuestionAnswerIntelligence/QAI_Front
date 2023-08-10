import React from "react";

import kakao from "../../icons/kakao.png";

const KakaoLogin = () => {
  const KAKAO_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <img
      alt="카카오 로그인"
      src={kakao}
      width="50px"
      height="50px"
      style={{ borderRadius: "50%" }}
      onClick={() => (window.location.href = KAKAO_URL)}
    />
  );
};

export default KakaoLogin;
