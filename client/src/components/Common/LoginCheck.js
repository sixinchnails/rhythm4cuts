import { Modal, Box, Button, Typography } from "@mui/material";

function LoginCheck({ isOpen, onClose, onConfirm }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(50, 100, 255, 0.95)",
          color: "#ffffff",
          padding: "50px",
          fontFamily: 'Ramche',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          height={"70px"}
          width={"400px"}
          style={{
            fontFamily: 'Ramche',
            marginBottom: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {onConfirm ? "로그인 성공! Enjoy ~" : "로그인에 실패하였습니다. 다시 시도해주세요."}
        </Typography>

        <Button
          onClick={onClose}
          variant="contained"
          style={{
            backgroundColor: "rgba(0, 128, 255, 0.1)",
            width: "150px",
            fontFamily: 'Ramche',
          }}
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
}

export default LoginCheck;
