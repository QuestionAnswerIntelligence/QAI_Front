import React from "react";

import Header from "../Layout/header/Header";
import Footer from "../Layout/footer/Footer";
import Chat from "../Chat/Chat"

import "./Home.css";


const Home = () => {
  return (
    <div>
      <Header />
      <Chat/>

      <div className="main">
        <h2>메인 홈페이지</h2>
      </div>
      <div className="aa">
          
      </div>
      <div className="aa">
          
      </div>
      <div className="aa">
          
      </div>
      <Footer />
    </div>
  );
};

export default Home;
