// import React, { useState } from "react";
// import axios from "axios";
// import { API_URL } from "../../../Constant";
// import { useNavigate } from "react-router-dom";

// import "./FreeForm.css";
// const FreeForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//   });
//   const [errors, setErrors] = useState({});
//   const createdBy = localStorage.getItem("nickname");
//   const token = localStorage.getItem("jwtToken");

//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const type = "freeBoard";
//     axios
//       .post(`${API_URL}/boards/create?boardType=${type}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         console.log(response.data);
//         alert("게시물이 성공적으로 등록되었습니다!");
//         navigate("/community");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("에러 발생");
//       });
//   };

//   return (
//     <div className="freeform-container">
//       <form onSubmit={handleSubmit}>
//         <label>
//           제목:
//           <input type="text" name="title" onChange={handleChange} />
//           {errors.title && <p>{errors.title}</p>}
//         </label>
//         <br />
//         <label>
//           내용:
//           <input type="text" name="content" onChange={handleChange} />
//           {errors.content && <p>{errors.content}</p>}
//         </label>

//         <label>작성자: {createdBy}</label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default FreeForm;