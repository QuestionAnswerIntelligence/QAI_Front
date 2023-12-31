import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/Layout/header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MyPage from "./components/myPage/MyPage";
import QnAForm from "./components/QnAForm/QnAForm";
import QnAList from "./components/QnAList/QnAList";
import Community from "./components/Community/Community";
import QnAPage from "./components/QnAPage/QnAPage";
import FreeForm from "./components/Community/FreeBoard/FreeForm/FreeForm";
import ChatPage from "./components/ChatPage/ChatPage";
import ShareForm from "./components/Community/ShareBoard/ShareForm/ShareForm";
import ChatList from "./components/ChatList/ChatList";
import FreePage from "./components/Community/FreeBoard/FreePage/FreePage";
import SharePage from "./components/Community/ShareBoard/SharePage/SharePage";
import NaverCallback from "./components/SocialLogin/NaverCallback";
import KakaoCallback from "./components/SocialLogin/KakaoCallback";
import GoogleCallback from "./components/SocialLogin/GoogleCallback";
import Activity from "./components/Activity/Activity";
import Store from "./components/Store/Store";
import Gg from "./components/Gg";
import NewTec_form from "./components/NewTecboard/NewTec_form/NewTec_form";
import NewTec_list from "./components/NewTecboard/NewTec_list/NewTec_list";
import NewTec_page from "./components/NewTecboard/NewTec_page/NewTec_page";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myPage/:memberId" element={<MyPage />} />
          <Route path="/qnalist" element={<QnAList />} />
          <Route path="/qnaform" element={<QnAForm />} />
          <Route path="/community" element={<Community />} />
          <Route path="/freeform" element={<FreeForm />} />
          <Route path="/questions/:questionId" element={<QnAPage />} />
          <Route path="/freepage/:boardId" element={<FreePage />} />
          <Route path="/sharepage/:boardId" element={<SharePage />} />
          <Route path="/shareform" element={<ShareForm />} />
          <Route path="/chats/:chatId" element={<ChatPage />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/newtec_form" element={<NewTec_form />} />
          <Route path="/newtec_page/:aiInfoId" element={<NewTec_page />} />
          <Route path="/newtec_list" element={<NewTec_list />} />
          <Route path="/store" element={<Store />} />
          <Route path="/gg" element={<Gg />} />
          <Route path="/activity/:memberId" element={<Activity />} />
          <Route
            path="/login/oauth2/callback/naver"
            element={<NaverCallback />}
          />
          <Route
            path="/login/oauth2/callback/kakao"
            element={<KakaoCallback />}
          />
          <Route
            path="/login/oauth2/callback/google"
            element={<GoogleCallback />}
          />
        </Routes>
        {/* <ChatButton /> */}
      </Router>
    </RecoilRoot>
  );
};

export default App;
