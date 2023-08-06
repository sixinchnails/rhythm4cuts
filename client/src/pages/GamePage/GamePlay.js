/* eslint-disable */
import { fetchToken, closeSession } from "../../store"; // 추가된 액션 import
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Game/HeaderPlay";
import PlayPlayer from "../../components/Game/PlayPlayer";
import NextToScore from "../../components/Game/NextToScore"; // 추가된 컴포넌트 import
import UserVideo from '../../components/Game/UserVideo';

function GamePlay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector(state => state.roomState.session);
  const connectionToken = useSelector(state => state.roomState.connectionToken);

  // //로그인 상태 확인
  // const [isLogin, setIsLogin] = useState(false);

  // try {
  //   userInfo()
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res);
  //         setIsLogin(true);
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert("로그인을 해주세요!");
  //       navigate("/");
  //     });
  // } catch (error) {
  //   console.log(error);
  // }

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
            {/* NextToScore 컴포넌트 렌더링 */}
            <NextToScore />
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
                backgroundImage: "url('/images/karaoke_screen.jpg')", // 이 부분에 노래가 떠야돼!!!!!!!
                backgroundSize: "cover",
                backgroundPosition: "center",
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
                <UserVideo />
                {/* <Webcam onWebcamStream={handleWebcamStream} /> */}
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
