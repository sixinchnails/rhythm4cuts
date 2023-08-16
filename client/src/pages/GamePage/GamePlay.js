/* eslint-disable */
import {
  Chat as ChatIcon,
  Check as CheckIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
  styled,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { fetchToken, closeSession, setSession } from "../../store"; // 추가된 액션 import
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserVideo from "../../components/Game/UserVideo";
import Header from "../../components/Game/HeaderPlay";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

var sock = new SockJS("https://i9b109.p.ssafy.io:8443/stomp/chat");
var stomp = Stomp.over(sock);

function GamePlay() {
  const { gameSeq } = useParams(); // 여기서 gameSeq를 가져옴
  const navigate = useNavigate(); // 페이지 이동
  const dispatch = useDispatch(); // 리덕스 넣기
  const session = useSelector((state) => state.roomState.session);
  const connectionToken = useSelector(
    (state) => state.roomState.connectionToken
  );
  const { connectWebSocket, sendGameStartMessage } = useWebSocket();

  useEffect(() => {
    stomp.connect({}, () => {
      // 특정 토픽 구독
      stomp.subscribe(`/subscribe/song/${gameSeq}`, (message) => {
        console.log("video start");
        setVideoVisible(true);
      });
    });
    // 컴포넌트 unmount 시 웹소켓 연결 해제 및 구독 해제
    return () => {
      if (stomp.connected) {
        stomp.unsubscribe(`/subscribe/song/${gameSeq}`);
        stomp.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // connectWebSocket(gameSeq);
  }, [gameSeq]);

  console.log("GameSeq: " + gameSeq);
  console.log("play session: " + session);
  console.log("connectionToken: " + connectionToken);

  // 해당 노래 영상 가져오기
  const [songSeq, setSongSeq] = useState(117);
  const [musicUrl, setMusicUrl] = useState("");

  const bringUrl = async () => {
    const headers = {
      Authorization: "Bearer " + getCookie("access"),
    };
    const result = await axios.get(
      `https://i9b109.p.ssafy.io:8443/music/play/${songSeq}`,
      {
        headers,
      }
    );
    console.log(result.data.data.url);
    setMusicUrl(result.data.data.url);
  };

  useEffect(() => {
    bringUrl();
  }, []);

  // 버튼 클릭 시, 3초 후 노래 재생
  const [videoVisible, setVideoVisible] = useState(false);

  const handleButtonClick = () => {
    console.log("게임 시작 버튼 누름");
    if (stomp.connected) {
      console.log("연결 후 자동 재생 요청");
      const message = {
        gameSeq: gameSeq,
        // 필요한 경우 여기에 다른 데이터 추가
      };
      stomp.send("/public/song", {}, JSON.stringify(message));
    }
  };

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

      {/* Top */}
      <Grid container>
        <Grid container alignItems="center" justifyContent="center">
          <Card
            style={{
              width: "65vw",
              height: "55vh",
              background: "transparent",
              borderRadius: "30px",
            }}
          >
            <button onClick={handleButtonClick}>Music Start</button>
            {videoVisible && (
              <video
                controls={false}
                autoPlay
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={musicUrl}
                type="video/mp4"
              ></video>
            )}
          </Card>
        </Grid>

        {/* Bottom */}
        <Grid
          style={{
            height: "20vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "50px",
          }}
        >
          {/* Player 1 */}
          <Grid
            item
            xs={2}
            style={{
              backgroundColor: "black",
              height: "20vh",
              border: "2px solid white",
              padding: "2px",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <UserVideo roomSession={session} userToken={connectionToken} />
          </Grid>
          <Grid item xs={1} style={{ height: "20vh" }}>
            <div
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "20px",
                color: "white",
                padding: "5px",
              }}
            >
              첫번째 선수
            </div>
          </Grid>
          {/* Player 2 */}
          <Grid
            item
            xs={2}
            style={{
              backgroundColor: "black",
              height: "20vh",
              border: "2px solid white",
              padding: "2px",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <UserVideo />
          </Grid>
          <Grid item xs={1} style={{ height: "20vh" }}>
            <div
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "20px",
                color: "white",
                padding: "5px",
              }}
            >
              두번째 선수
            </div>
          </Grid>
          {/* Player 3 */}
          <Grid
            item
            xs={2}
            style={{
              backgroundColor: "black",
              height: "20vh",
              border: "2px solid white",
              padding: "2px",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <UserVideo />
          </Grid>
          <Grid item xs={1} style={{ height: "20vh" }}>
            <div
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "20px",
                color: "white",
                padding: "5px",
              }}
            >
              세번째 선수
            </div>
          </Grid>
          {/* Player 4 */}
          <Grid
            item
            xs={2}
            style={{
              backgroundColor: "black",
              height: "20vh",
              border: "2px solid white",
              padding: "2px",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <UserVideo />
          </Grid>
          <Grid item xs={1} style={{ height: "20vh" }}>
            <div
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "20px",
                color: "white",
                padding: "5px",
              }}
            >
              네번째 선수
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default GamePlay;
