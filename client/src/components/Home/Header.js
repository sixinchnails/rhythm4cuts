/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setHasNotification } from "../../store";
import { Client } from "@stomp/stompjs";
import { Link } from "react-router-dom";
//종모양 바로 밑에 모달 띄우게하기
import Popover from "@mui/material/Popover";
import SockJS from "sockjs-client";
import Badge from "@mui/material/Badge";
import "./Header.css";

const Header = () => {
  //알람이 온지 안 온지 여부
  const dispatch = useDispatch();
  const hasNotification = useSelector(
    (state) => state.notification.hasNotification
  );
  //모달 여부
  const [popoverMessage, setPopoverMessage] = useState("아무 정보가 없습니다.");
  const [anchorEl, setAnchorEl] = useState(null);

  //누르면 모달 열리게
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setHasNotification(false));
  };
  //다시 누르면 닫히게
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   const socket = new SockJS('http://i9b109.p.ssafy.io:8080/stomp/chat');
  //   const stompClient = new Client({
  //       webSocketFactory: () => socket,
  //   });

  //   stompClient.onConnect = function (frame) {
  //       stompClient.subscribe('/subscribe/friend/2', function () {
  //         dispatch(setHasNotification(true));
  //       // 메시지 변경
  //       setPopoverMessage('누구에게 친구 신청이 왔습니다.');
  //       });
  //   };

  //   stompClient.activate();
  // }, [dispatch]);

  return (
    <div className="Header_outer1">
      {/* <div className="Header_logo1"> */}
      <Link className="Header_logo1" to={"/"}>
        <img src="images/Home_Logo.png" />
      </Link>
      {/* </div> */}
      <div>
        <Badge
          color="secondary"
          variant="dot"
          invisible={!hasNotification}
          style={{ marginRight: "20px", cursor: "pointer" }}
          onClick={handleClick}
        ></Badge>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div>{popoverMessage}</div>
        </Popover>

        <Link className="Header_Login1" to="/Login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
