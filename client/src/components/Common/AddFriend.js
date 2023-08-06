/* eslint-disable */
import React, { useState } from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect } from "react";

function AddFriend({ isOpen, handleClose }) {
  const [friendNickname, setfriendNickname] = useState(""); // 친구 이름 상태
  const [client, setClient] = useState(null);

  // const handleNameChange = event => {
  //   setfriendNickname(event.target.value); // 친구 이름 변경 이벤트 핸들러
  // };

  // useEffect(() => {
  //   const stompClient = new Client({
  //     webSocketFactory: () =>
  //       new SockJS("http://i9b109.p.ssafy.io:8080/stomp/chat"),
  //   });
  //   stompClient.onConnect = () => {};

  //   stompClient.activate();

  //   setClient(stompClient);

  //   // Clean up function
  //   return () => {
  //     stompClient.deactivate();
  //   };
  // }, []);

  const handleNameChange = (event) => {
    setfriendNickname(event.target.value); // 친구 이름 변경 이벤트 핸들러
  };

  function requestFriend(a, b) {
    a = 1;
    b = 2;
    const requestPayload = {
      fromUser: a,
      toUser: b,
    };

    if (client && client.connected) {
      client.publish({
        destination: "/public/request",
        body: JSON.stringify(requestPayload),
      });
    } else {
      console.error("The client is not connected.");
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(50, 100, 255, 0.8)",
          color: "#ffffff",
          padding: "50px",
          width: "500px"

        }}
      >
        <h2 style={{ textAlign: "center" }}>친구 추가</h2>

        <TextField
          label="닉네임 입력"
          variant="outlined"
          fullWidth
          value={friendNickname}
          onChange={handleNameChange}
          style={{ marginBottom: "30px", }}
          inputProps={{ style: { color: "#ffffff" } }}
          InputLabelProps={{ style: { color: "#ffffff" } }}
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          {/* 나중에 친구 목록 DB에서 가져와야돼 (친구가 있는지도 Check) */}
          <Button
            variant="contained" style={{ backgroundColor: "rgba(0, 128, 255, 0.1)", width: "100px" }}
            onClick={() => {
              handleClose();
              requestFriend();
            }}
          >
            요청
          </Button>
          <Button variant="contained" style={{ backgroundColor: "rgba(0, 128, 255, 0.1)", width: "100px" }} onClick={handleClose} >
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default AddFriend;
