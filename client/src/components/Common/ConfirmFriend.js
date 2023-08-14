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

  // friendRequest 문자열을 객체로 변환
  const requestData = JSON.parse(friendRequest);

  // 원하는 메시지 형식을 만듭니다.
  const message = `${requestData.fromUser}님이 ${requestData.toUser}님에게 요청을 보냈습니다.`;

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
        <p>{message}</p>
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
