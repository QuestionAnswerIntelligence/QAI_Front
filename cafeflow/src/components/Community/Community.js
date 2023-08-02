import React from 'react';
import { useNavigate } from "react-router-dom";
import  { useState } from "react";

import "./Community.css";

const Community=()=>{
    const [isFreeBoardClick,SetIsFreeBoardClick]=useState(true);
    const navigate = useNavigate();
    const moveToFreeBoard=()=>{
        navigate("/freeBoard");
    }
    const moveToShareBoard=()=>{
        navigate("/shareboard");
    }
    const turnState=()=>{
        SetIsFreeBoardClick(!isFreeBoardClick);
    }

    const moveToWriteBoard_f=()=>{
        navigate("/freeform");
    }
 return(
    <div className="commnunity-container">
        <div className="mycontainer">
            <button className="boardList">자유게시판</button>
            <button className="boardList">프로젝트 공유 게시판</button>
        </div>
        <div className="board-container">
            <button onClick={moveToWriteBoard_f}>글 작성하기</button>
        <table>
        <thead>
          <tr>  
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>

        </div>
           
    </div>
    

 )
}
export default Community;