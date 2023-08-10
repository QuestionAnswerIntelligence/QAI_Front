import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Constant";
import ViewCount from "../../icons/ViewCount.png";
import "./Community.css";



const Community = () => {
  const token = localStorage.getItem("jwtToken");
  const [type, setType] = useState("freeBoard");
  const [posts, setposts] = useState([]);
  const [isFreeBoardClick, SetIsFreeBoardClick] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(8);
  const [keyword,setKeyword]=useState("");
  const [option,setOption]=useState("제목");
  const navigate = useNavigate();

  const moveToBoard = () => {
    if (isFreeBoardClick) {
      navigate("/freelist");
    } else {
      navigate("/sharelist");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setposts(response.data.data.boardList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, pageNum, size, type]);

  const turnState_f = () => {
    if (!isFreeBoardClick) {
      setType("freeboard");
      SetIsFreeBoardClick(true);
    }
  };

  const turnState_s = () => {
    if (isFreeBoardClick) {
      setType("shareboard");
      SetIsFreeBoardClick(false);
    }
  };

  const moveToMakeQuestion = () => {
    if (isFreeBoardClick) {
      navigate("/freeform");
    } else {
      navigate("/shareform");
    }
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  const handleSubmit=(e)=>{
      e.preventDefault();
      axios
      .get(`${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}&option=${option}&searchKeyword=${keyword}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setposts(response.data.data.boardList);
        e.target.value="";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleKeyDown=(e)=>{
    e.preventDefault();
    console.log(e.key);
    // if(e.key=='enter'){
    //   
    //   axios
    //   .get(`${API_URL}/boards?page=${pageNum}&size=${size}&boardType=${type}&option=${option}&searchKeyword=${keyword}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setposts(response.data.data.boardList);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  }

  const handleInputChange=(event)=>{
    setKeyword(event.target.value);
    
  }
  const handleSelect=(event)=>{
    setOption(event.target.value);
  }
  return (
    <div className="a">
      <div className="community-container">
        <div className="post-container">
          <h1>커뮤니티</h1>
          <button className="postbutton1" onClick={moveToMakeQuestion}>
            글쓰기
          </button>
        </div>
        <span className="community-span" style={{ fontWeight: "bold" }}>개발자들과 소통해 보아요! </span>
        <div className="searchBox">
          <form onSubmit={handleSubmit}>
            <select className="select-box" onChange={handleSelect}>
                <option value="제목">제목</option>
                <option value="내용">내용</option>
                <option value="제목+내용">제목+내용</option>
            </select>
            <input className="community-search" type="text" placeholder="Search" onChange={handleInputChange}></input>
            <button>검색</button>
          </form>
          
          <div
            style={{
              position: "relative",
              marginTop: "3vh",
              display: "flex",
            }}
          >

            <button className="community-checkbox" type="checkbox"  style={{marginRight:"5px"}}></button>
            <span className="community-checkbox-span" style={{ color: "black" , marginRight:"5px"}}>최신순</span>
            <button className="community-checkbox" type="checkbox" style={{marginRight:"5px"}}></button>
            <span className="community-checkbox-span" style={{ color: "black" , marginRight:"5px"}}>인기순</span>
          </div>
        </div>
        <div className="mycontainer">
          <button className="board_list" onClick={turnState_f}>
            자유게시판
          </button>
          <button className="board_list" onClick={turnState_s}>
            프로젝트 공유 게시판
          </button>
        </div>
        <div className="divider1">
          <span
            className={isFreeBoardClick ? "freeboard" : "shareboard"}
          ></span>
        </div>
        <div className="board-container">
          <table className="community-table">
            <tbody>
              {/* map 함수를 이용하여 questions에 들어가있는 배열 가져오기 */}
              {posts.map((post) => (
                <tr key={post.boardId}>
                  <div className="community-tr">
                    <div className="community-left">
                      <td>{post.boardId}</td>
                      <div className="community-title">
                        <td className="community-post-title">
                          {/* {<Link to={`/posts/${post.boardId}`}>{post.title}</Link>} */}
                          {post.title}
                        </td>
                        <td className="community-content">{post.content}</td>
                      </div>
                    </div>
                    <div className="community-right">
                      <div className="createdBy-box">
                          <td className="community-createdBy">작성자 : {post.createdBy}</td>
                      </div>
                      <td className="createdAt">
                        작성 일자 : {formatDate(post.createdAt)}
                      </td>
                      <td className="viewCount">
                        <img src={ViewCount}></img>
                        {post.viewCount}
                      </td>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pageNum">
          <button
            className="preButton" onClick={() => setPageNum((prevPageNum) => prevPageNum - 1)}
            disabled={pageNum === 0}
          >
          </button>
          <span className="pageNumber">{pageNum+1}/300</span>
          <button className="nextButton" onClick={() => setPageNum((prevPageNum) => prevPageNum + 1)}>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Community;
