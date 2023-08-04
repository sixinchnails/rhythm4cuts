/* eslint-disable */
import { removeCookie } from "../../utils/cookie";
import "./LoginMypageHeader.css";
import { Link } from "react-router-dom";

const LoginMypageHeader = () => {
  const checkLogin = () => {
    removeCookie("access");
    removeCookie("refresh");
    removeCookie("email");
  };

  return (
    <div className="Header_outer2">
      <div className="Header_logo2">
        <img src="images/Mypage_Logo.png"></img>
      </div>
      <div>
        <Link className="Header_Login2" to="/" onClick={checkLogin}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default LoginMypageHeader;
