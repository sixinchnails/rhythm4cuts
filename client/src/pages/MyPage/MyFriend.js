// Home.js
import React, { useEffect } from "react";
import Header from "../../components/Home/Mypage_Header";
import Sidebar from "../../components/My/My_SideBar";
import MainContent from "../../components/My/My_MainContent";
import "./MyFriend.css";
import FriendInfo from "../../components/My/My_Friend"; // UserInfo 컴포넌트를 import

const Home = () => {
  const friendInfo = [
    { name: "유밍국", point: "10000", playing: "게임중" },
    { name: "실버캐슬", point: "8000", playing: "온라인" },
    { name: "최고다한윤", point: "6000", playing: "게임중" },
    { name: "홍유콩", point: "4000", playing: "게임중" },
    { name: "최재드래곤", point: "2000", playing: "오프라인" },
  ];
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
          <FriendInfo Info={friendInfo}></FriendInfo>
        </div>
      </div>
    </>
  );
};

export default Home;
