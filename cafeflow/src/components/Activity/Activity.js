import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Constant";
import { useParams } from "react-router-dom";
import "./Activity.css";

const Activity = () => {
  const token = localStorage.getItem("jwtToken");
  const [state, setState] = useState("프로필");
  const [postState, setPostState] = useState("qna");
  const [id, setId] = useState(localStorage.getItem("email"));
  const [type, setType] = useState("question");
  const [pageNum, setPageNum] = useState(0);

  const { memberId } = useParams(); // URL에서 memberId를 가져옵니다.
  const [profile, setProfile] = useState({});

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

  const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setHours(date.getHours() + 9); // UTC+9로 조정

    // 시간대 차이를 고려해야 하기 때문에 getUTC 메서드 대신 일반 메서드를 사용합니다.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하기 때문에 +1을 합니다.
    const day = String(date.getDate()).padStart(2, "0");
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
          <div className="select-outer-box">
            <div className="select-inner-box">
              <button onClick={() => setState("프로필")}>프로필</button>
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
                state === "프로필"
                  ? "profile"
                  : state === "QnA"
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
          {state === "프로필" && (
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
          )}
          {/* QnA 부분 */}
          {state === "QnA" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
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
          )}
          {/* 통합게시판 */}
          {state === "board" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {profile.list &&
                profile.list.map((post, index) => (
                  <div key={index} className="list">
                    <div>
                      <span style={{ marginRight: "2vw", marginLeft: "2vw" }}>
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
          )}
          {/* Comment 부분 */}
          {state === "comment" && (
            <div className="container">
              <div className="listContainer">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <h2>Q&A</h2>
                </div>
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
              <div className="listContainer">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <h2>Community</h2>
                </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
