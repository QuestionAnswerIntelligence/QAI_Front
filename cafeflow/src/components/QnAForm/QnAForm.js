import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Constant";
import { useNavigate } from "react-router-dom";

import "./QnAForm.css";

const QnAForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    point: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title || !formData.content || !formData.point) {
      setErrors({
        ...errors,
        title: !formData.title ? alert("제목이 입력되지 않았습니다!") : "",
        content: !formData.content ? alert("내용이 입력되지 않았습니다!") : "",
      });
      return;
    }

    axios
      .post(`${API_URL}/questions/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("질문이 성공적으로 등록되었습니다!");
        navigate("/qnalist");
      })
      .catch((error) => console.log(error));
  };

  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  const token = localStorage.getItem("jwtToken");

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
          <span>{nickname}</span>님의 지식공유 플랫폼 QAI에서 최고의 개발자들과
          함께 궁금증을 해결하세요!
        </span>
        <form onSubmit={handleSubmit}>
          <h2>제목</h2>
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
          <br />
          <h2>포인트 입력</h2>
          <div className="PointBox">
            <input
              className="QnAPoint"
              placeholder="포인트를 입력해주세요"
              type="text"
              name="point"
              onChange={handleChange}
            />
            <span>
              내 보유 포인트 : <b>{point}P</b>
            </span>
            {/* <span>
              남은 포인트 : <b>{point - point}</b>
            </span> */}
            {errors.point && <p>{errors.point1}</p>}
          </div>
          <button className="QnASubmit" type="submit">
            글 작성하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default QnAForm;
