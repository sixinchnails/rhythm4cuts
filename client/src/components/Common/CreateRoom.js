import {
  Modal,
  Box,
  TextField,
  Button,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { setSession, setGameseq } from "../../store";
import { React, useState } from "react";
import { createSession } from "../../openvidu/sessionInitialization";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/cookie";
import axios from "axios";

function CreateRoom({ isOpen, handleClose }) {
  const dispatch = useDispatch(); // Redux
  const navigate = useNavigate(); // 페이지 이동
  const [isSecret, setIsSecret] = useState("일반 방"); // 모드
  const [password, setPassword] = useState(""); // 비밀방 암호
  const [title, setTitle] = useState(uuidv4()); // 방 제목
  const [songSeq, setSongSeq] = useState(""); // 노래 번호 (Integer)

  const handleSongChange = (event) => {
    setSongSeq(event.target.value);
  };

  const handleModeChange = (event) => {
    setIsSecret(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateRoom = async () => {
    try {
      const sessionResponse = await createSession(); // 세션 id 만들기
      if (sessionResponse != null) {
        // 방 정보를 서버로 전송하는 Axios 요청
        const response = await axios.post(
          "https://i9b109.p.ssafy.io:8443/lobby/room",
          {
            title: title, // 방 제목
            songSeq: songSeq, // 노래제목 (일련번호 : 검색 예정)
            isSecret: isSecret === "비밀 방" ? 1 : 0, // 방 모드 (일반 vs 비밀)
            password: password, // 비밀번호
            sessionId: sessionResponse.id, // 세션 아이디
          },
          {
            headers: {
              Authorization: "Bearer " + getCookie("access"),
            },
          }
        );
        console.log("방 만들어졌습니다~ 세션아이디 : " + sessionResponse.id);
        console.log("방 만들어졌습니다~ gameseq : ", response.data.data);
        dispatch(setSession(sessionResponse.id)); // 방 session 정보를 넘기기위해
        dispatch(setGameseq(response.data.data)); // 방 gameseq 정보를 넘기기위해

        // 방 생성 후 해당 방으로 이동
        navigate(`/GameWait/${response.data.data}`);
      }
    } catch (error) {
      console.error("세션을 받지 못했죠~", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(50, 100, 255, 0.9)",
          color: "#ffffff",
          padding: "50px",
        }}
      >
        <img
          src="/images/CreateRoom.gif"
          alt="망치질"
          style={{
            width: "100px",
            display: "block",
            margin: "auto",
            padding: "3%",
          }}
        />

        <TextField
          label="방 제목"
          variant="outlined"
          fullWidth
          style={{
            marginBottom: "20px",
            backgroundColor: "rgba(0, 128, 255, 0.1)",
          }}
          onChange={(event) => setTitle(event.target.value)}
          inputProps={{ style: { color: "#ffffff" } }}
          InputLabelProps={{ style: { color: "#ffffff" } }}
        />
        <TextField
          label="노래 제목"
          variant="outlined"
          fullWidth
          style={{
            marginBottom: "20px",
            backgroundColor: "rgba(0, 128, 255, 0.1)",
          }}
          value={songSeq}
          onChange={handleSongChange}
          inputProps={{ style: { color: "#ffffff" } }}
          InputLabelProps={{ style: { color: "#ffffff" } }}
        />
        <FormControl
          component="fieldset"
          style={{ marginBottom: "20px", marginLeft: "10px" }}
        >
          <FormLabel component="legend" style={{ color: "#ffffff" }}>
            모드
          </FormLabel>
          <RadioGroup
            row
            aria-label="isSecret"
            name="row-radio-buttons-group"
            value={isSecret}
            onChange={handleModeChange}
          >
            <FormControlLabel
              value="일반 방"
              control={<Radio style={{ color: "#ffffff" }} />}
              label="일반 방"
            />
            <FormControlLabel
              value="비밀 방"
              control={<Radio style={{ color: "#ffffff" }} />}
              label="비밀 방"
            />
          </RadioGroup>
        </FormControl>
        {isSecret === "비밀 방" && (
          <TextField
            type="password"
            label="비밀번호"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            style={{ marginBottom: "20px" }}
            inputProps={{ style: { color: "#ffffff" } }} // 입력 텍스트의 색상을 흰색으로 설정
            InputLabelProps={{ style: { color: "#ffffff" } }} // 라벨 텍스트의 색상을 흰색으로 설정
          />
        )}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleCreateRoom}
            style={{ backgroundColor: "rgba(0, 128, 255, 0.1)" }}
          >
            방 만들기
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ backgroundColor: "rgba(0, 128, 255, 0.1)" }}
          >
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default CreateRoom;
