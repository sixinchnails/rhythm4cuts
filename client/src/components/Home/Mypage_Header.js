/* eslint-disable */

import "./Mypage_Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header_outer2">
      <div className="Header_logo2">
        <img src="images/Mypage_Logo.png"></img>
      </div>
      <div>
        <Link className="Header_Login2" to="/Login"></Link>
      </div>
    </div>
  );
};

export default Header;
