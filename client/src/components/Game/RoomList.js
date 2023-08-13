import { Grid, CardMedia, Typography, Box, Modal, TextField, Button } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookie';

function RoomList({ room, onRoomClick }) {
  // 방 인원수 파악
  let isFull = room.headcount >= 4;

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleCardClick = () => {

    if (room.isSecret === 1) {
      setPasswordModalOpen(true);
    } else if (room.isSecret === 0) {
      onRoomClick(room);
    } else {
      console.log("비밀방 체크가 안된듯")
    }

  };

  const handlePasswordSubmit = async () => {

    try {
      const response = await axios.get(
        `https://i9b109.p.ssafy.io:8443/wait/info/${room.gameSeq}`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("access"),
          },
        }
      );
      console.log("서버에서 가져온 비밀번호: " + response.data.data.password);
      console.log("입력한 비밀번호: " + password);

      if (response.data.data.password === password) {
        setPasswordModalOpen(false);
        onRoomClick(room);
        console.log("비밀번호가 맞았습니다.");
      } else {
        console.error("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("비밀번호 확인에 오류가 발생했습니다.", error);
    }
  };


  return (
    <Grid item xs={6} sm={12}>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          border: "1px solid white", // 테두리를 흰색으로 설정
          height: "19vh",
          borderRadius: "20px",
        }}
        onClick={handleCardClick}
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
      </div>

      <Modal open={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)}
        onClick={(event) => event.stopPropagation()}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">비밀번호 입력</Typography>
          <TextField
            label="비밀번호"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            type="password"
            sx={{ my: 2 }}
          />
          <Button onClick={handlePasswordSubmit} variant="contained">
            확인
          </Button>
          <Button onClick={() => setPasswordModalOpen(false)} variant="outlined" sx={{ mx: 1 }}>
            취소
          </Button>
        </Box>

      </Modal>
    </Grid>
  );
}

export default RoomList;