/* eslint-disable */
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";

const LoginMypageHeader = () => {

  // 모든 요소에 직접 color 속성 추가
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


  return (
    <div style={headerStyle}>
      <div style={logoStyle} >
        <img src="/images/GameImage/HeaderLogo.png"
          style={imgStyle} alt="Logo"></img>
      </div>
      <div>
        <Badge color="error" variant="dot" style={{ marginRight: "50px" }}>
          <NotificationsIcon />
        </Badge>
      </div>
    </div>
  );
};

export default LoginMypageHeader;
