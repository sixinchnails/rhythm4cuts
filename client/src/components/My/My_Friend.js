import React from "react";
import "./My_Friend.css"; // 이 CSS 파일은 FriendInfo 컴포넌트에 적용할 스타일을 정의하는 파일입니다.
// Store.js 파일 불러와서 쓰기 위해
import { useSelector } from "react-redux";
function FriendInfo() {
  const Info = useSelector(state => state.MyPage_Friend);

  function getProfilePic(point) {
    if (point <= 2000) {
      return "/images/브론즈.png";
    } else if (point <= 4000) {
      return "/images/실버.png";
    } else if (point <= 6000) {
      return "/images/골드.png";
    } else if (point <= 8000) {
      return "/images/플레.png";
    } else {
      return "/images/다이아.png";
    }
  }

  return (
    <div className="friend-info-container">
      <div className="friend-info">
        {Info.map((item, index) => (
          <div className="friend-item" key={index}>
            <img
              src={getProfilePic(item.point)}
              alt="Profile"
              className="friend-degree-pic"
            />
            <span className="friend-name">{item.name}</span>
            <span className="friend-point">
              <img
                src="/images/pointFont.png"
                alt="Profile"
                className="pointFont"
              />
              {item.point}
            </span>
            <span className={`friend-playing ${item.playing}`}>
              {item.playing}
            </span>
            <img
              src="/images/친구삭제.png"
              alt="Profile"
              className="deleteFriend"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendInfo;
