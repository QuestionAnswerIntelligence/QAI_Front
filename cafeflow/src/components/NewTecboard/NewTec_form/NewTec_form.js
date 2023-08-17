import React, { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil"; //이미지 업로드 용

import "./NewTec_form.css";

import {
  //이미지 업로드 용
  newTecImgUrlState,
} from "../../../recoils/Recoil";

const NewTec_form = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    url: "", // Initialize with an empty array for the URLs
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState(""); //이미지추가
  const imgRef = useRef();
  const setImgUrl = useSetRecoilState(newTecImgUrlState); //설정할때는 set 그냥 쓸 때는 걍
  const [directoryName, setDirectoryName] = useState("aiinfo");

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
    // Get the previously uploaded image URL from localStorage
    const uploadedImageUrl = localStorage.getItem("imageUrl2");
    // Update formData to include the uploaded image URL
    const updatedFormData = {
      ...formData,
      url: uploadedImageUrl, // Set the uploaded image URL
    };

    axios
      .post(`${API_URL}/admin/ai-info/create`, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: localStorage.getItem("imageUrl2"),
      })
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        alert("AI기술 소개 글이 성공적으로 등록 되었습니다!");
        // navigate("/newtec_list");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader(); // 파일마다 새로운 FileReader 객체 생성

    reader.onloadend = () => {
      setImgFile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("directoryName", directoryName);
      axios
        .post(`${API_URL}/upload/image`, formData)
        .then((response) => {
          const imgUrl2 = response.data.data.imageUrl;
          localStorage.setItem("imageUrl2", imgUrl2);
          setImgUrl(imgUrl2);
          console.log("이미지 업로드 완료되었습니다.");
        })
        .catch((error) => {
          console.error("이미지 업로드 중 에러:", error);
        });
    }
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

          {/* URL 입력란 */}
          <img
            src={imgFile ? imgFile : `/imges/icon/user.png`}
            alt="프로필 이미지"
          />
          <form className="form-NewTec-img">
            <label className="NewTec-Img-label" htmlFor="newTech-postimg">
              프로필 이미지 추가
            </label>
            <input
              className="newTechImg-input"
              type="file"
              accept="image/*"
              id="newTech-postimg"
              onChange={saveImgFile}
              ref={imgRef}
            />
          </form>
          <div>
            <p style={{ margin: "0px", fontSize: "11px", color: "gray" }}>
              By creating an account, you agree to the Terms of use and Privacy
              Policy.
            </p>
          </div>

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
