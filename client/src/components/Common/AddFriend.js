/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { getCookie } from "../../utils/cookie";

function AddFriend({ isOpen, handleClose }) {
  const [friendNickname, setfriendNickname] = useState("");
  const [userInfo, setUserInfo] = useState({ nickname: "", email: "" });
  const [debouncedFriendNickname] = useDebounce(friendNickname, 300);

  useEffect(() => {
    if (debouncedFriendNickname) {
      axios
        .get(
          `https://i9b109.p.ssafy.io:8443/friend/search/${debouncedFriendNickname}`,
          {
            headers: {
              Authorization: "Bearer " + getCookie("access"),
            },
          }
        )
        .then((response) => {
          if (response.data.data.length > 0) {
            const { nickname, email } = response.data.data[0];
            setUserInfo({ nickname, email });
          } else {
            setUserInfo({ nickname: "", email: "" });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUserInfo({ nickname: "", email: "" });
    }
  }, [debouncedFriendNickname]);

  const handleNameChange = async (event) => {
    setfriendNickname(event.target.value);
  };

  function requestFriend(a, b) {
    a = 1;
    b = 2;
    const requestPayload = {
      fromUser: a,
      toUser: b,
    };

    // if (client && client.connected) {
    //   client.publish({
    //     destination: "/public/request",
    //     body: JSON.stringify(requestPayload),
    //   });
    // } else {
    //   console.error("The client is not connected.");
    // }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 style={{ textAlign: "center" }}>친구 추가</h2>
        <TextField
          label="닉네임 입력"
          variant="outlined"
          fullWidth
          value={friendNickname}
          onChange={handleNameChange}
          style={{ marginBottom: "20px" }}
        />
        <List>
          {userInfo.nickname && userInfo.email && (
            <ListItem>
              <ListItemText
                primary={`닉네임: ${userInfo.nickname}`}
                secondary={`이메일: ${userInfo.email}`}
              />
            </ListItem>
          )}
        </List>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
              requestFriend();
            }}
          >
            추가
          </Button>
          <Button variant="contained" onClick={handleClose}>
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default AddFriend;
