import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/Layout/header/Header";
import Footer from "./components/Layout/footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MyPage from "./components/myPage/MyPage";

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
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
};

export default App;
