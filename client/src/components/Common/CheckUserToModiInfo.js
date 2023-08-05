/* eslint-disable */
import { React, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/login";
import { getCookie } from "../../utils/cookie";

function CheckUserToModiInfo({ isOpen, handleClose }) {
  localStorage.setItem("checkstatus", "false");
  const navigate = useNavigate();
  const [email, setEmail] = useState(getCookie("email"));
  const [pw, setPW] = useState("");
  const onChangePW = (e) => {
    setPW(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      checkPW();
    }
  };

  const checkPW = async () => {
    try {
      const result = await login(email, pw);
      if (result.status === 200) {
        localStorage.setItem("checkstatus", "true");
        navigate("/MyModify");
      } else {
        window.alert("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.log(error);
      window.alert("비밀번호가 틀렸습니다.");
    }
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
        <h3 style={{ textAlign: "center" }}>비밀번호 확인</h3>
        <TextField
          type="password"
          label="비밀번호 입력"
          variant="outlined"
          fullWidth
          value={pw}
          onChange={onChangePW}
          sx={{ width: 3 / 4 }}
          style={{ marginBottom: "20px" }}
          onKeyDown={onKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: 2, my: 1 }}
          onClick={checkPW}
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
}

export default CheckUserToModiInfo;
