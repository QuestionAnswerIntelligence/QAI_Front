import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Constant";

import "./Community.css";

const Community=()=>{

    const token = localStorage.getItem("jwtToken");
    const [type,setType]=useState('freeBoard');
    const [posts, setposts] = useState([]);
    const [isFreeBoardClick,SetIsFreeBoardClick]=useState(true);
    const [pageNum, setPageNum] = useState(0);
    const [size, setSize] = useState(10);
    
    const navigate = useNavigate();
   
    const moveToBoard=()=>{
      if(!isFreeBoardClick){
        navigate("/freelist");
      }
      else{
        navigate("/sharelist");
      }
    }
    const turnState_s=()=>{
        if(!isFreeBoardClick){
            SetIsFreeBoardClick(!isFreeBoardClick);
            setType('freeboard');
            console.log(type);
            setPost();
        }
    }
    const turnState_f=()=>{
        if(isFreeBoardClick){
            SetIsFreeBoardClick(!isFreeBoardClick);
            setType('shareboard');
            console.log(type);
            setPost();
        }
    }


    useEffect(() => {
        axios
          .get(`${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setposts(response.data.data.boardList);
            //console.log("커뮤니티");
            console.log(response.data.data.boardList);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [token, pageNum, size]);

      function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
    
        return `${year}-${month}-${day}`;
      }
      function setPost(){
        axios
          .get(`${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setposts(response.data.data.boardList);
            //console.log("커뮤니티");
            console.log(response.data.data.boardList);
          })
          .catch((error) => {
            console.log(error);
          });
      
      }
 return(
    <div className="a">
        <div className="community-container">
            <div className="post">
                <h1>커뮤니티</h1>
            </div>
            
            <div className="mycontainer">
                <button className="board_list" onClick={turnState_f}>자유게시판</button>
                <button className="board_list" onClick={turnState_s} >프로젝트 공유 게시판</button>
            </div>
            <div className="divider1"><span className={isFreeBoardClick?"freeboard":"shareboard"}></span></div>
            <div className="board-container">
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
                    {/* map 함수를 이용하여 questions에 들어가있는 배열 가져오기 */}
                    {posts.map((post) => (
                    <tr key={post.boardId}>
                        <td>{post.boardId}</td>
                        <td className="title">
                        {/* <Link to={`/posts/${post.boardId}`}>
                            {post.title}
                        </Link> */}
                        {post.title}
                        </td>
                        <td>{post.createdBy}</td>
                        <td>{post.viewCount}</td>
                        <td>{formatDate(post.createdAt)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                
            </div>
            <div className="moreButton_container">
              <button className="more" onClick={moveToBoard}>+더보기</button>
            </div>
            
        </div>
            
    </div>
    

 )
}
export default Community;