import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../SocialLogin/KakaoLogin";
import NaverLogin from "../SocialLogin/NaverLogin";
import GoogleLogin1 from "../SocialLogin/GoogleLogin";
import { API_URL } from "../Constant";
import LogoQAI from "../../icons/LogoQAI.png";
import userDefaultImg from "../../icons/Account_circle.png";
import "./Register.css";
import { useSetRecoilState } from "recoil";
import { imgUrlState } from "../../recoils/Recoil";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태
  const isFormFilled = email && password && nickname && age; // 모든 필드가 채워져 있는지 확인하는 상태 변수
  const [directoryName, setDirectoryName] = useState("profile");
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const setImgUrl = useSetRecoilState(imgUrlState);

  const handleRegister = (event) => {
    event.preventDefault();

    // 유효성 검사

    if (!nickname) {
      setErrorMessage(alert("닉네임이 입력되지 않았습니다!"));
      return;
    }
    if (!age) {
      setErrorMessage(alert("나이가 입력되지 않았습니다!"));
      return;
    }
    if (!email) {
      setErrorMessage(alert("아이디가 입력되지 않았습니다!"));
      return;
    }
    if (!password) {
      setErrorMessage(alert("비밀번호가 입력되지 않았습니다!"));
      return;
    }
    if (!isFormFilled) {
      setErrorMessage("모든 필드를 채워주세요!");
      return;
    }

    axios
      .post(`${API_URL}/sign-up`, {
        email: email,
        password: password,
        nickname: nickname,
        age: age,
        url: localStorage.getItem("imageUrl"),
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("imageUrl", null);
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

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader(); // 파일마다 새로운 FileReader 객체 생성

    reader.onloadend = () => {
      setImgFile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("directoryName", directoryName);
      axios
        .post(`${API_URL}/upload/image`, formData)
        .then((response) => {
          const imgUrl = response.data.data.imageUrl;
          // console.log(response.data.data.imageUrl);
          localStorage.setItem("imageUrl", imgUrl);
          console.log(localStorage.getItem("imageUrl"));
          setImgUrl(imgUrl);
          console.log("이미지 업로드 완료되었습니다.");
        })
        .catch((error) => {
          console.error("이미지 업로드 중 에러:", error);
        });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <img src={LogoQAI}></img>
        <h2>회원가입</h2>
        <div className="button-container">
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin1 />
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="input-container">
          <span for="nickname" className="input-label">
            닉네임
          </span>
          <input
            type="string"
            id="nickname"
            name="nickname"
            placeholder="닉네임"
            className="input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="input-container">
          <span for="nickname" className="input-label">
            나이
          </span>
          <input
            type="string"
            name="birth"
            placeholder="나이"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="input-container">
          <span for="id" className="input-label">
            아이디
          </span>
          <input
            type="string"
            name="id"
            placeholder="아이디 (2~10자의 영문과 숫자를 조합해주세요)"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <span for="id" className="input-label">
            비밀번호
          </span>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* 추가 */}
        <img
          style={{ width: "200px", height: "200px" }}
          src={imgFile ? imgFile : userDefaultImg}
          alt="프로필 이미지"
        />
        <form className="form-signup">
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            // onChange={(event)=>{alert(event.target.files[0].name)}}
            ref={imgRef}
          />
        </form>
        <div>
          <p style={{ margin: "0px", fontSize: "11px", color: "gray" }}>
            By creating an account, you agree to the Terms of use and Privacy
            Policy.
          </p>
        </div>
        <div>
          {errorMessage}
          <button
            style={{
              backgroundColor: isFormFilled ? "#564e97" : "lightgray", // 모든 필드가 채워졌을 때 버튼 색상을 초록색으로 변경
            }}
            type="submit"
            className="submit"
            onClick={handleRegister}
          >
            회원가입
          </button>
        </div>
        <div>
          <p
            style={{
              margin: "0px",
              fontSize: "13px",
              color: "gray",
              marginTop: "20px",
            }}
          >
            계정이 이미 존재하나요?{" "}
            <a href="/login" style={{ textDecoration: "underline" }}>
              로그인 하기
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
