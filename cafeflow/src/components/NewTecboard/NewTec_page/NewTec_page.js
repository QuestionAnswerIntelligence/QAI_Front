import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../Constant";
import writer1 from "../../../icons/writer1.png";
import ViewCount from "../../../icons/ViewCount.png";
import check from "../../../icons/check.png";

import { useRecoilState, } from "recoil";
import { newTecImgUrlState } from "../../../recoils/Recoil";
import "./NewTec_page.css";

const NewTec_page = () => {
  const navigate = useNavigate();
  const { aiInfoId } = useParams(); // 현재 URL의 파라미터 추출

  // 상태 변수들
  const [newtec, setNewTec] = useState(null); // 질문 데이터를 저장하는 상태 변수
  const [editing, setEditing] = useState(false); // 편집 모드 상태 변수. 수정할 때 사용
  const [title, setTitle] = useState(""); // 제목을 저장하는 상태 변수
  const [content, setContent] = useState(""); // 내용을 저장하는 상태 변수
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID를 저장하는 상태
  const token = localStorage.getItem("jwtToken"); // JWT 토큰
  const currentUser = localStorage.getItem("nickname"); // 현재 로그인한 유저의 닉네임
  const [isadopted, setIsAdopted] = useState(false); //게시물이 체크되었는지 저장
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(8);
  const [imgUrl, setImgUrl] = useRecoilState(newTecImgUrlState);


  
  const [editUrl, setEditUrl] = useState("");

  const nickname = localStorage.getItem("nickname");
  // 페이지가 렌더링될 때, 현재 questionId에 해당하는 질문의 데이터를 가져옴
  useEffect(() => {
    axios
      .get(`${API_URL}/ai-info/${aiInfoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNewTec(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        setImgUrl(response.data.data.url);
        console.log(response.data.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [aiInfoId, token]);

  const username = localStorage.getItem("question_createdBy");
  // console.log("question_createdBy : "+username);
  // 날짜 형식을 YYYY-MM-DD 형태로 변환
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // NewTec 글 삭제 기능 : 현재 로그인 중인 유저의 정보와 질문 작성자의 정보가 일치해야함 보임
  const handleDelete = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      axios
        .delete(`${API_URL}/ai-info/${aiInfoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          console.log("NewTechnology 글 삭제 완료!");
          navigate("/newtec_list");
          console.log("제목:", title);
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

  // 컴포넌트가 마운트되면 로컬 스토리지에서 상태를 불러옴
  useEffect(() => {
    const savedState = localStorage.getItem(`isChecked_${aiInfoId}`);
    if (savedState) {
      //setIsChecked(JSON.parse(savedState));
    }
  }, [aiInfoId]);

  // const handleAdoptionClick = () => {
  //   setIsChecked(true);
  //   localStorage.setItem(`isChecked_${questionId}`, "true"); // 상태를 로컬 스토리지에 저장
  // };

  // AI정보글 수정 기능 : 현재 로그인 중인 유저의 정보와 질문 작성자의 정보가 일치해야함 보임
  const handleUpdate = () => {
    if (window.confirm("AI정보글을 수정하시겠습니까?")) {
      axios
        .patch(
          `${API_URL}/admin/ai-info/update/${aiInfoId}`,
          {
            title: title,
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setEditing(false); // 수정 모드 종료
          setNewTec(response.data.data); // 수정된 질문 데이터를 설정
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // question 데이터가 아직 로드되지 않았다면 로딩 메시지를 표시
  if (!newtec) {
    return <div>Loading...</div>;
  }

  const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setHours(date.getHours() + 9); // UTC+9로 조정

    // 시간대 차이를 고려해야 하기 때문에 getUTC 메서드 대신 일반 메서드를 사용합니다.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하기 때문에 +1을 합니다.
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0"); // 24시간 형식으로 변환합니다.
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <div className="a">
      {editing ? (
        <div className="NewTecEditContainer2">
          <h1>AI 정보 얻기</h1>
          <span>
            <span>{nickname}</span>
            최신 AI정보를 받아 보세요~!
          </span>
          <form>
            <h2>제목</h2>
            <input
              value={title}
              className="NewTecInput"
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <h2>본문</h2>
            <textarea
              className="NewTecContent"
              value={content}
              type="text"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요!"
            />
            <br />
            <button
              className="NewTecSubmit"
              type="submit"
              onClick={handleUpdate}
            >
              수정하기
            </button>
          </form>
        </div>
      ) : (
        // </div>
        <div>
          {/* <div className="a1">
            <h1 style={{ marginBottom: "10px" }}>Q & A</h1>
            <span style={{ color: "gray" }}>질문하세요!</span>
          </div> */}
          <div className="a2">
            <div className="a3">
              <h1 style={{ marginBottom: "0px", fontSize: "2vw" }}>AI-INFO</h1>
              <span
                style={{
                  color: "gray",
                  marginBottom: "1vh",
                  fontSize: "1.1vw",
                }}
              >
                질문하세요!
              </span>
              <div className="a4">
                <div className="a5">
                  <h1 style={{ margin: "0px" }}>{newtec.title}</h1>
                </div>
                <div className="a5">
                  {currentUser == newtec.createdBy && (
                    <>
                      <button className="button" onClick={handleDelete}>
                        삭제
                      </button>
                      {/* <img
                          src={divider}
                          style={{ marginLeft: "10px", marginRight: "10px" }}
                        ></img> */}
                      <button className="button" onClick={handleEdit}>
                        수정
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="a6">
                  <img
                    src={writer1}
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  ></img>
                  <p style={{ color: "#64748B" }}>{newtec.createdBy}</p>
                  <p>{formatDate(newtec.createdAt)}</p>
                  <div className="a7">
                    <img
                      style={{ width: "1.3vw", height: "1.8vh" }}
                      src={ViewCount}
                    ></img>
                    <p>{newtec.viewCount}</p>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  <b>내용 </b>: {newtec.content}
                </p>
              </div>
              <div
                className="profile-img-container"
                style={{
                  backgroundImage: `url('${imgUrl}')`,
                  border: "5px solid black",
                  borderRadius: "50px",
                  backgroundPosition: "center",
                }}
              ></div>

              <hr />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTec_page;
