import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Constant";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  tokenState,
  nicknameState,
  emailState,
  idState,
} from "../../recoils/Recoil";

const KakaoCallback = () => {
  const navigate = useNavigate();

  const [jwtToken, setJwtToken] = useRecoilState(tokenState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [id, setId] = useRecoilState(idState);
  const setEmail1 = useSetRecoilState(emailState);

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    axios
      .get(`${API_URL}/login/oauth2/callback/kakao`, { params: { code } })
      .then((response) => {
        const { jwtToken, nickname, email, point, id } = response.data.data;
        console.log(response.data);
        console.log(point);
        // 닉네임을 10자로 제한
        const truncatedNickname = nickname.substring(0, 10);

        const storedToken = localStorage.getItem("jwtToken");

        if (storedToken) {
          setJwtToken(storedToken);
          // 닉네임을 10자로 제한하여 불러옵니다.
          const storedNickname = localStorage.getItem("nickname");
          if (storedNickname) {
            setNickname(storedNickname.substring(0, 10));
          }
        }

        console.log("10글자로 제한한 닉네임:", truncatedNickname);
        // Recoil 상태 업데이트
        setJwtToken(jwtToken);
        setNickname(truncatedNickname);
        setEmail1(email);
        setId(id);

        // 로컬 스토리지에도 저장
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("nickname", truncatedNickname);
        localStorage.setItem("email", email);
        localStorage.setItem("point", point);
        localStorage.setItem("memberId", id);

        console.log("로그인 성공!");
        console.log("Token:", jwtToken);
        console.log("Nickname:", nickname);
        console.log("email:", email);

        console.log(code);

        navigate("/"); // 메인 페이지로 이동
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }, []);

  return <div>Loading...</div>;
};

export default KakaoCallback;
