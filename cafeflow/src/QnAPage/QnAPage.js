import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../components/Constant";
import "./QnAPage.css";

const QnAPage = () => {
  const navigate = useNavigate();
  const { questionId } = useParams(); // 현재 URL의 파라미터 추출

  // 상태 변수들
  const [question, setQuestion] = useState(null); // 질문 데이터를 저장하는 상태 변수
  const [editing, setEditing] = useState(false); // 편집 모드 상태 변수. 수정할 때 사용
  const [title, setTitle] = useState(""); // 제목을 저장하는 상태 변수
  const [content, setContent] = useState(""); // 내용을 저장하는 상태 변수
  const [point, setPoint] = useState(""); // 포인트를 저장하는 상태 변수
  const [comment, setComment] = useState(""); // 댓글을 저장하는 상태 변수
  const [comments, setComments] = useState([]); // 댓글 리스트를 저장하는 상태 변수

  const token = localStorage.getItem("jwtToken"); // JWT 토큰
  const currentUser = localStorage.getItem("nickname"); // 현재 로그인한 유저의 닉네임

  // 페이지가 렌더링될 때, 현재 questionId에 해당하는 질문의 데이터를 가져옴
  useEffect(() => {
    axios
      .get(`${API_URL}/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setQuestion(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        setPoint(response.data.data.point);
        setComments(response.data.data.answers); // 댓글 데이터 설정
      })
      .catch((error) => {
        console.log(error);
      });
  }, [questionId, token]);

  // 날짜 형식을 YYYY-MM-DD 형태로 변환
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // 삭제 기능 : 현재 로그인 중인 유저의 정보와 질문 작성자의 정보가 일치해야함 보임
  const handleDelete = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      axios
        .delete(`${API_URL}/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/qnalist");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 수정 상태를 활성화하는 함수
  const handleEdit = () => {
    setEditing(true);
  };

  // 수정 기능 : 현재 로그인 중인 유저의 정보와 질문 작성자의 정보가 일치해야함 보임
  const handleUpdate = () => {
    axios
      .patch(
        `${API_URL}/questions/${questionId}`,
        {
          title: title,
          content: content,
          point: point,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEditing(false); // 수정 모드 종료
        setQuestion(response.data.data); // 수정된 질문 데이터를 설정
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 댓글 기능 : 댓글 입력 완료 후 사용자의 닉네임과 함께 보이도록 설정
  const handleComment = () => {
    if (comment.trim() === "") {
      alert("내용을 입력해주세요!");
      return;
    }
    axios
      .post(
        `${API_URL}/questions/${questionId}`, // 댓글을 등록하는 API의 경로
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // 서버로부터 응답을 받았을 때의 처리
        setComment(""); // 댓글 입력 필드를 초기화
        console.log("댓글 입력 성공!");
        setComments((prevComments) => [...prevComments, response.data.data]); // 새로운 댓글 추가
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // question 데이터가 아직 로드되지 않았다면 로딩 메시지를 표시
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="QnA">
      {editing ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="number"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            placeholder="내공 점수"
          />

          <button onClick={handleUpdate}>수정 완료</button>
        </div>
      ) : (
        <div>
          <h2>
            <b>제목 </b>: {question.title}
          </h2>
          <p>
            <b>내용 </b>: {question.content}
          </p>
          <p>
            <b>닉네임 또는 게시글 작성자</b> : {question.nickname}
          </p>
          <p>
            <b>조회수</b> : {question.viewCount}
          </p>
          <p>
            <b>내공 점수 </b>: {question.point}
          </p>
          <p>
            <b>작성일자 </b>: {formatDate(question.createdAt)}
          </p>
          {currentUser === question.nickname && (
            <>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={handleEdit}>수정</button>
            </>
          )}
          <hr />
        </div>
      )}
      <div>
        {token ? (
          <div>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <button onClick={handleComment}>입력 완료</button>
          </div>
        ) : (
          <p>
            <Link to="/login">로그인</Link>을 해야합니다.
          </p>
        )}
        {comments &&
          comments.map((comment) => (
            <div key={comment.id}>
              <p>
                <b>{comment.nickname}</b>: {comment.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QnAPage;
