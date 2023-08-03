// Mypage.js
/* eslint-disable */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Mypage.css";
import Sidebar from "../../components/My/My_SideBar";
// 마이 페이지들 import
import MainContent from "../../components/My/My_MainContent"; // MainContent 컴포넌트를 import
import UserInfo from "../../components/My/My_UserInfo"; // UserInfo 컴포넌트를 import
import Button from "@mui/material/Button";
import { userInfo } from "../../apis/userInfo";
import LoginMypageHeader from "../../components/Home/LoginMypageHeader";
import CheckUserToModiInfo from "../../components/Common/CheckUserToModiInfo";

const Mypage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSearchPasswordModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseSearchPasswordModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  //이름
  const [name, setName] = useState("");

  //닉네임
  const [nickName, setNickName] = useState("");

  //로그인 상태 확인
  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          setNickName(res.data.nickname);
          setName(res.data.name);
        }
      })
      .catch((error) => {
        navigate("/");
        window.alert("로그인을 해주세요!");
      });
  } catch (error) {
    console.log(error);
  }

  // 배경색 변경
  useEffect(() => {
    document.body.style.backgroundColor = "#F8E8EE";

    // 컴포넌트 unmount 시점에 원래의 배경색으로 되돌리기 위한 cleanup 함수
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
  return (
    <>
      <LoginMypageHeader />
      {/* 사이드바와 메인 제목을 수평으로 배치하기 위해서는 Flexbox 또는 CSS Grid를 사용해야한다.
      그럴려면 사이드 바와 메인 제목을 감싸고 있는 부모 요소가 필요하다.
      그 부모 요소는 사이드 바와 메인 제목을 자식 요소로 갖고, 이 자식 요소들을 수평으로 배치한다. */}
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="main-container">
          <MainContent></MainContent>
          <UserInfo name={name} nickName={nickName} />
          {/* UserInfo 컴포넌트를 사용하여 사용자 정보를 표시합니다. */}
        </div>
        <div className="buttons">
          {/* 정보 수정 버튼을 누르면 MyModify페이지로 넘어가게 해준다 */}
          <Button
            variant="contained"
            color="primary"
            className="edit-button"
            onClick={handleOpenSearchPasswordModal}
            style={{
              backgroundColor: "#F2BED1",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            정보 수정
          </Button>
          <Button
            variant="contained"
            color="error"
            className="delete-button"
            style={{
              backgroundColor: "#F2BED1",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            회원 탈퇴
          </Button>
        </div>
      </div>

      <CheckUserToModiInfo
        isOpen={isModalOpen}
        handleClose={handleCloseSearchPasswordModal}
      />
    </>
  );
};

export default Mypage;
