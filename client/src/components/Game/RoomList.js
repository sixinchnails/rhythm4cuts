import { Grid, Card, CardMedia, Typography, Box } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";

function RoomList({ room }) {
  // 방 인원수 파악
  let isFull = room.headcount >= 1;

  return (
    <Grid item xs={6} sm={12}>
      <Card
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          border: "1px solid white", // 테두리를 흰색으로 설정
          height: "19vh",
          borderRadius: "20px",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={4}
            style={{
              height: "20vh",
              display: "flex",
              alignItems: "center",
              padding: "15px",
            }}
          >
            <CardMedia
              component="img" // 이미지를 보여주기 위해 img 태그 사용
              // image={room.image}
              image="/images/잔나비.jfif"
              style={{
                padding: "5%",
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
            />
          </Grid>
          {/* 오른쪽 : 방번호, 방이름, 노래제목, 방인원수, 모드(비밀방) */}
          <Grid
            item
            xs={8}
            container
            style={{
              padding: "10px",
              height: "20vh",
            }}
          >
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontWeight: "bold",
                }}
              >
                Num : {room.gameSeq}
                <br />
                Title : {room.title}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                style={{
                  textAlign: "center",
                }}
              >
                🎵 {room.songTitle}
              </Typography>
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Box
                  style={{
                    border: "1px solid",
                    color: isFull ? "red" : "green",
                  }}
                >
                  <Typography variant="body2">
                    {isFull ? 'FULL' : `방 인원수: ${room.headcount} / 4`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                {room.isSecret ? <LockIcon /> : <LockOpenIcon />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default RoomList;
