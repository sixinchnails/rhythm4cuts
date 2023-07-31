import Header from "../../components/Home/Mypage_Header";
import { useNavigate } from "react-router-dom";
// Home.js
import React, { useEffect } from "react";
import "./Mypage.css";
import Sidebar from "../../components/My/My_SideBar";
// 마이 페이지들 import
import MainContent from "../../components/My/My_MainContent"; // MainContent 컴포넌트를 import
import UserInfo from "../../components/My/My_UserInfo"; // UserInfo 컴포넌트를 import
import Button from "@mui/material/Button";

const Home = () => {
  let navigate = useNavigate();
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
      <Header></Header>
      {/* 사이드바와 메인 제목을 수평으로 배치하기 위해서는 Flexbox 또는 CSS Grid를 사용해야한다.
      그럴려면 사이드 바와 메인 제목을 감싸고 있는 부모 요소가 필요하다.
      그 부모 요소는 사이드 바와 메인 제목을 자식 요소로 갖고, 이 자식 요소들을 수평으로 배치한다. */}
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="main-container">
          <MainContent></MainContent>
          <UserInfo />
          {/* UserInfo 컴포넌트를 사용하여 사용자 정보를 표시합니다. */}
        </div>
        <div className="buttons">
          {/* 정보 수정 버튼을 누르면 MyModify페이지로 넘어가게 해준다 */}
          <Button
            variant="contained"
            color="primary"
            className="edit-button"
            onClick={() => {
              navigate("/MyModify");
            }}
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
    </>
  );
};

export default Home;
