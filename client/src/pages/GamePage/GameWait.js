/* eslint-disable */
import { Button, Card, Container, Grid, Link as MuiLink, Typography } from "@mui/material";
import { createConnection } from '../../openvidu/connectionInitialization';
import { toggleReady, setSession, setConnectionToken } from "../../store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookie";
import { userInfo } from '../../apis/userInfo';
import LoginAlert from '../../components/Common/LoginAlert';
import UserVideo from '../../components/Game/UserVideo';
import Header from "../../components/Game/HeaderPlay";
import Next from "../../components/Game/NextToPlay";
import axios from "axios";

function GameWait() {
  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { gameSeq } = useParams(); // URL에서 가져와

  const session = useSelector(state => state.roomState.session);
  const connectionToken = useSelector(state => state.roomState.connectionToken);

  // -----------------------------------------------------------------------------------------------------------------

  // 로그인 상태를 업데이트하는 함수
  const handleOpenLoginAlert = () => {
    setLoginAlertOpen(true);
  };
  const handleCloseLoginAlert = () => {
    setLoginAlertOpen(false);
    navigate("/Login");
  };

  // 로그인 상태관리
  useEffect(() => {
    userInfo()
      .then(res => {
        if (res.status === 200) {
        } else {
          // 로그인 상태가 아니라면 알림.
          handleOpenLoginAlert();
        }
      })
      .catch(error => {
        // 오류가 발생하면 로그인 알림.
        handleOpenLoginAlert();
      });
  }, []);

  useEffect(() => {
    userInfo()
      .then(res => {
        if (res.status !== 200) {
          window.alert("로그인을 해주세요!");
          navigate("/");
        }
      })
      .catch(error => {
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
        "/wait/info/" + gameSeq,
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
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/GameImage/GameList.jpg')",
      }}
    >
      <Header />

      <Grid container>
        <Grid item xs={12}>

          <Container>
            {/* Top */}
            <Grid >
              <Card
                style={{
                  height: "50vh",
                  margin: "1%",
                  background: "transparent",
                }}
              >
                {/* 대기중 비디오 */}
                <video
                  src="/images/GameImage/Dance.mp4"
                  autoPlay
                  loop
                  style={{
                    width: "100%",
                    height: "50vh",
                    objectFit: "contain",
                  }}
                />
              </Card>
            </Grid>

            <Grid
              container
              style={{
                height: '35vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute', // 텍스트를 카드 내부에서 절대 위치로 설정
                top: 0, // 상단 위치를 필요에 따라 조정
                left: 0, // 좌측 위치를 필요에 따라 조정
                right: 0, // 우측 위치를 필요에 따라 조정
                bottom: 0, // 하단 위치를 필요에 따라 조정
                zIndex: 1, // z-index를 1로 설정하여 비디오 위에 텍스트가 나타나도록
              }}
            >
              <Typography variant="h5" style={{ fontFamily: 'Pretendard-Regular', fontWeight: "bold", fontSize: "px", color: "red" }}>
                전원 준비가 되면 게임이 시작합니다 악!
              </Typography>
            </Grid>

            {/* Bottom */}
            <Grid container style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

              <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '5px solid white', padding: '2px', margin: '5px' }}>
                <UserVideo />
              </Grid>

              <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '5px solid white', padding: '2px', margin: '5px' }}>
                <UserVideo />
              </Grid>

              <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '5px solid white', padding: '2px', margin: '5px' }}>
                <UserVideo />
              </Grid>

              <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '5px solid white', padding: '2px', margin: '5px' }}>
                <UserVideo />
              </Grid>

            </Grid>

          </Container>
        </Grid>
      </Grid>

      {/* '로그인 경고' 모달 */}
      <LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />

    </div >
  );
}

export default GameWait;
