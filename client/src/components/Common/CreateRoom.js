/* eslint-disable */
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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../openvidu/sessionInitialization";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../utils/cookie";
import { setSession, setGameSeq } from "../../store";

function CreateRoom({ isOpen, handleClose }) {
  const dispatch = useDispatch(); // Redux
  const navigate = useNavigate(); // 페이지 이동
  // <<<<<<< HEAD

  //   const handleCreateRoom = async () => {
  //     try {
  //       const sessionResponse = await createSession(); // 수정된 함수 호출

  //       if (sessionResponse != null) {
  //         // OpenVidu 세션에 연결 생성
  //         const connectionResponse = await createConnection(
  //           sessionResponse.sessionId
  //         ); // 수정된 함수 호출

  //         if (connectionResponse != null) {
  //           console.log("Token: ", connectionResponse.token);

  //           // 방 정보를 서버로 전송하는 Axios 요청
  //           const response = await axios.post(
  //             "/lobby/room",
  //             {
  //               title: title, // 방 제목
  //               songSeq: songSeq, // 노래제목 (일련번호 : 검색 예정)
  //               isSecret: isSecret === "비밀 방" ? 1 : 0, // 방 모드 (일반 vs 비밀)
  //               password: password, // 비밀번호
  //               sessionId: sessionResponse.id, // 세션 아이디
  //               connectionId: connectionResponse.connectionId, // 연결 아이디
  //             },
  //             {
  //               headers: {
  //                 Authorization: "Bearer " + getCookie("access"),
  //               },
  //             }
  //           );
  //           console.log("연결아이디: " + connectionResponse.connectionId);
  //           console.log("세션아이디: " + sessionResponse.id);
  //           console.log("방이 만들어 졌엉.", response.data.data);

  //           // // 방 정보를 서버로 전송하는 Axios 요청
  //           // response = await axios.post(
  //           //   "/member/info",
  //           //   {
  //           //     connectionId: connectionResponse.connectionId, // 방 연결 토큰
  //           //   },
  //           //   {
  //           //     headers: {
  //           //       Authorization: "Bearer " + getCookie("access"),
  //           //     },
  //           //   }
  //           // );

  //           // 방 번호를 상태에 업데이트
  //           setGameSeq(response.data.data);

  //           // 방 생성 후 해당 방으로 이동
  //           console.log("${response.data.gameSeq}");
  //           navigate(`/GameWait/${response.data.data}`);
  //         } else {
  //           console.log("만들기 실패 a connection or token.");
  //         }
  //       } else {
  //         console.log("세션 생성 실패 약!.");
  //       }
  //     } catch (error) {
  //       console.error("방 생성 실패 닥!.", error);
  //     }
  //   };
  // =======
  const [title, setTitle] = useState(uuidv4()); // 방 제목
  const [songSeq, setSongSeq] = useState(""); // 노래 번호 (Integer)
  const [isSecret, setIsSecret] = useState("일반 방"); // 모드
  const [password, setPassword] = useState(""); // 비밀방 암호

  const handleSongChange = event => {
    setSongSeq(event.target.value);
  };

  const handleModeChange = event => {
    setIsSecret(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleCreateRoom = async () => {
    try {
      const sessionResponse = await createSession(); // 세션 id 만들기
      if (sessionResponse != null) {
        // 방 정보를 서버로 전송하는 Axios 요청
        const response = await axios.post(
          "/lobby/room",
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
        console.log("세션아이디 : " + sessionResponse.id);
        console.log("방 gameSeq : ", response.data.data);
        // dispatch(setSession(sessionResponse.id)); // 방 session 정보를 넘기기위해
        // dispatch(setGameSeq(response.data.data)); // 방 gameSeq 정보를 넘기기위해

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
          width: "40%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
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
          style={{ marginBottom: "20px" }}
          onChange={event => setTitle(event.target.value)}
        />
        <TextField
          label="노래 제목"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={songSeq}
          onChange={handleSongChange}
        />
        <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
          <FormLabel component="legend">모드</FormLabel>
          <RadioGroup
            row
            aria-label="isSecret"
            name="row-radio-buttons-group"
            value={isSecret}
            onChange={handleModeChange}
          >
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
        {isSecret === "비밀 방" && (
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateRoom}
          >
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
