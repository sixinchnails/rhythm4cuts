import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
// import Webcam from "./Webcam";

function PlayPlayer() {
  return (
    <div>
      <Card
        sx={{
          width: "15vw",
          height: "32vh",
          marginBottom: 2,
        }}
      >
        <CardContent>
          <Card
            sx={{
              height: "15vh",
              margin: 2,
            }}
          >
            {/* 사용자 카메라 */}
            {/* <Webcam /> */}
          </Card>
        </CardContent>
        <Box>
          <Typography variant="body1">닉네임</Typography>
          <Typography variant="body1">1 Player : 80% </Typography>
        </Box>
      </Card>
    </div>
  );
}

export default PlayPlayer;
