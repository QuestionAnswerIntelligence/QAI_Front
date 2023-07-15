import React from "react";

import Header from "../Layout/header/Header";
import Footer from "../Layout/footer/Footer";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <h2>메인 홈페이지</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
