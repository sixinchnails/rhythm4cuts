import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function PlayerEmpty() {
  return (
    <div>
      <Card
        sx={{
          width: "15vw",
          height: "32vh",
          position: "relative", // 추가: 로딩 스피너를 정확한 위치에 표시하기 위해 필요
        }}>
        <CardContent>
          <img
            src="/images/Empty.png"
            alt="비어있는 상태"
            style={{ width: "10vw", objectFit: "cover" }}
          />
        </CardContent>
        <Typography variant="body1"> 초대하기 </Typography>
      </Card>
    </div>
  );
}

export default PlayerEmpty;
