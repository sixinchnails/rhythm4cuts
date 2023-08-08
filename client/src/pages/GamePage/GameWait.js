/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, Link as MuiLink } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleReady, setSession, setConnectionToken } from "../../store";
import { getCookie } from "../../utils/cookie";
import { userInfo } from "../../apis/userInfo";
import Header from "../../components/Game/Header_light";
import Next from "../../components/Game/NextToPlay";
import axios from "axios";
import UserVideo from "../../components/Game/UserVideo";
import { createConnection } from "../../openvidu/connectionInitialization";

function GameWait() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { gameSeq } = useParams(); // URL에서 가져와

  const session = useSelector((state) => state.roomState.session);
  const connectionToken = useSelector(
    (state) => state.roomState.connectionToken
  );

  // -----------------------------------------------------------------------------------------------------------------
  const handleToggleReady = (playerId) => {
    dispatch(toggleReady(playerId)); // Redux의 toggleReady 액션을 호출하여 플레이어의 준비 상태를 변경합니다.
  };
  const isReady = useSelector((state) => state.GameWait_Ready); // Redux의 상태에서 플레이어의 준비 상태를 가져옵니다.
  // -----------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    userInfo()
      .then((res) => {
        if (res.status !== 200) {
          window.alert("로그인을 해주세요!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("유저 정보 불러오기 실패:", error);
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
    fetchSession();
  }, [gameSeq]);

  // 방 세션 ID 가져오기
  const fetchSession = async () => {
    try {
      const access = getCookie("access");
      const response = await axios.get(
        "https://i9b109.p.ssafy.io:8443/wait/info/" + gameSeq,
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      dispatch(setSession(response.data.data.sessionId));
    } catch (error) {
      console.error("DB에서 세션 id 불러오기 실패:", error);
    }
  };

  // 연결 유저 토큰 만들기
  const fetchConnectionToken = async () => {
    try {
      await createConnection();
    } catch (error) {
      console.error("연결 토큰을 가져오는데 실패하였습니다:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchConnectionToken();
    }
  }, [session]);

  console.log("게임 시퀀스입니다 : " + gameSeq);
  console.log("세션입니다 : " + session);
  console.log("연결 토큰입니다 : " + connectionToken);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/Game_Waiting.jpg')",
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
                  대기중 비디오
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
                  <Button
                    variant={isReady.player1 ? "warning" : "success"}
                    // onClick={() => handleToggleReady("player")}
                    className="mb-2"
                  >
                    {isReady.player1 ? "Ready" : "준비하자!"}
                    {/* 플레이어 1의 준비 상태에 따라 준비 버튼의 텍스트를 변경합니다. */}
                  </Button>
                  <MuiLink to="/GameList" component={Link}>
                    <Button variant="contained" color="secondary">
                      GameList Page
                    </Button>
                  </MuiLink>
                </div>
              </Grid>
              {/* Bottom */}
              <Grid container style={{ height: "100%" }}>
                <Grid item xs={12} style={{ height: "25%" }}>
                  <UserVideo />
                </Grid>

                <Grid item xs={12} style={{ height: "25%" }}>
                  {/* <UserVideo roomSession={token} streamId={player2_token} /> */}
                </Grid>

                <Grid item xs={12} style={{ height: "25%" }}>
                  {/* <UserVideo roomSession={token} streamId={player3_token} /> */}
                </Grid>

                <Grid item xs={12} style={{ height: "25%" }}>
                  {/* <UserVideo roomSession={token} streamId={player4_token} /> */}
                </Grid>
              </Grid>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default GameWait;
