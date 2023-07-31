// Home.js
import React, { useEffect } from "react";
import Header from "../../components/Home/Mypage_Header";
import Sidebar from "../../components/My/My_SideBar";
import MainContent from "../../components/My/My_MainContent";
import "./MyFriend.css";
import FriendInfo from "../../components/My/My_Friend"; // UserInfo 컴포넌트를 import

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#F8E8EE";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
  return (
    <>
      <Header></Header>
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="friend-container">
          <MainContent></MainContent>
          <FriendInfo></FriendInfo>
        </div>
      </div>
    </>
  );
};

export default Home;
