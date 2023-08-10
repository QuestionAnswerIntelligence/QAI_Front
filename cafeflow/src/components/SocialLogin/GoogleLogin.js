import React from "react";

import google from "../../icons/google.png";

const GoogleLogin1 = () => {
  const GOOGLE_CLIENTID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${GOOGLE_CLIENTID}`;

  return (
    <img
      alt="구글 로그인"
      src={google}
      width="50px"
      height="50px"
      style={{ border: "1px solid lightgray", borderRadius: "50%" }}
      onClick={() => (window.location.href = GOOGLE_URI)}
    />
  );
};

export default GoogleLogin1;
