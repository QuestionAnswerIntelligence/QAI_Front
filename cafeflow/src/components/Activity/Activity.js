import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../Constant";
import userDefaultImg from "../../icons/Account_circle.png";
import { imgUrlState, nicknameState } from "../../recoils/Recoil";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import db from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

import "./Activity.css";

const Activity = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const [state, setState] = useState("프로필");
  const [imgUrl, setImgUrl] = useState(useRecoilValue(imgUrlState));
  const [postState, setPostState] = useState("qna");
  const [id, setId] = useState(localStorage.getItem("email"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [directoryName, setDirectoryName] = useState("profile");
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [imgFile, setImgFile] = useState("");
  const [type, setType] = useState("question");
  const [viewCnt, setViewCnt] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [editing, setEditing] = useState(false);

  const imgRef = useRef();

  const { memberId } = useParams(); // URL에서 memberId를 가져옵니다.
  const [profile, setProfile] = useState({});

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
          const imgUrl1 = response.data.data.imageUrl;
          localStorage.setItem("imageUrl1", imgUrl1);
          // console.log(localStorage.getItem("imageUrl"));
          setImgUrl(imgUrl1);
          console.log("이미지 업로드 완료되었습니다.");
        })
        .catch((error) => {
          console.error("이미지 업로드 중 에러:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/member/${memberId}/${type}/?page=${pageNum}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile(response.data);
        console.log("유저의 프로필을 불러옵니다!");
        console.log(response.data);

        const nickname = response.data.nickname;
        console.log(`Nickname: ${nickname}`);

        response.data.list.forEach((item) => {
          const title = item.title;
          const createdAt = item.createdAt;
          const id = item.id;

          console.log(`Title: ${title}, Created At: ${createdAt}, ID: ${id}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memberId, type]);

  let currentList = [];

  if (state === "comment") {
    currentList = profile.commentList;
  } else if (state === "답변") {
    currentList = profile.answerList;
  }

  const startChat = (nickname, question) => {
    // 현재 로그인한 유저와 게시글 작성자의 ID를 합쳐서 채팅방 ID를 생성. 항상 동일한 순서로 합침.'_' 으로 구분
    const chatId = [nickname, question.createdBy].sort().join("_");

    // 채팅방 조회
    db.collection("chats")
      .doc(chatId)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          // 채팅방이 존재하면, 그 채팅방으로 이동
          console.log("기존 채팅방으로 이동합니다!");
          navigate(`/chats/${chatId}`);
        } else {
          // 채팅방이 존재하지 않으면, 새로운 채팅방을 생성
          db.collection("chats")
            .doc(chatId)
            .set({
              users: [nickname, question.createdBy],
              messages: [],
            })
            .then(() => {
              console.log("새 채팅방으로 이동합니다!");
              // 새로운 채팅방으로 이동
              navigate(`/chats/${chatId}`);
            });
        }
      });
  };

  const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setHours(date.getHours() + 9); // UTC+9로 조정

    // 시간대 차이를 고려해야 하기 때문에 getUTC 메서드 대신 일반 메서드를 사용합니다.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하기 때문에 +1을 합니다.
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0"); // 24시간 형식으로 변환합니다.
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const truncateString = (str, length) => {
    if (!str) return ""; // str이 제공되지 않으면 빈 문자열을 반환
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="a">
      <div className="mypage_container1">
        <div className="mypage_container2">
          <div className="top-container">
            <h1>Profile</h1>
          </div>
          <div className="middle-container">
            <div>
              <div
                className="profile-img-container"
                style={
                  imgUrl === null
                    ? {
                        backgroundImage: `url('${userDefaultImg}')`,
                        backgroundPosition: "center",
                      }
                    : {
                        backgroundImage: `url('${imgUrl}')`,
                        border: "1px solid gray",
                        borderRadius: "50%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "cover",
                        width: "150px",
                        height: "150px",
                      }
                }
              ></div>
            </div>
            <div className="info-container">
              <div>
                <p className="label1">닉네임</p>
                <p className="label2">
                  <b>{profile.nickname}</b>
                </p>
              </div>
              {/* <div>
                <div>
                  <p className="label1">포트폴리오</p>
                  <a>
                    <img className="logo1"></img>
                  </a>
                  <a>
                    <img className="logo2"></img>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
          <div className="check-outer-box">
            <div className="check-inner-box">
              <p className="check-p1">내 프로필을 조회한 사람</p>
              <p className="check-p2">
                <span style={{ color: "black" }}>{viewCnt}</span>명이 내
                프로필을 조회했습니다.
              </p>
            </div>
          </div>
          <div className="select-outer-box">
            <div
              className="select-inner-box"
              style={{
                marginBottom: "2vh",
              }}
            >
              <button
                onClick={() => {
                  setState("QnA");
                  setType("question");
                }}
              >
                Q&A
              </button>
              <button
                onClick={() => {
                  setState("board");
                  setType("board");
                }}
              >
                Community
              </button>
              <button
                onClick={() => {
                  setState("comment");
                  setType("comment");
                }}
              >
                내가 단 댓글
              </button>
            </div>
          </div>
          <div className="mypage-divider">
            <span
              className={
                state === "QnA"
                  ? "Qna"
                  : state === "Community"
                  ? "Community"
                  : state === "comment"
                  ? "comment"
                  : state
              }
            ></span>
          </div>
          {/* 프로필 */}
          {/* {state === "프로필" && (
            <div className="middle-container">
              <div className="profile-img-container"></div>
              <div className="info-container1">
                <div className="info">
                  <p className="label2">
                    <b>{profile.email}</b>
                  </p>
                </div>
                <div>
                  <p className="label1">닉네임</p>
                  <p className="label2">
                    <b>{truncateString(profile.nickname, 10)}</b>
                  </p>
                </div>
                <div>
                  <p className="label1">포트폴리오</p>
                  <div>
                    <img style={{ marginRight: "1vw" }} className="logo1"></img>
                    <img className="logo2"></img>
                  </div>
                </div>
              </div>
            </div>
          )} */}
          {/* QnA 부분 */}
          {state === "QnA" && (
            <div className="listContainer">
              <div
                className="ppp"
                style={{ overflow: "scroll", height: "80%" }}
              >
                {profile.list &&
                  profile.list.map((post, index) => (
                    <div key={index} className="list">
                      <div>
                        <span style={{ marginRight: "2vw", marginLeft: "2vw" }}>
                          {post.boardType}
                        </span>
                        <span style={{ maxWidth: "5vw" }}>
                          {truncateString(post.title, 10)}
                        </span>
                      </div>
                      <div className="time">
                        <p>{formattedDate(post.createdAt)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {/* 통합게시판 */}
          {state === "board" && (
            <div className="container">
              <div className="listContainer">
                <div
                  className="ppp"
                  style={{ overflow: "scroll", height: "80%" }}
                >
                  {profile.list &&
                    profile.list.map((post, index) => (
                      <div key={index} className="list">
                        <div>
                          <span
                            style={{ marginRight: "2vw", marginLeft: "2vw" }}
                          >
                            {post.boardType}
                          </span>
                          <span style={{ maxWidth: "5vw" }}>{post.title}</span>
                        </div>
                        <div className="time">
                          <p>{formattedDate(post.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {/* Comment 부분 */}
          {state === "comment" && (
            <div className="container">
              <div className="listContainer">
                <h2
                  style={{
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  Q&A
                </h2>
                <div
                  className="ppp"
                  style={{ overflow: "scroll", height: "80%" }}
                >
                  {profile.answerList &&
                    profile.answerList.map((item, index) => (
                      <div key={index} className="listItem">
                        <div className="listTitle">{item.title}</div>
                        <div className="listTime">
                          {formattedDate(item.createdAt)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="listContainer">
                <h2
                  style={{
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  Community
                </h2>
                <div
                  className="ppp"
                  style={{ overflow: "scroll", height: "80%" }}
                >
                  {profile.commentList &&
                    profile.commentList.map((item, index) => (
                      <div key={index} className="listItem">
                        <div className="listTitle">{item.title}</div>
                        <div className="listTime">
                          {formattedDate(item.createdAt)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
