// MyFriend.js
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/My/My_SideBar";
import MainContent from "../../components/My/My_MainContent";
import "./MyFriend.css";
import FriendInfo from "../../components/My/My_Friend"; // UserInfo 컴포넌트를 import
import LoginMypageHeader from "../../components/Home/BlackHeader";
import { userInfo } from "../../apis/userInfo";
import { useNavigate } from "react-router-dom";

const MyFriend = () => {
  const navigate = useNavigate();

  //로그인 상태 확인
  const [isLogin, setIsLogin] = useState(false);

  // try {
  //   userInfo()
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log(res);
  //         setIsLogin(true);
  //       }
  //     })
  //     .catch(error => {
  //       window.alert("로그인을 해주세요!");
  //       navigate("/");
  //     });
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(to right, rgb(123,123,255), rgb(255,123,123))",
      }}
    >
      <LoginMypageHeader />
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="friend-container">
          <MainContent></MainContent>
          <FriendInfo></FriendInfo>
        </div>
      </div>
    </div>
  );
};

export default MyFriend;
