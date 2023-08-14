import { removeCookie } from "../../utils/cookie";
import "./BlackHeader.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";
import { useState } from "react";
import YourModalComponent from "../Common/ConfirmFriend";

const LoginMypageHeader = () => {
  const navigate = useNavigate();
  const access = getCookie("access");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasNotification, resetNotification, friendRequest } = useWebSocket(); // 여기서 friendRequest 가져옴

  const onNotificationClick = () => {
    if (!hasNotification) {
      window.alert("알림이 없습니다!"); // 알림 상태가 false일 때 메시지 표시
    } else {
      resetNotification();
      setIsModalOpen(true); // 모달 열기
    }
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post(
        "https://i9b109.p.ssafy.io:8443/member/logout",
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

  const GoMain = () => {
    navigate("/");
  };

  return (
    <div className="Header_outer2">
      <div className="Header_logo2" onClick={GoMain}>
        <img src="images/Mypage_Logo.png" alt="헤더 사진"></img>
      </div>
      <div>
        <Badge
          color="error"
          variant={hasNotification ? "dot" : "standard"}
          onClick={onNotificationClick}
          style={{ marginRight: "20px" }}
        >
          <NotificationsIcon />
        </Badge>
        <Link className="Header_Login2" to="/" onClick={checkLogin}>
          Logout
        </Link>
      </div>
      {isModalOpen && friendRequest && (
        <YourModalComponent
          friendRequest={friendRequest}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LoginMypageHeader;
