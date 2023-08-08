/* eslint-disable */
import { styled, Button, Card, Container, Grid, Typography, IconButton } from "@mui/material";
import { createConnection } from '../../openvidu/connectionInitialization';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookie";
import { userInfo } from '../../apis/userInfo';
// import { setSession, resetRoomState } from "../../store";
import LoginAlert from '../../components/Common/LoginAlert';
import UserVideo from '../../components/Game/UserVideo';
import Header from "../../components/Game/HeaderPlay";
import Next from "../../components/Game/NextToPlay";
import axios from "axios";
import { Chat as ChatIcon, Check as CheckIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import UserVideoComponent from '../../components/Game/UserVideoComponent';
import {
  setSession as setSessionAction,
  setConnection,
  setConnectionToken,
  resetRoomState,
} from "../../store";
import { OpenVidu } from 'openvidu-browser';

// Styled 버튼
const StyledIconButton = styled(IconButton)({
  color: "white",
  margin: "20px",
  boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.8)",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#1976d2", // 마우스 오버 시 배경색 변경
  },
});

const userState = {
  sessionId:'session_id',
  userName:'name',
  session: undefined,
  mainStreammanager: undefined,
  publisher: undefined,
  subscribers: [],
}

const publisher = undefined;

function GameWait() {
  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { gameSeq } = useParams(); // URL에서 가져와


  const session = useSelector(state => state.roomState.session);
  const connection = useSelector(state => state.roomState.connection);
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
        "https://i9b109.p.ssafy.io:8443/wait/info/" + gameSeq,
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      dispatch(setSessionAction(response.data.data.sessionId));

    } catch (error) {
      console.error("DB에서 세션 id 불러오기 실패:", error);
    }
  };

  // 연결 유저 토큰 만들기 
  const fetchConnectionToken = async () => {
    try {
      if (session) { // session이 생성된 상태인지 확인
        const { connection, connectionToken } = await createConnection(session);
        dispatch(setConnection(connection));
        dispatch(setConnectionToken(connectionToken));
      }
    } catch (error) {
      console.error("연결 토큰을 가져오는데 실패하였습니다:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchConnectionToken();
    }
  }, [session])

  useEffect(()=>{
    console.log("use effect begin")
    const OV = new OpenVidu;
    userState.session = OV.initSession()
    const mySession = userState.session;
    mySession.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      let subscriber = mySession.subscribe(event.stream, undefined);
      let subscribers = userState.subscribers;
      subscribers.push(subscriber);

      // Update the state with the new subscribers
      userState.subscribers = subscribers;
    });
    mySession.connect(connectionToken, {clientData: 'a'})
    .then(async () => {
      publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video or not
      });
      console.log("publish success")
      mySession.publish(publisher);
  })
})

console.log("게임 시퀀스입니다 : " + gameSeq);
  console.log("세션입니다 : " + session);
  console.log("연결 세션id입니다: " + connection);
  console.log("연결 토큰입니다 : " + connectionToken);
 

  const handleGameReady = () => {
    // "게임 준비" 버튼을 클릭했을 때 동작하는 로직을 여기에 구현합니다.
  };

  const handleChat = () => {
    // "채팅" 버튼을 클릭했을 때 동작하는 로직을 여기에 구현합니다.
  };

  const handleExit = () => {
    dispatch(resetRoomState());
    navigate(`/GameList`);
  };

  // 임시 게임플레이 페이지 이동
  const handleGameStart = () => {
    navigate(`/GamePlay/${gameSeq}`);
  };

  const getUserConnectionData = () => {
    const nickname = gameSeq + "_" + connection;
    return JSON.stringify({ clientData: nickname });
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

      <Grid container>

        {/* 멘트 */}
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'center',
            zIndex: 1, // z-index를 1로 설정하여 비디오 위에 텍스트가 나타나도록
          }}
        >
          <StyledIconButton onClick={handleGameStart}>
            <Typography variant="h4" style={{ fontFamily: 'Pretendard-Regular', fontWeight: "bold", fontSize: "px", color: "red", marginBottom: "10px" }}>
              전원 준비가 되면 게임이 시작합니다 악!
            </Typography>
          </StyledIconButton>

        </Grid>

        {/* Top */}
        <Grid container >
          <Grid item xs={10} container alignItems="center" justifyContent="center" paddingLeft={"150px"}>
            <Card

              style={{
                width: "55vw",
                height: "50vh",
                background: "transparent",
                borderRadius: "30px",
              }}
            >
              {/* 대기중 비디오 */}
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
              
                <UserVideoComponent
              streamManager={publisher}
              connectionData={getUserConnectionData()}
            />
            </Card>


          </Grid>

          <Grid item xs={2} container direction="column" alignItems="center" justifyContent="center" style={{ paddingTop: "50px" }}>
            {/* "게임준비" 버튼 */}
            <StyledIconButton onClick={handleGameReady} style={{ width: "200px" }}>
              <CheckIcon />
              <Typography style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", padding: "20px" }}>게임 준비</Typography>
            </StyledIconButton>

            {/* "채팅" 버튼 */}
            <StyledIconButton onClick={handleChat} style={{ width: "200px" }}>
              <ChatIcon />
              <Typography style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", padding: "20px" }}>채팅</Typography>
            </StyledIconButton>

            {/* "나가기" 버튼 */}
            <StyledIconButton onClick={handleExit} style={{ width: "200px" }}>
              <ExitToAppIcon />
              <Typography style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", padding: "20px" }}>나가기</Typography>
            </StyledIconButton>


          </Grid>
        </Grid>

        {/* Bottom */}
        <Grid style={{ height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: "50px" }}>

          {/* Player 1 */}
          <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '2px solid white', padding: '2px', margin: '5px', borderRadius: "20px" }}>
          {userState.subscribers.map((sub, i) => (
                                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <span>{sub.id}</span>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
          </Grid>
          <Grid item xs={1} style={{ height: '20vh' }}>
            <div style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", color: "white", padding: "5px" }}>첫번째 선수</div>
          </Grid>
          {/* Player 2 */}
          <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '2px solid white', padding: '2px', margin: '5px', borderRadius: "20px" }}>
            {/* <UserVideo /> */}
          </Grid>
          <Grid item xs={1} style={{ height: '20vh' }}>
            <div style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", color: "white", padding: "5px" }}>두번째 선수</div>
          </Grid>
          {/* Player 3 */}
          <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '2px solid white', padding: '2px', margin: '5px', borderRadius: "20px" }}>
            <UserVideoComponent
              streamManager={{ session, connection, connectionToken }}
              connectionData={getUserConnectionData()}
            />

          </Grid>
          <Grid item xs={1} style={{ height: '20vh' }}>
            <div style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", color: "white", padding: "5px" }}>세번째 선수</div>
          </Grid>
          {/* Player 4 */}
          <Grid item xs={2} style={{ backgroundColor: "black", height: '20vh', border: '2px solid white', padding: '2px', margin: '5px', borderRadius: "20px" }}>
            {/* <UserVideo /> */}
          </Grid>
          <Grid item xs={1} style={{ height: '20vh' }}>
            <div style={{ fontFamily: 'Pretendard-Regular', fontSize: "20px", color: "white", padding: "5px" }}>네번째 선수</div>
          </Grid>

        </Grid>


      </Grid>

      {/* '로그인 경고' 모달 */}
      < LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />

    </div >
  );
}

export default GameWait;
