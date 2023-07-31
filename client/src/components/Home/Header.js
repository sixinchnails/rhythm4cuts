/* eslint-disable */
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header_outer1">
      <div className="Header_logo1">
        <img src="images/Home_Logo.png"></img>
      </div>
      <div>
        <Badge color="error" variant="dot" style={{ marginRight: "20px" }}>
          <NotificationsIcon />
        </Badge>
        <Link className="Header_Login1" to="/Login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
