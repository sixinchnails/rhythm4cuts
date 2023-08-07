import React from "react";
import "./My_UserInfo.css"; // 이 CSS 파일은 UserInfo 컴포넌트에 적용할 스타일을 정의하는 파일입니다.
import { getCookie } from "../../utils/cookie";

function UserInfo(props) {
  const email = getCookie("email");
  return (
    <div className="user-info-container">
      <div className="user-info">
        <div className="info-item" key={0}>
          <span className="info-name">이름</span>
          <span className="info-value">{props.name}</span>
        </div>
        <div className="info-item" key={1}>
          <span className="info-name">닉네임</span>
          <span className="info-value">{props.nickName}</span>
        </div>
        <div className="info-item" key={2}>
          <span className="info-name">이메일</span>
          <span className="info-value">{email}</span>
        </div>
        <div className="info-item" key={3}>
          <span className="info-name">성별</span>
          <span className="info-value">남자</span>
        </div>
      </div>
      <img className="profile-picture" alt="Profile" />
    </div>
  );
}

export default UserInfo;
