/* eslint-disable */
import React, { useState } from "react";
import { Container, Grid, Card, CardContent } from "@mui/material";
import Header from "../../components/Game/Header_light";
import PlayPlayer from "../../components/Game/PlayPlayer";
import Webcam from "../../components/Game/Webcam";
import Next from "../../components/Game/NextToScore";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";

function GamePlay() {
  const navigate = useNavigate();

  //로그인 상태 확인
  const [isLogin, setIsLogin] = useState(false);

  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setIsLogin(true);
        }
      })
      .catch((error) => {
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/Game_Waiting.jpg')", // 배경 이미지 URL
      }}
    >
      <Container>
        {/* Header */}
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs>
            <Header />
          </Grid>
          <Grid item xs>
            <Next />
          </Grid>
        </Grid>

        {/* Top & Bottom 묶음 */}
        <Container>
          {/* Top */}
          <Grid container spacing={3}>
            {/* 노래방 화면 */}
            <Card
              style={{
                width: "40vw",
                height: "50vh",
                margin: "1%",
              }}
            >
              노래방 화면
            </Card>
            {/* 해당 차례 캠 */}
            <Card
              style={{
                width: "30vw",
                height: "50vh",
                margin: "1%",
                backgroundColor: "black",
              }}
            >
              <CardContent>
                <Webcam />
              </CardContent>
            </Card>
          </Grid>
          {/* Bottom */}
          <Grid container spacing={3}>
            <Grid item xs>
              <PlayPlayer />
            </Grid>
            <Grid item xs>
              <PlayPlayer />
            </Grid>
            <Grid item xs>
              <PlayPlayer />
            </Grid>
            <Grid item xs>
              <PlayPlayer />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

export default GamePlay;
