import { React, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

function SearchPassword({ isOpen, handleClose }) {
  const [userId, setuserId] = useState("");
  const [userEmail, setuserEmail] = useState("");

  const handleIdChange = (event) => {
    setuserId(event.target.value); // 아이디 변경 이벤트 핸들러
  };

  const handleEmailChange = (event) => {
    setuserEmail(event.target.value); // 이메일 변경 이벤트 핸들러
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        style={{ textAlign: "center" }}
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
        <h3 style={{ textAlign: "center" }}>비밀번호 찾기</h3>
        <TextField
          label="이메일 입력"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={handleIdChange}
          sx={{ width: 3 / 4 }}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" sx={{ mx: 2, my: 1 }}>
          인증
        </Button>
        <TextField
          label="인증번호 입력"
          variant="outlined"
          fullWidth
          value={userEmail}
          onChange={handleEmailChange}
          sx={{ width: 3 / 4 }}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" sx={{ mx: 2, my: 1 }}>
          확인
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          비밀번호 찾기
        </Button>
      </Box>
    </Modal>
  );
}

export default SearchPassword;
