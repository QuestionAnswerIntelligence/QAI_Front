import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/Layout/header/Header";
import Footer from "./components/Layout/footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MyPage from "./components/myPage/MyPage";
import QnAPage from "./components/QnA/QnAPage";
import ChatButton from "./components/Chat/ChatButton/ChatButton";

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
          <Route path="/qna" element={<QnAPage />} />
        </Routes>
        <ChatButton />
        <Footer />
      </Router>
    </RecoilRoot>
  );
};

export default App;
