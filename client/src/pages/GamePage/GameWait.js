/* eslint-disable */
import React, { useState } from "react";
import { Button, Card, Container, Grid, Link as MuiLink } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleReady } from "../../store";
import Header from "../../components/Game/Header_light";
import Next from "../../components/Game/NextToPlay";
import WaitPlayer from "../../components/Game/WaitPlayer";
import PlayerEmpty from "../../components/Game/PlayerEmpty";
import InviteFriend from "../../components/Common/InviteFriend";
import { fetchToken } from "../../store";
import { userInfo } from "../../apis/userInfo";

function GameWait() {
  const { gameSeq } = useParams();
  const dispatch = useDispatch();

  const token = useSelector(state => state.session.token); // fetchToken 액션의 결과로부터 토큰을 가져옴

  const navigate = useNavigate();

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

  // 친구 목록 모달의 상태를 관리
  const [isInviteFriendModalOpen, setInviteFriendModalOpen] =
    React.useState(false);

  const handleOpenInviteFriendModal = () => {
    setInviteFriendModalOpen(true);
  };

  const handleCloseInviteFriendModal = () => {
    setInviteFriendModalOpen(false);
  };

  let isReady = useSelector(state => state.GameWait_Ready); // 준비 상태 전체를 조회

  const handleToggleReady = playerId => {
    dispatch(toggleReady(playerId));
  };

  useEffect(() => {
    // gameSeq가 실제 방 번호일 경우 fetchToken 액션을 호출하여 방 토큰을 가져옵니다.
    if (gameSeq) {
      dispatch(fetchToken(gameSeq));
    }
  }, [dispatch, gameSeq]);

  // 토큰이 가져와지고 세션을 생성해야 할 때 처리하는 useEffect 블록
  useEffect(() => {
    if (token) {
      // TODO: 토큰이 있을 때 세션 생성 로직 추가
    }
  }, [token]);

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
                  }}
                >
                  대기중 음악 비디오
                </Card>
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
              {/* Bottom */}
              <Grid container>
                <Grid item xs>
                  {/* 대기 플레이어 1 */}
                  <WaitPlayer playerId="player1" />
                </Grid>
                <Grid item xs>
                  {/* 대기 플레이어 2 */}
                  <WaitPlayer playerId="player2" />
                </Grid>
                <Grid item xs>
                  {/* 대기 플레이어 3 */}
                  <WaitPlayer playerId="player3" />
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
