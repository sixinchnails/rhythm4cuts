// 지금 페이지의 이름을 그 페이지의 제목처럼 표시해줄 컴포넌트
import React from "react";
import { useLocation } from "react-router-dom";
import "./My_MainContent.css";

function MainContent() {
  const location = useLocation();

  // 페이지 제목 설정
  const pageTitles = {
    "/Mypage": "가입 정보",
    "/MyFriend": "친구 정보",
    "/MyPoint": "Point 정보",
    "/MyPhoto": "My Photo",
    "/MyModify": "정보 수정",
  };

  const title = pageTitles[location.pathname];
  const isMyFriendPage = location.pathname === "/MyFriend";

  return (
    <div
      className={
        isMyFriendPage ? "main-content my-friend-page" : "main-content"
      }
    >
      <h1>{title}</h1>
      {isMyFriendPage && (
        <span className="add-friend">친구 추가</span> // 이 부분을 추가했습니다.
      )}
    </div>
  );
}

export default MainContent;
