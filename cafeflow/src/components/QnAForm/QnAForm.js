import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../Constant";
import { useNavigate } from "react-router-dom";
import Draft from "../Editor/Draft";

import "./QnAForm.css";

const QnAForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    point: "",
  });

  const [errors, setErrors] = useState({});

  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("jwtToken");

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
        point: !formData.point ? alert("포인트가 입력되지 않았습니다!") : "",
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

  return (
    <div className="QnaForm_Container">
      <div className="QnAFormContainer">
        <h1>AI 궁금증 해결하기</h1>
        <form onSubmit={handleSubmit}>
          <h2>제목</h2>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="제목을 입력하세요!"
          />
          {errors.title && <p>{errors.title}</p>}
          <br />
          <h2>본문</h2>
          <input
            className="QnAInput"
            type="text"
            name="content"
            onChange={handleChange}
          />
          {errors.content && <p>{errors.content}</p>}
          <br />
          <h2>포인트 입력</h2>
          <input type="text" name="point" onChange={handleChange} />
          {errors.point && <p>{errors.point}</p>}

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QnAForm;
