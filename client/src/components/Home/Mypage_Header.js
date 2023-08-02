/* eslint-disable */

import "./Mypage_Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header_outer2">
      <Link className="Header_logo2" to={"/"}>
        <img src="images/Mypage_Logo.png"></img>
      </Link>
      <div>
        <Link className="Header_Login2" to="/Login"></Link>
      </div>
    </div>
  );
};

export default Header;
