// MyModify.js
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/My/My_SideBar";
import MainContent from "../../components/My/My_MainContent";
import ModifyInfo from "../../components/My/My_ModifyInfo";
import { userInfo } from "../../apis/userInfo";
import LoginMypageHeader from "../../components/Home/BlackHeader";
import { useNavigate } from "react-router-dom";

const MyModify = () => {
  const navigate = useNavigate();
  const checkstatus = localStorage.getItem("checkstatus");

  //닉네임
  const [nickName, setNickName] = useState("");

  //로그인 상태 확인
  try {
    userInfo()
      .then(res => {
        if (res.status === 200) {
          setNickName(res.data.nickname);
        }
      })
      .catch(error => {
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  } finally {
    if (checkstatus === "false") {
      navigate("/MyPage");
    }
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
      {/* 사이드바와 메인 제목을 수평으로 배치하기 위해서는 Flexbox 또는 CSS Grid를 사용해야한다.
      그럴려면 사이드 바와 메인 제목을 감싸고 있는 부모 요소가 필요하다.
      그 부모 요소는 사이드 바와 메인 제목을 자식 요소로 갖고, 이 자식 요소들을 수평으로 배치한다. */}
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="main-container">
          <MainContent></MainContent>
          <ModifyInfo nickName={nickName}></ModifyInfo>
        </div>
      </div>
    </div>
  );
};

export default MyModify;
