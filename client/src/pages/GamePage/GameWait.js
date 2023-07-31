import React from "react";
import { Button, Card, Container, Grid, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleReady } from "../../store";
import Header from "../../components/Game/Header_light";
import Next from "../../components/Game/NextToPlay";
import WaitPlayer from "../../components/Game/WaitPlayer";
import PlayerComing from "../../components/Game/PlayerComing";
import PlayerEmpty from "../../components/Game/PlayerEmpty";
import InviteFriend from "../../components/Common/InviteFriend";

function GameWait() {
  // 친구 목록 모달의 상태를 관리
  const [isInviteFriendModalOpen, setInviteFriendModalOpen] =
    React.useState(false);

  const handleOpenInviteFriendModal = () => {
    setInviteFriendModalOpen(true);
  };

  const handleCloseInviteFriendModal = () => {
    setInviteFriendModalOpen(false);
  };

  const dispatch = useDispatch();
  let isReady = useSelector(state => state.GameWait_Ready); // 준비 상태 전체를 조회

  const handleToggleReady = playerId => {
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
      }}>
      <Header />
      <Grid container>
        <Grid item xs={12}>
          <Container>
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item xs>
                <Next />
              </Grid>
            </Grid>
            <div>
              {/* Top */}
              <Grid>
                <Card
                  style={{
                    width: "90%",
                    height: "50vh",
                    margin: "1%",
                  }}>
                  대기중 음악 비디오
                </Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    bottom: "2%",
                    right: "2%",
                  }}>
                  <Button variant="contained" color="primary" className="mb-2">
                    채팅
                  </Button>
                  <Button
                    variant={isReady.player1 ? "warning" : "success" }
                    // 현재 player 1이라고 가정
                    onClick={() => handleToggleReady("player1")}
                    className="mb-2">
                    {isReady.player1 ? "Ready" : "준비하자!"}
                  </Button>
                  <MuiLink to="/GameList" component={Link}>
                    <Button variant="contained" color="secondary">
                      나가기
                    </Button>
                  </MuiLink>
                </div>
              </Grid>
              {/* Bottom */}
              <Grid container>
                <Grid item xs>
                  {/* 해당하는 Index 순서별로 가져와야할거야. 대기방은 들어온 순서대로?*/}
                  <WaitPlayer isReady={isReady.player1} playerId="player1" />
                </Grid>
                <Grid item xs>
                  <PlayerComing />
                </Grid>
                {/* 아직 안들어 온 경우 */}
                <Grid item xs>
                  <PlayerComing />
                </Grid>
                {/* 친구 초대 */}
                <Grid item xs>
                  <Button onClick={handleOpenInviteFriendModal}>
                    <PlayerEmpty />
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Grid>
      </Grid>

      {/* '친구 초대' 모달 */}
      <InviteFriend
        isOpen={isInviteFriendModalOpen}
        handleClose={handleCloseInviteFriendModal}
      />
    </div>
  );
}
export default GameWait;
