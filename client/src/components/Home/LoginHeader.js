/* eslint-disable */
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import "./LoginHeader.css";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";
import { useState } from "react";
import { userInfo } from "../../apis/userInfo";
import axios from "axios";

// 액세스토큰을 헤더와 바디에 바디에는 email 도
const LoginHeader = () => {
  const access = getCookie("access");

  const checkLogin = async () => {
    try {
      const response = await axios.post(
        "/member/logout",
        {
          email: getCookie("email"),
          accessToken: access,
        },
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      if (response.status === 200) {
        console.log("로그아웃 성공");
        removeCookie("access");
        removeCookie("refresh");
        removeCookie("email");
        window.location.reload();
      } else {
        window.confirm("1오류가 발생했습니다.");
      }
    } catch (error) {
      console.log(error);
      window.confirm("2오류가 발생했습니다.");
    }
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
