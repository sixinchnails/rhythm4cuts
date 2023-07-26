import React, { useState } from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";

function AddFriend({ isOpen, handleClose }) {
  const [friendNickname, setfriendNickname] = useState(""); // 친구 이름 상태

  const handleNameChange = event => {
    setfriendNickname(event.target.value); // 친구 이름 변경 이벤트 핸들러
  };

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
        }}>
        <h2 style={{ textAlign: "center" }}>친구 추가</h2>
        <TextField
          label="닉네임 입력"
          variant="outlined"
          fullWidth
          value={friendNickname}
          onChange={handleNameChange}
          style={{ marginBottom: "20px" }}
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          {/* 나중에 친구 목록 DB에서 가져와야돼 (친구가 있는지도 Check) */}
          <Button variant="contained" color="primary" onClick={handleClose}>
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
