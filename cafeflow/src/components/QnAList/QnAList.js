import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { API_URL } from "../Constant";
import db from "../firebase";
import "./QnAList.css";
import ViewCount from "../../icons/ViewCount.png";

const QnAList = ({ chatId }) => {
  const navigate = useNavigate();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(1000);
  const nickname = localStorage.getItem("nickname");
  const [isAdoptedClick, setIsAdoptedClick] = useState(false);

  const token = localStorage.getItem("jwtToken");

  const [showChatButton, setShowChatButton] = useState(""); // 1. 채팅 버튼 표시 상태를 관리하기 위한 state
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState("제목");
  const [checkStatus, setCheckStatus] = useState("채택전");

  // toggleChatButton 함수를 수정하여 특정 질문에 대한 상태만 변경
  const toggleChatButton = (createdBy) => {
    if (showChatButton === createdBy) {
      setShowChatButton(""); // 이미 선택된 작성자를 다시 클릭하면 버튼 숨기기
    } else {
      setShowChatButton(createdBy); // 다른 작성자를 클릭하면 해당 작성자에게 버튼 표시
    }
  };

  // Q&A 작성페이지로 이동
  const moveToMakeQuestion = () => {
    navigate("/qnaform");
  };

  // page
  useEffect(() => {
    axios
      .get(
        `${API_URL}/questions?page=${pageNum}&size=${size}&checkStatus=${checkStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        let questionList = response.data.data.questionList;
        setQuestions(questionList);
        console.log(response.data);
        console.log(response.data.data.questionList);
        // console.log(response.data.data.questionList[0].memberId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, pageNum, size, checkStatus]);

  // 날짜 형식을 YYYY-MM-DD로 변환해주는 함수
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  // 드롭다운 메뉴를 보여주거나 숨기는 함수
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAuthorClick = (createdBy) => {
    if (nickname !== createdBy) {
      toggleDropdown();
    }
  };

  const turnState_before = () => {
    setIsAdoptedClick(false);
    setCheckStatus("채택전");
  };

  const turnState_after = () => {
    setIsAdoptedClick(true);
    setCheckStatus("채택");
  };
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

  const handleSelect = (event) => {
    setOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `${API_URL}/questions?page=${pageNum}&size=${size}&option=${option}&searchKeyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setQuestions(response.data.data.questionList);
        e.target.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const WatchProfile = (memberId) => {
    // memberId를 이용하여 프로필 페이지로 이동
    navigate(`/activity/${memberId}`);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log(questions);
  return (
    <div className="aaa">
      <div className="container11">
        <div className="post">
          <h1 style={{ margin: "0px" }}>Q & A</h1>
          <button className="postbutton1" onClick={moveToMakeQuestion}>
            글쓰기
          </button>
        </div>
        <span
          style={{
            color: "gray",
            marginBottom: "1vh",
            // marginTop: "1vh",
            fontSize: "0.8vw",
            padding: "0 1.5vw",
            fontWeight: "bold",
          }}
        >
          질문하세요!
        </span>
        <div className="asd">
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
        </div>
        <div>
          <button
            onClick={turnState_before}
            className="adopted-button adopted-before-button"
          >
            채택 전
          </button>
          <button
            onClick={turnState_after}
            className="adopted-button adopted-after-button"
          >
            채택 완료
          </button>
        </div>
        <div className="divider1">
          <span className={isAdoptedClick ? "after" : "before"}></span>
        </div>
        <div>
          {/* map 함수를 이용하여 questions에 들어가있는 배열 가져오기 */}
          {questions.map((question) => (
            <div key={question.boardId}>
              <div className="fixed-list">
                <div className="questionId-div">{question.questionId}</div>
                <div claaName="point_answerCnt_container">
                  <div className="answerCnt">답변 {question.answerCnt}</div>
                  <div className="point">{question.point}</div>
                </div>
                <ul className="test" key={question.boardId}>
                  <li className="community-post-list">
                    <div className="community-post-list-middle">
                      <Link to={`/questions/${question.questionId}`}>
                        {question.title}
                      </Link>
                    </div>
                    <div className="QnAList2">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "1vw",
                        }}
                      >
                        <h2
                          onClick={() => toggleChatButton(question.createdBy)}
                        >
                          {question.createdBy}
                        </h2>
                        <div>
                          <button
                            className="StartChatButton"
                            onClick={() => startChat(nickname, question)}
                          >
                            1:1 채팅하기
                          </button>
                          <button
                            className="StartChatButton"
                            onClick={() => WatchProfile(question.memberId)}
                          >
                            프로필 보기
                          </button>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5vw",
                        }}
                      >
                        <img className="viewCountImg1" src={ViewCount}></img>
                        <span className="viewCountSpan">
                          {question.viewCount}
                        </span>{" "}
                      </div>
                    </div>
                    <span className="QnAList-createdAt">
                      {formatDate(question.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
          <div className="pageNum"></div>
        </div>
      </div>
    </div>
  );
};

export default QnAList;
