import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { createSession } from "../../openvidu/sessionInitialization";
import { createConnection } from "../../openvidu/connectionInitialization";
// UUID는 "Universally Unique Identifier"의 약자로, 고유한 값을 생성하기 위한 표준
import { v4 as uuidv4 } from "uuid";


function CreateRoom({ isOpen, handleClose }) {
  const [room_title, setRoom_title] = useState(uuidv4()); // 방 제목
  const [song_seq, setSong_seq] = useState(""); // 노래 제목
  const [mode, setMode] = useState("일반 방");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // 페이지 이동

  const handleCreateRoom = async () => {
    const sessionResponse = await createSession(setRoom_title); // 수정된 함수 호출
    const connectionResponse = await createConnection(sessionResponse.id); // 수정된 함수 호출

    if (connectionResponse.token) {
      console.log("Token: ", connectionResponse.token);
      // 세션과 연결하거나 다른 로직을 실행합니다.
    } else {
      console.log("Failed to create a session or token.");
    }

    // 상태를 업데이트
    setRoom_title(uuidv4());

    // 방 정보를 서버로 전송하는 Axios 요청
    try {
      const response = await axios.post("http://i9b109.p.ssafy.io:8080/lobby/room", {
        room_title: room_title, // 방제목
        song_seq: song_seq, // 노래제목 (일련번호 : 검색 예정)
        mode: mode, // 방 모드 (일반 vs 비밀)
        password: password, // 비밀번호
        session_id: sessionResponse.id, // 세션 아이디
        connection_id: connectionResponse.connectionId, // 연결 아이디
      });

      const roomId = response.data.roomId;
      console.log("Room created successfully.", response.data);
      console.log("Room created Room ID:", roomId);
      
      // 방 생성 후 해당 방으로 이동
      // return <Link to={`/GameWait/${roomId}`} />; // 클릭이벤트를 발생시키지 않아서 사용 x
      navigate(`/GameWait/${roomId}`);

    } catch (error) {
      console.error("Failed to create a room.", error);
    }

  };

  const handleSongChange = event => {
    setSong_seq(event.target.value);
  };

  const handleModeChange = event => {
    setMode(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}>
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
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="노래 제목"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={song_seq}
          onChange={handleSongChange}
        />
        <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
          <FormLabel component="legend">모드</FormLabel>
          <RadioGroup
            row
            aria-label="mode"
            name="row-radio-buttons-group"
            value={mode}
            onChange={handleModeChange}>
            <FormControlLabel
              value="일반 방"
              control={<Radio />}
              label="일반 방"
            />
            <FormControlLabel
              value="비밀 방"
              control={<Radio />}
              label="비밀 방"
            />
          </RadioGroup>
        </FormControl>
        {mode === "비밀 방" && (
          <TextField
            type="password"
            label="비밀번호"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            style={{ marginBottom: "20px" }}
          />
        )}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleCreateRoom}>
            방 만들기
          </Button>
          <Button variant="contained" onClick={handleClose}>
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default CreateRoom;
