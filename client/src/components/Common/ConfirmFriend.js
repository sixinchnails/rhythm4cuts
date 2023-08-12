import { Modal, Button, Box } from "@mui/material";

const YourModalComponent = ({ friendRequest, onClose }) => {
  // 친구 요청 수락 처리
  const handleAccept = () => {
    // TODO: 수락 로직 구현
    console.log("친구 요청 수락");
    onClose(); // 모달 닫기
  };

  // 친구 요청 거절 처리
  const handleReject = () => {
    // TODO: 거절 로직 구현
    console.log("친구 요청 거절");
    onClose(); // 모달 닫기
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "30px",
          boxShadow: 3,
        }}
      >
        <p>{friendRequest}님이 친구신청을 하셨습니다.</p>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          수락
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReject}>
          거절
        </Button>
      </Box>
    </Modal>
  );
};

export default YourModalComponent;
