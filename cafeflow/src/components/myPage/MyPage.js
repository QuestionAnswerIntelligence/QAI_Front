import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../Constant";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import { useRecoilState } from "recoil";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { nicknameState } from "../../recoils/Recoil";
import userDefaultImg from "../../icons/Account_circle.png";
import share_img from "../../icons/share_android.png";
import share_img_editing from "../../icons/editing_share_button.png";
import { imgUrlState } from "../../recoils/Recoil";

const MyPage = () => {
  const navigate = useNavigate();

  const moveToStore = () => {
    navigate("/store");
  };
  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  // const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  const token = localStorage.getItem("jwtToken");

  const [state, setState] = useState("프로필");
  const [editing, setEditing] = useState(false);
  const [editEmail, setEditEmail] = useState(localStorage.getItem("email"));
  const [editNickname, setEditNickName] = useState(
    localStorage.getItem("nickname")
  );
  const memberId = localStorage.getItem("memberId");
  const [pageNum, setPageNum] = useState(0);

  const [type, setType] = useState("question");
  // 추가

  const setEditImgUrl = useSetRecoilState(imgUrlState);
  const [imgUrl, setImgUrl] = useState(useRecoilValue(imgUrlState));
  const [postState, setPostState] = useState("qna");
  const [posts, setPosts] = useState([]);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const [directoryName, setDirectoryName] = useState("profile");
  const [viewCnt, setViewCnt] = useState(0);

  const [id, setId] = useState(localStorage.getItem("email"));

  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/get-info?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { email, nickname, point, viewCnt } = response.data;
        console.log(response.data);
        setEmail(email);
        setNickname(nickname);
        setPoint(point);
        setViewCnt(viewCnt);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // console.log(token);
      });
  }, [token, email, viewCnt]); // email도 의존성 배열에 추가하여 email 값이 변경될 때마다 API 호출

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
        console.log(memberId);
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

  const EditingChange = () => {
    if (editing) {
      axios
        .patch(
          `${API_URL}/update/info`,
          {
            nickname: editNickname,
            email: editEmail,
            url: imgUrl,
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

          // API 호출 후 반환된 값(또는 수정된 값)으로 상태를 업데이트
          // 이 부분은 서버의 응답에 따라 달라질 수 있음
          // 아래는 예시로, 서버가 수정된 값을 반환한다고 가정
          setNickname(editNickname);
          setEmail(editEmail);
          setEditImgUrl(imgUrl);

          localStorage.setItem("nickname", editNickname);
          localStorage.setItem("email", editEmail);
        })
        .catch((error) => {
          console.error(error);
          console.log(token);
        });
    }
    setEditing(!editing);
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
            <p
              style={
                editing
                  ? { color: "gray", fontSize: "50px" }
                  : { color: "black", fontSize: "50px" }
              }
            >
              <b>My Page</b>
            </p>
            <div
              className="share_edit_button-container"
              style={{ display: "flex", alignItems: "center" }}
            >
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
            <div>
              {editing ? (
                <div>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src={
                      imgFile
                        ? imgFile
                        : imgUrl === null
                        ? userDefaultImg
                        : imgUrl
                    }
                    alt="프로필 이미지"
                  />
                  <form className="form-edit">
                    <label
                      className="edit-profileImg-label"
                      htmlFor="profileImg"
                    >
                      프로필 이미지 변경
                    </label>
                    <input
                      className="edit-profileImg-input"
                      type="file"
                      accept="image/*"
                      id="profileImg"
                      onChange={saveImgFile}
                      // onChange={(event)=>{alert(event.target.files[0].name)}}
                      ref={imgRef}
                    />
                  </form>
                </div>
              ) : (
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
              )}
            </div>

            <div className="info-container">
              <div className="info">
                <p className="label1">아이디</p>
                <p className="label2">
                  <b>{email}</b>
                </p>
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
                <span style={{ color: "black" }}>{viewCnt}</span>명이 내
                프로필을 조회했습니다.
              </p>
            </div>
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

export default MyPage;
