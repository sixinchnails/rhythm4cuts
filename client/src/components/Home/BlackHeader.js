/* eslint-disable */
import { removeCookie } from "../../utils/cookie";
import "./BlackHeader.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import axios from "axios";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const LoginMypageHeader = () => {
  const navigate = useNavigate();
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

  const GoMain = () => {
    navigate("/");
  };

  return (
    <div className="Header_outer2">
      <div className="Header_logo2" onClick={GoMain}>
        <img src="images/Mypage_Logo.png"></img>
      </div>
      <div>
        <Badge color="error" variant="dot" style={{ marginRight: "20px" }}>
          <NotificationsIcon />
        </Badge>
        <Link className="Header_Login2" to="/" onClick={checkLogin}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default LoginMypageHeader;
