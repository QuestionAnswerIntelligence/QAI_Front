import "./ShareForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../Constant";
import { useNavigate } from "react-router-dom";

const ShareForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const createdBy = localStorage.getItem("createdBy");
  const token = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const type = "공유게시판";

    if (!formData.title || !formData.content) {
      setErrors({
        ...errors,
        title: !formData.title ? alert("제목이 입력되지 않았습니다!") : "",
        content: !formData.content ? alert("내용이 입력되지 않았습니다!") : "",
      });
      return;
    }
    axios
      .post(`${API_URL}/boards/create?boardType=${type}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("게시물이 성공적으로 등록되었습니다!");
        navigate("/community");
      })
      .catch((error) => console.log(error));
  };

  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  useEffect(() => {
    axios
      .get(`${API_URL}/get-info?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { email, nickname, point } = response.data;
        setEmail(email);
        setNickname(nickname);
        setPoint(point);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(token);
      });
  }, [token, email]); // email도 의존성 배열에 추가하여 email 값이 변경될 때마다 API 호출

  return (
    <div className="QnaForm_Container">
      <div className="QnAFormContainer">
        <h1>AI 궁금증 해결하기</h1>
        <span>
          <span>{nickname}</span>님, 지식공유 플랫폼 QAI에서 최고의 개발자들과
          함께 궁금증을 해결하세요!
        </span>
        <form onSubmit={handleSubmit}>
          <h2 style={{ marginTop: "2vh" }}>제목</h2>
          <input
            className="QnAInput"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="제목을 입력하세요!"
          />
          {errors.title && <p>{errors.title}</p>}
          <br />
          <h2>본문</h2>
          <textarea
            className="QnAContent"
            type="text"
            name="content"
            onChange={handleChange}
            placeholder="내용을 입력하세요!"
          />
          {errors.content && <p>{errors.content}</p>}

          <button
            style={{ marginTop: "10vh" }}
            className="QnASubmit"
            type="submit"
          >
            글 작성하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareForm;
