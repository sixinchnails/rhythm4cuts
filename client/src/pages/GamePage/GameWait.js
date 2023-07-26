import React from "react";
import { Button, Card, Container, Grid, Link as MuiLink } from "@mui/material";
import Header from "../../components/Game/Header_light";
import WaitPlayer from "../../components/Game/WaitPlayer";
import PlayerEmpty from "../../components/Game/PlayerEmpty";
import Next from "../../components/Game/NextToPlay";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleReady } from "../../store";

function GameWait() {
  const dispatch = useDispatch();
  let isReady = useSelector((state) => state.GameWait_Ready); // 준비 상태 전체를 조회

  const handleToggleReady = (playerId) => {
    dispatch(toggleReady(playerId));
  };

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
      <Grid container>
        <Grid item xs={12}>
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
            <Container>
              {/* Top */}
              <Card
                style={{
                  width: "70vw",
                  height: "50vh",
                  margin: "1%",
                }}
              >
                대기중 음악 비디오
              </Card>

              {/* Bottom */}
              <Grid container spacing={3}>
                <Grid item xs>
                  {/* 해당하는 Index 순서별로 가져와야할거야. 대기방은 들어온 순서대로?*/}
                  <WaitPlayer isReady={isReady.player1} playerId="player1" />
                </Grid>
                <Grid item xs>
                  <PlayerEmpty />
                </Grid>
                <Grid item xs>
                  <PlayerEmpty />
                </Grid>
                <Grid item xs>
                  {/* 아직 안들어 온 경우 */}
                  <PlayerEmpty />
                </Grid>
              </Grid>
            </Container>
          </Container>
        </Grid>
        <Grid item xs={1}>
          {/* 버튼을 세로로 배치합니다 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              bottom: "2%",
              right: "2%",
            }}
          >
            <Button variant="contained" color="primary" className="mb-2">
              채팅
            </Button>
            <Button
              variant={isReady.player1 ? "warning" : "success"}
              // 현재 player 1이라고 가정
              onClick={() => handleToggleReady("player1")}
              className="mb-2"
            >
              {isReady.player1 ? "Ready" : "준비하자!"}
            </Button>
            <MuiLink to="/GameList" component={Link}>
              <Button variant="contained" color="secondary">
                나가기
              </Button>
            </MuiLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default GameWait;
