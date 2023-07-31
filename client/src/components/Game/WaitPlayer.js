import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Box } from "@mui/material";
import Webcam from "./Webcam";

function WaitPlayer({ playerId }) {
  const isReady = useSelector((state) => state.GameWait_Ready[playerId]);

  return (
    <Box>
      <Card
        sx={{
          width: "15vw",
          height: "32vh",
          position: "relative",
        }}>
        {/* 준비 상태일 때만 대각선 띠와 READY 텍스트를 표시합니다 */}
        {isReady && (
          <Box
            sx={{
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(to top right, transparent 50%, green 50%)",
              opacity: 0.7,
              zIndex: 1,
            }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "2em",
                color: "white",
                fontWeight: "bold",
              }}>
              READY
            </Box>
          </Box>
        )}
        <CardContent>
          <Card
            sx={{
              height: "15vh",
              margin: "2%",
            }}>
            {/* 사용자 카메라 */}
            <Webcam />
          </Card>
        </CardContent>
        <Box sx={{ p: 1 }}>
          <Box>닉네임</Box>
          <Box>1 Player : 90% </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default WaitPlayer;
