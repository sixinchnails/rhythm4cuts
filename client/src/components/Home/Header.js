import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          리듬네컷
        </Link>
        <div className="navbar-collapse">
          <Link to="/Mypage" className="navbar-text">
            My Page
          </Link>
          <Link to="/Join" className="navbar-text">
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
