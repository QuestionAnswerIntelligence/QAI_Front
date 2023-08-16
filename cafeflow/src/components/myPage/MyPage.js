import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { API_URL } from "../Constant";

import "./MyPage.css";

import shareIcon from "../../icons/share_android.png";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { nicknameState } from "../../recoils/Recoil";
const MyPage = () => {
  const navigate = useNavigate();

  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  // const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  const token = localStorage.getItem("jwtToken");

  const [state,setState]=useState("프로필");
  const [editing,setEditing]=useState(false);
  const [editEmail,setEditEmail]=useState(localStorage.getItem("email"));
  const [editNickname,setEditNickName]=useState(localStorage.getItem("nickname"));
  // 추가
  const [imgUrl,setImgUrl]=useState(localStorage.getItem("imageUrl"));
  const [editUrl,setEditUrl]=useState("");
  const [postState,setPostState]=useState("qna");
  const [posts, setPosts] = useState([]);
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const [id, setId] = useState(localStorage.getItem("email"));
  const [type, setType] = useState("question");

  const moveToStore = () => {
    navigate("/store");
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/get-info?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { email, nickname, point } = response.data;
        setEmail(email);
        setNickname(nickname);
        setPoint(point);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // console.log(token);
      });
  }, [token, email]); // email도 의존성 배열에 추가하여 email 값이 변경될 때마다 API 호출

  const getPost = () => {
    axios
      .get(`${API_URL}/member/${id}/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleQnA = () => {
    setPostState("qna");
    getPost();
  };
  const qna_div = (
    <div
      style={{ width: "500px", height: "500px", backgroundColor: "yellow" }}
    ></div>
  );

  const community_div = (
    <div
      style={{ width: "500px", height: "500px", backgroundColor: "red" }}
    ></div>
  );

  const posts_div = 
    <div>
      <button onClick={handleQnA}>Q&A</button>

      <button onClick={()=>{setPostState("community")}}>Community</button>
      {postState==="qna"?qna_div:community_div}
            
  </div>
  

  const EditingChange=()=>{
    if(editing){
      axios
        .patch(
          `${API_URL}/update/info`,
          {
            nickname: editNickname,
            email: editEmail,
            // url: editUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("mypage 수정 완료!");
          console.log(response);
          // localStorage.setItem("nickname",nickname)

          // API 호출 후 반환된 값(또는 수정된 값)으로 상태를 업데이트합니다.
          // 이 부분은 서버의 응답에 따라 달라질 수 있습니다.
          // 아래는 예시로, 서버가 수정된 값을 반환한다고 가정하였습니다.
          setNickname(editNickname);
          setEmail(editEmail);

          // 로컬 스토리지의 값을 업데이트하는 것도 좋은 방법입니다.
          localStorage.setItem("nickname", editNickname);
          localStorage.setItem("email", editEmail);
        })
        .catch((error) => {
          console.error(error);
          console.log(token);
        });
    }
    setEditing(!editing);

  }
  // const [imgFile, setImgFile] = useState("");
  // const imgRef = useRef();

  // const saveImgFile = () => {
  //   const file = imgRef.current.files[0];
    
  //   const reader = new FileReader(); // 파일마다 새로운 FileReader 객체 생성
    
  //   reader.onloadend = () => {
  //     setImgFile(reader.result);
  //   };
    
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // }
  return (
    <div className="a">
      <div className="mypage_container1">
        <div className="mypage_container2">
          <div className="top-container">
            <h1>My Page</h1>
            <div
              className="share_edit_button-container"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                className="share_edit_button"
                style={{ color: "black" }}
              ></button>
              <button
                className="share_edit_button"
                style={{ color: "black" }}
                onClick={EditingChange}
              >
                <b>편집</b>
              </button>
            </div>
          </div>
          <div className="middle-container">

            <div className="profile-img-container" style={{ backgroundImage: `url('${imgUrl}')`, border:"5px solid black", borderRadius:"50px" , backgroundPosition:"center"}}>
              
            </div>
            {/* <img src={imgFile?imgFile:`/imges/icon/user.png`}
            alt="프로필 이미지"
            /> */}
            {/* <form className="form-signup">
              
              <label className="signup-profileImg-label" htmlFor="profileImg">프로필 이미지 추가</label>
              <input 
              className="signup-profileImg-input"
              type="file"
              accept="image/*"
              id="profileImg"
              // onChange={saveImgFile}
              onChange={(event)=>{alert(event.target.files[0].name)}}
              ref={imgRef}
              />
            </form> */}
            <div className="info-container">
              <div className="info">
                <p className="label1">아이디</p>
                {editing ? (
                  <input
                    type="string"
                    name="id"
                    placeholder="아이디"
                    className="editInput"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  <p className="label2">
                    <b>{email}</b>
                  </p>
                )}
              </div>
              <div>
                <p className="label1">닉네임</p>
                {editing ? (
                  <input
                    type="string"
                    name="id"
                    placeholder="닉네임"
                    className="editInput"
                    value={editNickname}
                    onChange={(e) => setEditNickName(e.target.value)}
                  />
                ) : (
                  <p className="label2">
                    <b>{nickname}</b>
                  </p>
                )}
              </div>
              <div>
                <div>
                  <p className="label1">포트폴리오</p>
                  <a>
                    <img className="logo1"></img>
                  </a>
                  <a>
                    <img className="logo2"></img>
                  </a>
                  <a>
                    <img className="logo3"></img>
                  </a>
                </div>
              </div>
              <div className="point-container">
                <div>
                  <p className="label1">내 포인트</p>
                  <p className="label2">
                    <b>{point}베리</b>
                  </p>
                </div>
                <button className="charge-button" onClick={moveToStore}>
                  충전하기
                </button>
              </div>
            </div>
          </div>
          <div className="check-outer-box">
            <div className="check-inner-box" style={{}}>
              <p className="check-p1">내 프로필을 조회한 사람</p>
              <p className="check-p2">
                5월 14일-8월 11일 동안{" "}
                <span style={{ color: "black" }}>674</span>명이 내 프로필을
                조회했습니다.
              </p>
            </div>
          </div>

          <div className="select-outer-box">
            <div className="select-inner-box">
              <button onClick={() => setState("프로필")}>프로필</button>
              <button onClick={() => setState("게시물")}>게시물</button>
              <button onClick={() => setState("답변")}>답변</button>
            </div>
          </div>
          <div className="mypage-divider">
            <span
              className={
                state === "프로필"
                  ? "profile"
                  : state === "게시물"
                  ? "post1"
                  : "answer"
              }
            ></span>
          </div>
          {state === "게시물" ? posts_div : ""}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
