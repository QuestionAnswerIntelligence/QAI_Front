import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/Layout/header/Header";
import Footer from "./components/Layout/footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MyPage from "./components/myPage/MyPage";
import ChatButton from "./components/Chat/ChatButton/ChatButton";
import QnAForm from "./components/QnAForm/QnAForm";
import QnAList from "./components/QnAList/QnAList";
import Community from "./components/Community/Community";
import FreeBoard from "./components/Community/FreeBoard/FreeBoard";
import ShareBoard from "./components/Community/ShareBoard/ShareBoard";
import QnAPage from "./components/QnAPage/QnAPage";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/qnalist" element={<QnAList />} />
          <Route path="/qnaform" element={<QnAForm />} />
          <Route path="/community" element={<Community />} />
          <Route path="/freeboard" element={<FreeBoard />} />
          <Route path="/shareboard" element={<ShareBoard />} />
          <Route path="/questions/:questionId" element={<QnAPage />} />
        </Routes>
        {/* <ChatButton /> */}
      </Router>
    </RecoilRoot>
  );
};

export default App;
