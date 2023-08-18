import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import db from "../firebase";
import { API_URL } from "../Constant";
import ViewCount from "../../icons/ViewCount.png";
import "./Community.css";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const [type, setType] = useState("자유게시판");
  const [posts, setposts] = useState([]);
  const [isFreeBoardClick, SetIsFreeBoardClick] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(8);
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState("제목");
  const nickname = localStorage.getItem("nickname");
  const [showChatButton, setShowChatButton] = useState(""); // 1. 채팅 버튼 표시 상태를 관리하기 위한 state

  const navigate = useNavigate();

  // toggleChatButton 함수를 수정하여 특정 질문에 대한 상태만 변경
  const toggleChatButton = (createdBy) => {
    if (showChatButton === createdBy) {
      setShowChatButton(""); // 이미 선택된 작성자를 다시 클릭하면 버튼 숨기기
    } else {
      setShowChatButton(createdBy); // 다른 작성자를 클릭하면 해당 작성자에게 버튼 표시
    }
  };

  const startChat = (nickname, posts) => {
    // 현재 로그인한 유저와 게시글 작성자의 ID를 합쳐서 채팅방 ID를 생성. 항상 동일한 순서로 합침.'_' 으로 구분
    const chatId = [nickname, posts.createdBy].sort().join("_");

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
              users: [nickname, posts.createdBy],
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

  const WatchProfile = (memberId) => {
    // memberId를 이용하여 프로필 페이지로 이동
    navigate(`/activity/${memberId}`);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setposts(response.data.data.boardList);
        setLoading(false); // 데이터가 로드되면 로딩 상태를 false로 변경
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // 에러 발생 시 로딩 상태를 false로 변경
      });
  }, [token, pageNum, size, type]); // 여기에 type를 추가했습니다.

  const turnState_f = () => {
    if (!isFreeBoardClick) {
      setType("자유게시판");
      SetIsFreeBoardClick(true);
    }
  };

  const turnState_s = () => {
    if (isFreeBoardClick) {
      setType("공유게시판");
      SetIsFreeBoardClick(false);
    }
  };

  const moveToMakeQuestion = () => {
    if (isFreeBoardClick) {
      navigate("/freeform");
    } else {
      navigate("/shareform");
    }
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}&option=${option}&searchKeyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setposts(response.data.data.boardList);
        e.target.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleSelect = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="a">
      <div className="community-container">
        <div className="post-container">
          <h1 style={{ margin: "0px" }}>커뮤니티</h1>
          <button className="postbutton2" onClick={moveToMakeQuestion}>
            글쓰기
          </button>
        </div>
        <span className="community-span" style={{ fontWeight: "bold" }}>
          개발자들과 소통해 보아요!
        </span>
        <div className="searchBox">
          <form className="searchQnA" onSubmit={handleSubmit}>
            <select className="select-box" onChange={handleSelect}>
              <option value="제목">제목</option>
              <option value="내용">내용</option>
              <option value="제목+내용">제목+내용</option>
            </select>
            <input
              className="QnA-search"
              type="text"
              placeholder="Search"
              onChange={handleInputChange}
            ></input>
          </form>
        </div>
        {/* <div style={{ marginTop: "1vh" }} className="divider1"></div> */}
        <div className="mycontainer">
          <button className="board_list" onClick={turnState_f}>
            자유게시판
          </button>
          <button className="board_list" onClick={turnState_s}>
            프로젝트 공유 게시판
          </button>
        </div>
        <div className="divider1">
          <span
            className={isFreeBoardClick ? "freeboard" : "shareboard"}
          ></span>
        </div>
        <div className="board-container">
          {/* map 함수를 이용하여 questions에 들어가있는 배열 가져오기 */}
          {posts &&
            posts.map((post) => (
              <div>
                <ul className="post-list1" key={post.boardId}>
                  <li className="community-post-list">
                    <div className="QnAList2">
                      <div>
                        {nickname !== post.createdBy &&
                          token &&
                          showChatButton === post.createdBy && (
                            <>
                              <button
                                className="StartChatButton"
                                onClick={() => startChat(nickname, post)}
                              >
                                1:1 채팅하기
                              </button>
                              <button
                                className="StartChatButton"
                                onClick={() => WatchProfile(post.memberId)}
                              >
                                프로필 보기
                              </button>
                            </>
                          )}
                        <h2 onClick={() => toggleChatButton(post.createdBy)}>
                          {post.createdBy}
                        </h2>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5vw",
                        }}
                      >
                        <img className="viewCountImg1" src={ViewCount}></img>
                        <span className="viewCountSpan">{post.viewCount}</span>
                      </div>
                    </div>
                    <div className="community-post-list-middle">
                      <Link
                        className="community-title"
                        to={
                          isFreeBoardClick
                            ? `/freepage/${post.boardId}`
                            : `/sharepage/${post.boardId}`
                        }
                      >
                        {post.title}
                      </Link>
                    </div>
                    <span className="QnAList-createdAt">
                      {formatDate(post.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          <div className="pageNum"></div>
        </div>
      </div>
    </div>
  );
};
export default Community;

// useEffect(() => {
//   axios
//     .get(`${API_URL}/payment-success`, {})
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, [token, pageNum, size, checkStatus]);
