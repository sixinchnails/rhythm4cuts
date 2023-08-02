/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWebcamStream, fetchToken, closeSession } from "../../store"; // 추가된 액션 import
import { Container, Grid, Card, CardContent } from "@mui/material";
import Header from "../../components/Game/Header_light";
import PlayPlayer from "../../components/Game/PlayPlayer";
import Webcam from "../../components/Game/Webcam";
import NextToScore from "../../components/Game/NextToScore"; // 추가된 컴포넌트 import
import { useNavigate } from "react-router-dom";
import OpenVidu from "openvidu-browser";

function GamePlay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.session.token);
  const webcamStream = useSelector((state) => state.webcamStream);
  const sessionRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {

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

    // 컴포넌트 언마운트 시 세션 종료
    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        dispatch(closeSession({ sessionId: sessionRef.current.sessionId, connectionId: sessionRef.current.connection.connectionId }));
      }
    };
  }, [token, dispatch, webcamStream]);

  const handleWebcamStream = (stream) => {
    dispatch(setWebcamStream(stream));
  };

  // GameScore 페이지에서 GameShot 페이지로 넘어가는 함수
  const handleNextToGameShot = () => {
    // GameScore 페이지에서 필요한 작업 처리
    // GameShot 페이지로 이동
    navigate("/GameShot");
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
                {/* Webcam 컴포넌트에 웹캠 스트림 연결 */}
                <Webcam onWebcamStream={handleWebcamStream} />
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
