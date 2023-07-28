import React from 'react';
import FreeBoard from "./FreeBoard/FreeBoard"
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
        console.log("true");
        SetIsFreeBoardClick(!isFreeBoardClick);
    }
 return(
    <div className="container">
        <div className="mycontainer">
            <button className="boardList" onClick={moveToFreeBoard}>자유게시판</button>
            <button className="boardList" onClick={moveToShareBoard}>프로젝트 공유 게시판</button>
        </div>
           
    </div>
    

 )
}
export default Community;