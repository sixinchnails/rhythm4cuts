import { removeCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import LogoutAlert from "../Common/LogoutAlert";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";
import YourModalComponent from "../Common/ConfirmFriend";

const HeaderWait = () => {
  const navigate = useNavigate();
  const access = getCookie("access");
  const { hasNotification, resetNotification, friendRequest } = useWebSocket(); // Get the required states and functions from the hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onNotificationClick = () => {
    resetNotification();
    setIsModalOpen(true); // Open the modal
  };

  // 모달 상태를 관리하기 위한 state 추가
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

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
        navigate("/");
      } else {
        window.confirm("로그아웃 실패.");
      }
    } catch (error) {
      console.log(error);
      window.confirm("로그아웃 통신 오류발생.");
    }
  };

  const GoMain = () => {
    navigate("/");
  };

  const headerStyle = {
    height: "12vh",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    height: "25vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const imgStyle = {
    height: "40%",
    color: "white",
  };

  const loginStyle = {
    marginRight: "5vw",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={headerStyle}>
      <div style={logoStyle} onClick={GoMain}>
        <img
          src="images/GameImage/HeaderLogo.png"
          style={imgStyle}
          alt="Logo"
        ></img>
      </div>
      <div
        style={{
          fontFamily: "Pretendard-Regular",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <Badge
          color="error"
          variant={hasNotification ? "dot" : "standard"} // Set the variant conditionally based on the hasNotification state
          onClick={onNotificationClick} // Set the onClick handler
          style={{ marginRight: "30px" }}
        >
          <NotificationsIcon />
        </Badge>
        <Link style={loginStyle} onClick={() => setLogoutModalOpen(true)}>
          Logout
        </Link>
      </div>

      {/* 로그아웃 모달 */}
      <LogoutAlert
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={checkLogin}
      />

      {/* Friend request modal */}
      {isModalOpen && friendRequest && (
        <YourModalComponent
          friendRequest={friendRequest}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HeaderWait;
