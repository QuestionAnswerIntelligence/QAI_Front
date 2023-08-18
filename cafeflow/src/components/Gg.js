// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../Constant";
// import "./Store.css";

// const Store = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [redirectUrl, setRedirectUrl] = React.useState("");

//   const token = localStorage.getItem("jwtToken");

//   const requestPayment = (price, itemName) => {
//     axios
//       .post(
//         `${API_URL}/payment/ready`,
//         {
//           price: price,
//           itemName: itemName,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setRedirectUrl(response.data.next_redirect_pc_url); // URL 설정
//         setIsModalOpen(true); // 모달 창 열기
//       })
//       .catch((error) => {
//         console.error("Payment request error:", error);
//       });
//   };

//   return (
//     <div className="a">
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <button onClick={() => setIsModalOpen(false)}>닫기</button>
//             <iframe src={redirectUrl} width="100%" height="500px"></iframe>
//           </div>
//         </div>
//       )}

//       <div className="container11">
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <h1>포인트 샵</h1>
//         </div>
//         <div style={{ marginTop: "-7px" }}>
//           <hr></hr>
//         </div>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <div className="pointBox">
//             <button
//               className="box"
//               onClick={() => requestPayment(1000, "1000포인트")}
//             >
//               <p>1000 포인트</p>
//               <span>₩1100</span>
//             </button>
//             <button
//               className="box"
//               onClick={() => requestPayment(3000, "1000포인트")}
//             >
//               <p>3000 포인트</p>
//               <span>₩3300</span>
//             </button>
//             <button
//               className="box"
//               onClick={() => requestPayment(5000, "1000포인트")}
//             >
//               <p>5000 포인트</p>
//               <span>₩5500</span>
//             </button>
//             <button
//               className="box"
//               onClick={() => requestPayment(10000, "1000포인트")}
//             >
//               <p>10000 포인트</p>
//               <span>₩11000</span>
//             </button>
//             <button
//               className="box"
//               onClick={() => requestPayment(30000, "1000포인트")}
//             >
//               <p>30000 포인트</p>
//               <span>₩33000</span>
//             </button>
//             <button
//               className="box"
//               onClick={() => requestPayment(1000000, "1000포인트")}
//             >
//               <p>50000 포인트</p>
//               <span>₩55000</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Store;
