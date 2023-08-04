/* eslint-disable */
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import "./LoginHeader.css";
import { Link } from "react-router-dom";
import { removeCookie } from "../../utils/cookie";
import { useState } from "react";
import { userInfo } from "../../apis/userInfo";

const LoginHeader = () => {
  const checkLogin = () => {
    removeCookie("access");
    removeCookie("refresh");
    removeCookie("email");
    window.location.reload();
  };

  const [nickName, setNickName] = useState("");
  const [point, setPoint] = useState(0);
  userInfo().then((res) => {
    setNickName(res.data.nickname);
    setPoint(res.data.point);
  });

  return (
    <div className="Header_outer1">
      <div className="Header_logo1">
        <img src="images/Home_Logo.png"></img>
      </div>
      <div>
        {nickName}님 반갑습니다. {point}point
        <Badge color="error" variant="dot" style={{ marginRight: "20px" }}>
          <NotificationsIcon />
        </Badge>
        <Link className="Header_Login1" to="/Mypage">
          MyPage
        </Link>
        <Link className="Header_Login1" onClick={checkLogin}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
