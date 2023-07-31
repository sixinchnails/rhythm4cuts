/* eslint-disable */

import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header_outer1">
      <div className="Header_logo1">
        <img src="images/Home_Logo.png"></img>
      </div>
      <div>
        <Link className="Header_Login1" to="/Login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
