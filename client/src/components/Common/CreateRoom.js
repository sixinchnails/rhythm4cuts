import React, { useState } from "react";
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

function CreateRoom({ isOpen, handleClose }) {
  const [mode, setMode] = useState("일반 방");
  const [password, setPassword] = useState("");

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
          {/* 지금은 누르면 창이 닫히도록 해놨지만, 나중엔 서버에 Axios로 보내야 함 */}
          <Button variant="contained" color="primary" onClick={handleClose}>
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
