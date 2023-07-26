import React from "react";

import { useRecoilValue } from "recoil";
import { emailState, nameState } from "../../recoils/Recoil";
import "./MyPage.css";
import { ageState } from "../../recoils/Recoil";

const MyPage = () => {
  const age = useRecoilValue(ageState);
  const email = useRecoilValue(emailState);
  const name = useRecoilValue(nameState);

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
            <span>{name}</span>
          </div>
        </h3>
        <h3>
          나이
          <div className="profileBox">
            <span>{age}</span>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default MyPage;
