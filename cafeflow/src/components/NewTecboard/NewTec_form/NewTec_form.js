import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Constant";
import { useNavigate } from "react-router-dom";

import "./NewTec_form.css";

const NewTec_form = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title || !formData.content) {
      setErrors({
        ...errors,
        title: !formData.title ? alert("제목이 입력되지 않았습니다!") : "",
        content: !formData.content ? alert("내용이 입력되지 않았습니다!") : "",
      });
      return;
    }

    axios
      .post(`${API_URL}/admin/ai-info/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("AI기술 소개 글이 성공적으로 등록 되었습니다!");
        navigate("/newtec_list");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));

  const token = localStorage.getItem("jwtToken");

  return (
    <div className="NewTecForm_Container">
      <div className="NewTecFormContainer">
        <form onSubmit={handleSubmit}>
          <h2>제목</h2>
          <input
            className="NewTecInput"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="제목을 입력하세요!"
          />
          {errors.title && <p>{errors.title}</p>}
          <br />
          <h2>본문</h2>
          <textarea
            className="NewTecContent"
            type="text"
            name="content"
            onChange={handleChange}
            placeholder="내용을 입력하세요!"
          />
          {errors.content && <p>{errors.content}</p>}
          <br />

          {/* <span>남은 포인트 : <b>{point - }</b></span> */}
          {errors.point && <p>{errors.point}</p>}
          <button className="NewTecSubmit" type="submit">
            글 작성하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTec_form;
