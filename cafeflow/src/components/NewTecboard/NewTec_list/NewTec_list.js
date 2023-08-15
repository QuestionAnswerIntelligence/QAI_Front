import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../Constant";
import db from "../../firebase";
import "./NewTec_list.css";
import ViewCount from "../../../icons/ViewCount.png";

const NewTec_list = ({ chatId }) => {
  const navigate = useNavigate();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const [newtecs, setNewTecs] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(10);
  const nickname = localStorage.getItem("nickname");

  // 시간 순 체크박스
  const [isChecked, setIsChecked] = useState(false);

  const [showChatButton, setShowChatButton] = useState({}); // 1. 채팅 버튼 표시 상태를 관리하기 위한 state

  // toggleChatButton 함수를 수정하여 특정 질문에 대한 상태만 변경
  const toggleChatButton = (boardId) => {
    setShowChatButton((prev) => ({
      ...prev,
      [boardId]: !prev[boardId],
    }));
  };

  // Q&A 작성페이지로 이동
  const moveToMakeNewTec = () => {
    navigate("/newtec_form");
  };

  // page
  useEffect(() => {
    axios
      .get(`${API_URL}/ai-info?page=${pageNum}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let newtecList = response.data.data.newtecList;

        setNewTecs(response.data.data.newtecList);
        console.log(response.data.data.newtecList);
        console.log(response.data);
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

  return (
    <div className="aaa">
      <div className="container11">
        <div className="post">
          <h1>New Technology</h1>
          <button className="postbutton1" onClick={moveToMakeNewTec}>
            나도 정보 글 쓰고 포인트 받기
          </button>
        </div>
        <span
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            color: "gray",
            padding: "0 1.5vw",
          }}
        >
          새로운 AI정보를 확인하세요!{" "}
        </span>
        <div className="asd">
          <div className="searchBox">
            <input className="search" type="text" placeholder="Search"></input>
            {/* <div
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
            </div> */}
          </div>
        </div>
        <div className="board-container">
          {/* map 함수를 이용하여 newtecs에 들어가있는 배열 가져오기 */}
          {newtecs &&
            newtecs.map((newtec) => (
              <div key={newtec.boardId}>
                <ul className="post-list" key={newtec?.boardId}>
                  <li className="NewTec-post-list">
                    <div className="NewTecList2">
                      <div>
                        {/* <img className="profile-img" /> */}
                        <h2 onClick={() => toggleChatButton(newtec?.boardId)}>
                          {newtec?.createdBy}
                        </h2>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img className="viewCountImg" src={ViewCount}></img>
                        <span className="viewCountSpan">
                          {newtec?.viewCount}
                        </span>
                      </div>
                    </div>
                    <div className="NewTec-post-list-middle">
                      <Link to={`/newtecs/${newtec?.newtecId}`}>
                        {newtec?.title}
                      </Link>
                    </div>
                    <span className="NewTecList-createdAt">
                      {formatDate(newtec?.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          <div className="pageNum">
            {/* <button
            className="preButton" onClick={() => setPageNum((prevPageNum) => prevPageNum - 1)}
            disabled={pageNum === 0}
          >
          </button>
          <span className="pageNumber">{pageNum+1}/300</span>
          <button className="nextButton" onClick={() => setPageNum((prevPageNum) => prevPageNum + 1)}>
          </button> */}
          </div>
        </div>
        {/* <div className="pageNum">
          <button
            onClick={() => setPageNum((prevPageNum) => prevPageNum - 1)}
            disabled={pageNum === 0}
          >
            이전 페이지
          </button>
          <button onClick={() => setPageNum((prevPageNum) => prevPageNum + 1)}>
            다음페이지
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default NewTec_list;
