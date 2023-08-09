import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../Constant";
import db from "../firebase";
import "./QnAList.css";
import ViewCount from "../../icons/ViewCount.png";

const QnAList = ({ chatId }) => {
  const navigate = useNavigate();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const [questions, setQuestions] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(10);
  const nickname = localStorage.getItem("nickname");

  // 시간 순 체크박스
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  // Q&A 작성페이지로 이동
  const moveToMakeQuestion = () => {
    navigate("/qnaform");
  };

  // page
  useEffect(() => {
    axios
      .get(`${API_URL}/questions?page=${pageNum}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let questionList = response.data.data.questionList;
        if (isChecked) {
          questionList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ); // 시간 순으로 정렬
        }
        setQuestions(response.data.data.questionList);
        //console.log(response.data.data.questionList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, pageNum, size]);

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

  return (
    <div className="a">
      <div className="container1">
        <div className="post">
          <h1>Q & A</h1>
          <button className="postbutton" onClick={moveToMakeQuestion}>
            글쓰기
          </button>
        </div>
        <span style={{ fontWeight: "bold" }}>질문하세요! </span>
        <div className="asd">
          <a>asd</a>
          <div className="searchBox">
            <input className="search" type="text" placeholder="Search"></input>
            <div
              style={{
                position: "relative",
                marginTop: "3vh",
                display: "flex",
              }}
            >
              <button className="checkbox" type="checkbox"></button>
              <span
                style={{ color: "black", fontSize: "16px", marginLeft: "5px" }}
              >
                시간 순
              </span>
            </div>
          </div>
        </div>
        {/* <div className="divider1"></div> */}
        <table>
          <tbody>
            {/* map 함수를 이용하여 questions에 들어가있는 배열 가져오기 */}
            {questions.map((question) => (
              // console.log(question),
              <tr key={question.questionId}>
                <div className="oneTr">
                  <div className="leftside">
                    <td className="questionId">{question.questionId}</td>
                    <div className="titleBox">
                      <td className="title">
                        <Link to={`/questions/${question.questionId}`}>
                          {question.title}
                        </Link>
                      </td>
                      <td>{question.content}</td>
                    </div>
                  </div>
                  <div className="rightside">
                    <div className="nicknameBox">
                      <td
                        className="nickname"
                        onClick={() => handleAuthorClick(question.createdBy)}
                      >
                        작성자 : {question.createdBy}
                      </td>
                      {isDropdownVisible && nickname !== question.createdBy && (
                        <div className="dropdown">
                          <button onClick={() => startChat(nickname, question)}>
                            1:1 채팅하기
                          </button>
                        </div>
                      )}
                    </div>
                    <td className="createdAt">
                      작성 일자: {formatDate(question.createdAt)}
                    </td>
                    <td className="viewCount">
                      <img src={ViewCount}></img>
                      {question.viewCount}
                    </td>
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pageNum">
          <button
            onClick={() => setPageNum((prevPageNum) => prevPageNum - 1)}
            disabled={pageNum === 0}
          >
            이전 페이지
          </button>
          <button onClick={() => setPageNum((prevPageNum) => prevPageNum + 1)}>
            다음페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default QnAList;
