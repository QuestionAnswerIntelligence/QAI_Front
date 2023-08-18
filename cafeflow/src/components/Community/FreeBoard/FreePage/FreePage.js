import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../Constant";
import "./FreePage.css";

const FreePage = () => {
  const { boardId } = useParams(); // 현재 URL의 파라미터 추출
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [freepagestate, setFreepagestate] = useState(null); // 자게 글 내용 데이터를 저장하는 상태 변수
  const [editing, setEditing] = useState(false); // 편집 모드 상태 변수. 수정할 때 사용
  const [title, setTitle] = useState(""); // 제목을 저장하는 상태 변수
  const [content, setContent] = useState(""); // 내용을 저장하는 상태 변수
  const [point, setPoint] = useState(""); // 포인트를 저장하는 상태 변수
  const [comment, setComment] = useState(""); // 댓글을 저장하는 상태 변수
  const [comments, setComments] = useState([]); // 댓글 리스트를 저장하는 상태 변수
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID를 저장하는 상태
  const [editingComment, setEditingComment] = useState(""); // 수정할 댓글의 내용을 저장하는 상태

  const token = localStorage.getItem("jwtToken"); // JWT 토큰
  const currentUser = localStorage.getItem("nickname"); // 현재 로그인한 유저의 닉네임

  // 페이지가 렌더링될 때, 현재 questionId에 해당하는 질문의 데이터를 가져옴
  useEffect(() => {
    axios
      .get(`${API_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFreepagestate(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        setPoint(response.data.data.point);
        setComments(response.data.data.comments || []); // 댓글 데이터 설정
      })
      .catch((error) => {
        setError("데이터를 가져오는 중 오류 발생");
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
  // QnA 글 삭제 기능 : 현재 로그인 중인 유저의 정보와 질문 작성자의 정보가 일치해야함 보임
  const handleDelete = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      axios
        .delete(`${API_URL}/boards/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          console.log("자유게시판 글 삭제 완료");
          navigate("/freelist");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // QnA 댓글 삭제 기능
  const handleDeleteComment = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .delete(`${API_URL}/boards/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log("댓글 삭제 완료!");
          setComments(comments.filter((comment) => comment.id !== id)); // 삭제된 댓글을 제외하고 댓글 리스트를 업데이트
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingComment(comment.content);
  };

  // QnA 댓글 수정 기능
  const handleCommentUpdate = () => {
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      axios
        .patch(
          `${API_URL}/boards/comment/${editingCommentId}`, // 댓글을 수정하는 API의 경로
          {
            content: editingComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // 서버로부터 응답을 받았을 때의 처리
          setComments(
            comments.map((comment) =>
              comment.id === editingCommentId ? response.data.data : comment
            )
          ); // 수정된 댓글을 업데이트
          setEditingCommentId(null); // 수정 모드 종료
          setEditingComment(""); // 수정 필드 초기화
          console.log("QnA 댓글 수정 완료!");
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

  // QnA 질문 수정 기능 : 현재 로그인 중인 유저의 정보와 질문 작성자의 정보가 일치해야함 보임
  const handleUpdate = () => {
    if (window.confirm("질문을 수정하시겠습니까?")) {
      axios
        .patch(
          `${API_URL}/boards/comment/${boardId}`,
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
          setFreepagestate(response.data.data); // 수정된 질문 데이터를 설정
          console.log("QnA 질문 수정 완료!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 댓글 기능 : 댓글 입력 완료 후 사용자의 닉네임과 함께 보이도록 설정
  const handleComment = () => {
    if (window.confirm("댓글을 입력하시겠습니까?")) {
      if (comment.trim() === "") {
        alert("내용을 입력해주세요!");
        return;
      }
      axios
        .post(
          `${API_URL}/boards/comment/${boardId}`, // 댓글을 등록하는 API의 경로
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
          console.log(response.data.data);
          setComments((prevComments) => [...prevComments, response.data.data]); // 댓글을 배열에 추가
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="a">
      <div className="container11">
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
              <b>제목 </b>: {freepagestate?.title}
            </h2>
            <p>
              <b>내용 </b>: {freepagestate?.content}
            </p>
            <p>
              <b>닉네임 또는 게시글 작성자</b> : {freepagestate?.createdBy}
            </p>
            <p>
              <b>조회수</b> : {freepagestate?.viewCount}
            </p>
            <p>
              <b>내공 점수 </b>: {freepagestate?.point}
            </p>
            <p>
              <b>작성일자 </b>: {formatDate(freepagestate?.createdAt)}
            </p>
            {/* 현재 로그인 한 유저의 정보(currentUser)와 댓글 작성자(createdBy)의 정보를 */}
            {/* 비교하여 삭제 및 수정 버튼이 보이게 함 */}
            {currentUser === freepagestate?.createdBy && (
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
                  <b>{comment.createdBy}</b>: {comment.content}
                </p>
                {currentUser === comment.createdBy && (
                  <>
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      삭제
                    </button>
                    {editingCommentId === comment.id ? ( // [NEW CODE]
                      <>
                        <input
                          value={editingComment}
                          onChange={(e) => setEditingComment(e.target.value)}
                          placeholder="수정할 내용을 입력하세요..."
                        />
                        <button onClick={handleCommentUpdate}>수정 완료</button>
                        <button onClick={() => setEditingCommentId(null)}>
                          취소
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEditComment(comment)}>
                        수정
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FreePage;
