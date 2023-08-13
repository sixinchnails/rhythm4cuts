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
import { async } from "q";
import { getCookie } from "../../utils/cookie";

// GameWait에서 받아오는 세션값이 다르면 접근제한.(예정)

function GamePlay(gameSeq) {
  const navigate = useNavigate(); // 페이지 이동
  const dispatch = useDispatch(); // 리덕스 넣기
  const session = useSelector((state) => state.roomState.session);
  const connectionToken = useSelector(
    (state) => state.roomState.connectionToken
  );

  console.log("GameSeq: " + gameSeq);
  console.log("play session: " + session);
  console.log("connectionToken: " + connectionToken);

  // 버튼 클릭 시, 3초 후 노래 재생
  const [videoVisible, setVideoVisible] = useState(false);

  const handleButtonClick = () => {
    setTimeout(() => {
      setVideoVisible(true);
    }, 3000);
  };

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
            {/* 대기중 비디오 (기존 영상) */}
            {/* <video
              src="/images/GameImage/Dance.mp4"
              autoPlay
              loop
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            /> */}
            {/* 대기중 비디오 (음악 영상) */}
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
