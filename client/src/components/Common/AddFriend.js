import { React, useState, useEffect } from "react";
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
import { useDebounce } from "use-debounce";
import { getCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

var sock = new SockJS("https://i9b109.p.ssafy.io:8443/stomp/chat");
var stomp = Stomp.over(sock);

function AddFriend({ isOpen, handleClose }) {
  const [friendNickname, setfriendNickname] = useState("");
  const [UserInfo, setUserInfo] = useState({ nickname: "", email: "" });
  const [debouncedFriendNickname] = useDebounce(friendNickname, 300);
  // const [client, setClient] = useState(null);
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const navigate = useNavigate();
  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          setFromUser(res.data.user_seq);
          console.log(res.data.user_seq);
        }
      })
      .catch((error) => {});
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    stomp.connect({}, () => {
      console.log("connected");
      if (fromUser) {
        console.log("Subscribing to user:", fromUser);
        stomp.subscribe(`/subscribe/friend/${fromUser}`, () => {
          // alert("친구 요청 옴");
        });
      }
    });
  }, [fromUser]);

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
            const { nickname, email, userSeq } = response.data.data[0];
            setUserInfo({ nickname, email });
            setToUser(userSeq);
          } else {
            setUserInfo({ nickname: "", email: "" });
            setToUser("");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUserInfo({ nickname: "", email: "" });
      setToUser("");
    }
  }, [debouncedFriendNickname]);

  const handleNameChange = async (event) => {
    setfriendNickname(event.target.value);
  };

  function requestFriend() {
    console.log(fromUser);
    console.log(toUser);
    var request = {
      fromUser: fromUser,
      toUser: toUser,
    };
    if (stomp.connected) {
      stomp.send("/public/request", {}, JSON.stringify(request));
    }
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
          width: "500px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>친구 추가</h2>

        <TextField
          label="닉네임 입력"
          variant="outlined"
          fullWidth
          value={friendNickname}
          onChange={handleNameChange}
          style={{ marginBottom: "30px" }}
          inputProps={{ style: { color: "#ffffff" } }}
          InputLabelProps={{ style: { color: "#ffffff" } }}
        />
        <List>
          {UserInfo.nickname && UserInfo.email && (
            <ListItem>
              <ListItemText
                primary={`닉네임: ${UserInfo.nickname}`}
                secondary={`이메일: ${UserInfo.email}`}
              />
            </ListItem>
          )}
        </List>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgba(0, 128, 255, 0.1)",
              width: "100px",
            }}
            onClick={() => {
              handleClose();
              requestFriend(fromUser, toUser);
            }}
          >
            요청
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgba(0, 128, 255, 0.1)",
              width: "100px",
            }}
            onClick={handleClose}
          >
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default AddFriend;
