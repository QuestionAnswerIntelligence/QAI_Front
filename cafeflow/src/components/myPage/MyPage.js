import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../Constant";

import "./MyPage.css";

import shareIcon from "../../icons/share_android.png";

const MyPage = () => {
  // 초기값으로 로컬 스토리지의 값을 사용
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  const token = localStorage.getItem("jwtToken");
  const [state,setState]=useState("프로필");

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


  // const post_div=<div>
  //   {posts.map((post) => (
  //           <div>
  //             <ul className="post-list" key={post.boardId}>
  //               <li className="community-post-list">
  //                 <div className="community-post-list-up">
  //                   <div>
  //                     <span className="community-createdBy">
  //                       {post.createdBy}
  //                     </span>
  //                     <span className="community-createdAt">
  //                       {" "}
  //                       작성 : {formatDate(post.createdAt)}
  //                     </span>
  //                   </div>
  //                   <div>
  //                     <img className="viewCountImg" src={ViewCount}></img>
  //                     <span className="viewCountSpan">{post.viewCount}</span>
  //                   </div>
  //                 </div>
  //                 <div className="community-post-list-middle">
  //                   <Link
  //                     className="community-title"
  //                     to={
  //                       isFreeBoardClick
  //                         ? `/freepage/${post.boardId}`
  //                         : `/sharepage/${post.boardId}`
  //                     }
  //                   >
  //                     {post.title}
  //                   </Link>
  //                 </div>
  //                 <div className="community-post-list-down"></div>
  //               </li>
  //             </ul>
  //             <div className="divider2"></div>
  //           </div>
  //         ))}
  // </div>


  return (
    <div className="a">
      <div className="mypage_container1">
        <div className="mypage_container2">
          <div className="top-container">
            <h1>My Page</h1>
            <div  className="share_edit_button-container" style={{display:"flex",alignItems:"center"}}>
              <button className="share_edit_button" style={{color:"black"}}></button>
              <button className="share_edit_button" style={{color:"black"}}><b>편집</b></button>
            </div>
          </div>
          <div className="middle-container">
            <div className="profile-img-container">
              
            </div>
            <div className="info-container">
              <div className="info">
                <p className="label1">아이디</p>
                <p className="label2" ><b>{email}</b></p>
              </div>
              <div>
               <p className="label1">닉네임</p>
               <p className="label2"><b>{nickname}</b></p>
              </div>
              <div>
                <p className="label1">포트폴리오</p>
              </div>
              <div className="point-container">
                <div>
                <p className="label1">내 포인트</p>
                <p className="label2"><b>{point}베리</b></p>
                </div>
                
                <button className="charge-button">충전하기</button>
              </div>
             
            </div>
          
          </div>
          <div className="check-outer-box" >
            <div className="check-inner-box" style={{ }}> 
              <p className="check-p1">내 프로필을 조회한 사람</p>
              <p className="check-p2">5월 14일-8월 11일 동안 <span style={{color:"black"}}>674</span>명이 내 프로필을 조회했습니다.</p>
            </div>
          </div>

          <div className="select-outer-box">
            <div className="select-inner-box">
              <button onClick={()=>setState("프로필")}>프로필</button>
              <button onClick={()=>setState("게시물")}>게시물</button>
              <button onClick={()=>setState("답변")}>답변</button>
            </div>
            
          </div>
          <div className="mypage-divider"><span className={state==="프로필"?"profile":state==="게시물"?"post1":"answer"}></span></div>
          {/* {post_div} */}
        
        </div>
      </div>
    </div>
  );
};

export default MyPage;
