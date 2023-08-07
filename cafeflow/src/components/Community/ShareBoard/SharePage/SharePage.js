import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../Constant";
import "./SharePage.css";

const SharePage = () => {
  const { boardId } = useParams(); // 현재 URL의 파라미터 추출
  const [error, setError] = useState(null);

  // 상태 변수들
  const [sharepagestate, setCommunity] = useState(null); // 자게 글 내용 데이터를 저장하는 상태 변수
  const [title, setTitle] = useState(""); // 제목을 저장하는 상태 변수
  const [content, setContent] = useState(""); // 내용을 저장하는 상태 변수

  const token = localStorage.getItem("jwtToken"); // JWT 토큰
  const currentUser = localStorage.getItem("createdBy"); // 현재 로그인한 유저의 닉네임

  // 페이지가 렌더링될 때, 현재 questionId에 해당하는 질문의 데이터를 가져옴
  useEffect(() => {
    axios
      .get(`${API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCommunity(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        console.log("아무거나");
        //setPoint(response.data.data.point);
        //setComments(response.data.data.answers); // 댓글 데이터 설정
      })
      .catch((error) => {
        setError("데이터를 가져오는 중 오류 발생티비");
        console.log(error);
      });
  }, [boardId, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // 날짜 형식을 YYYY-MM-DD 형태로 변환
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // question 데이터가 아직 로드되지 않았다면 로딩 메시지를 표시
  if (!sharepagestate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {
        <div>
          <h2>
            <b>제목 </b>: {sharepagestate.title}
          </h2>
          <p>
            <b>내용 </b>: {sharepagestate.content}
          </p>
          <p>
            <b>닉네임 또는 게시글 작성자</b> : {sharepagestate.createdBy}
          </p>
          <p>
            <b>작성일자 </b>: {formatDate(sharepagestate.createdAt)}
          </p>
          {currentUser === sharepagestate.createdBy && <></>}
          <hr />
        </div>
      }
      <div>
        {/* 로그인이 되어 있지 않은 경우에만 로그인 링크를 표시 */}
        {!token && (
          <p>
            <Link to="/login">로그인</Link>을 해야합니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default SharePage;
