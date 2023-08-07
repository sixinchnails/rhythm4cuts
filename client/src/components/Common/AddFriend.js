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
        .get(`/friend/search/${debouncedFriendNickname}`, {
          headers: {
            Authorization: "Bearer " + getCookie("access"),
          },
        })
        .then(response => {
          if (response.data.data.length > 0) {
            const { nickname, email } = response.data.data[0];
            setUserInfo({ nickname, email });
          } else {
            setUserInfo({ nickname: "", email: "" });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setUserInfo({ nickname: "", email: "" });
    }
  }, [debouncedFriendNickname]);

  const handleNameChange = async event => {
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
          transform: "translate(-50%, -60%)",
          backgroundColor: "rgba(50, 50, 255, 0.9)",
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
