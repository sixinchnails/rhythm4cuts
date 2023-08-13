// MyFriend.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userInfo } from "../../apis/userInfo";
import LoginMypageHeader from "../../components/Home/BlackHeader";
import MainContent from "../../components/My/My_MainContent";
import FriendInfo from "../../components/My/My_Friend"; // UserInfo 컴포넌트를 import
import Sidebar from "../../components/My/My_SideBar";
import React from "react";
import "./MyFriend.css";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";
import { useState } from "react";
import AddFriend from "../../components/Common/AddFriend";

const MyFriend = () => {
  const navigate = useNavigate();
  const [isAddFriendModalOpen, setAddFriendModalOpen] = useState(false); // '친구 추가' 모달의 상태를 관리

  const { connectWebSocket } = useWebSocket(); // 웹소켓 연결 함수 가져오기

  const handleOpenAddFriendModal = () => {
    setAddFriendModalOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setAddFriendModalOpen(false);
  };

  useEffect(() => {
    connectWebSocket();
    console.log("WebSocket attempted to connect");
  }, []);

  try {
    userInfo()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch(error => {
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  }

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
          <span
            className="add-friend"
            onClick={handleOpenAddFriendModal}
            style={{
              fontFamily: "Pretendard-Regular",
              fontWeight: "bold",
              cursor: "pointer",
              color: "white",
              marginRight: "10%",
              position: "absolute",
              top: "10%", // 예시 값
              left: "10%", // 예시 값
            }}
          >
            친구 추가
          </span>

          {/* '친구 추가' 모달 */}
          <AddFriend
            isOpen={isAddFriendModalOpen}
            handleClose={handleCloseAddFriendModal}
          />
        </div>
      </div>
    </div>
  );
};

export default MyFriend;
