import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../Constant";

import "./QnAList.css";

const QnAList = () => {
  const token = localStorage.getItem("jwtToken");
  const [questions, setQuestions] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const navigate = useNavigate();

  const moveToMakeQuestion = () => {
    navigate("/qnaform");
  };

  // page
  useEffect(() => {
    axios
      .get(`${API_URL}/questions?page=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, pageNum]);

  // 날짜 형식을 YYYY-MM-DD로 변환해주는 함수
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="container1">
      <button onClick={moveToMakeQuestion}>글 작성하기</button>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {/* map 함수를 이용하여 questions에 들어가있는 배열 가져오기 */}
          {questions.map((question) => (
            <tr key={question.questionId}>
              <td>{question.questionId}</td>
              <td className="title">
                <Link to={`/questions/${question.questionId}`}>
                  {question.title}
                </Link>
              </td>
              <td>{question.nickname}</td>
              <td>{question.viewCount}</td>
              <td>{formatDate(question.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
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
  );
};

export default QnAList;
