import React from "react";
import "./My_UserInfo.css"; // 이 CSS 파일은 UserInfo 컴포넌트에 적용할 스타일을 정의하는 파일입니다.
import { useSelector } from "react-redux/es/hooks/useSelector";

function UserInfo() {
  const Info = useSelector(state => state.MyPage_MyInfo);
  const image = Info.find(item => item.name === "프로필 사진").value;

  return (
    <div className="user-info-container">
      <div className="user-info">
        {Info.filter(
          item => item.name !== "프로필 사진" && item.name !== "비밀번호"
        ).map((item, index) => (
          <div className="info-item" key={index}>
            <span className="info-name">{item.name}</span>
            <span className="info-value">{item.value}</span>
          </div>
        ))}
      </div>
      <img className="profile-picture" src={image} alt="Profile" />
    </div>
  );
}

export default UserInfo;
