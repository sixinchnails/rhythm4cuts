import {
  setSession as setRoomSession,
  setConnection as setUserConnection,
  setConnectionToken,
  resetRoomState,
  setGameseq,
} from "../../store";
import {
  Chat as ChatIcon,
  Check as CheckIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { styled, Card, Grid, Typography, IconButton } from "@mui/material";
import { createConnection } from "../../openvidu/connectionInitialization";
import UserVideoComponent from "../../components/Game/UserVideoComponent";
import React, { useState, useEffect } from "react";
import LoginAlert from "../../components/Common/LoginAlert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Game/HeaderPlay";
// import Next from "../../components/Game/NextToPlay";
import { getCookie } from "../../utils/cookie";
import { userInfo } from "../../apis/userInfo";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { setSession as setSessionAction, setConnection } from "../../store";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";

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

function GameWait() {
  const MAX_USERS = 4; // 최대 인원
  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const dispatch = useDispatch(); // 리덕스 업데이트
  const navigate = useNavigate(); // 페이지 이동

  const session = useSelector(state => state.roomState.session);
  const connection = useSelector(state => state.roomState.connection);

  const { connectWebSocket } = useWebSocket(); // 웹소켓 연결 함수 가져오기
  // const [mySessionId, setMySessionId] = useState('SessionA');
  // const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 방장?
  const [publisher, setPublisher] = useState(undefined); //  현재 사용자의 스트림을 관리
  const [subscribers, setSubscribers] = useState([]); // 현재 연결된 다른 사용자들의 스트림을 관리
  const [userStreams, setUserStreams] = useState([]); // 모든 사용자 스트림을 관리, subscribers 배열에 있는 스트림들을 모두 여기에 저장

  let { gameSeq } = useParams(); // url에서 추출
  dispatch(setGameseq(gameSeq)); // REDUX에 저장
  // 리덕스에서 데이터를 가져온다.
  const roomSession = useSelector(state => state.roomState.session);
  const userConnection = useSelector(state => state.roomState.connection);
  const connectionToken = useSelector(state => state.roomState.connectionToken);
  const myUserName = useSelector(state => state.roomState.nickname); // 닉네임

  console.log("리덕스에서 부르자마자 roomSession : " + roomSession);
  console.log("리덕스에서 부르자마자 userConnection : " + userConnection);
  console.log("리덕스에서 부르자마자 connectionToken : " + connectionToken);
  console.log("리덕스에서 부르자마자 myUserName : " + myUserName);

  // 로그인 상태를 업데이트하는 함수
  const handleOpenLoginAlert = () => {
    setLoginAlertOpen(true);
  };
  const handleCloseLoginAlert = () => {
    setLoginAlertOpen(false);
    navigate("/Login");
  };

  // Styled 버튼 ( css )
  const StyledIconButton = styled(IconButton)({
    color: "white",
    margin: "20px",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.8)",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#1976d2", // 마우스 오버 시 배경색 변경
    },
  });

  // 로그인 상태관리
  useEffect(() => {
    connectWebSocket();
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

  // 페이지 떠날 때 이벤트 리스너 등록 및 해제
  // useEffect(() => {
  //   window.addEventListener('beforeunload', onBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', onBeforeUnload);
  //   };
  // }, []);

  // 페이지 나갈 때 세션 나가기 함수 호출
  const onBeforeUnload = () => {
    leaveSession();
  };
  // 세션 나가기
  const leaveSession = () => {
    // userConnection.disconnect(); // 사용자의 연결을 끊습니다.
    setRoomSession(undefined); // 세션 초기화
    setSubscribers([]); // 구독자 목록을 초기화합니다.
    setMainStreamManager(undefined); // 방장 스트림 관리자를 초기화합니다.
    setPublisher(undefined); // 현재 사용자의 스트림 관리자를 초기화합니다.
  };

  // 방 세션 ID를 변경하는 역할
  // const handleChangeSessionId = (e) => {
  //   setMySessionId(e.target.value);
  // };

  // 유저네임 변경 역할
  // const handleChangeUserName = (e) => {
  //   setMyUserName(e.target.value);
  // };

  // function handleMainVideoStream(stream) {
  //   if (mainStreamManager !== stream) {
  //     setMainStreamManager(stream);
  //   }
  // };

  // 유저 제거
  // const deleteSubscriber = (streamManager) => {
  //     const newSubscribers = subscribers.filter(sub => sub !== streamManager);
  //     setSubscribers(newSubscribers);
  // };

  // 1. "게임 준비" 버튼을 클릭했을 때 동작
  const handleGameReady = () => {
    dispatch(setRoomSession(roomSession));
    dispatch(setUserConnection(userConnection));
    dispatch(setConnectionToken(connectionToken));

    // 게임플레이 페이지로 이동하고 gameSeq 매개변수를 전달.
    navigate(`/GamePlay/${gameSeq}`);
  };

  // 2. "채팅" 버튼을 클릭했을 때 동작
  const handleChat = () => {};

  // 3. "나가기" 버튼 눌렀을 때 동작
  const handleExit = () => {
    dispatch(resetRoomState());
    onBeforeUnload();
    navigate(`/GameList`);
    console.log("방 나갈거야 ~");
  };

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
      dispatch(setRoomSession(response.data.data.sessionId));
    } catch (error) {
      console.error("DB에서 세션 id 불러오기 실패:", error);
    }
  };

  // 토큰 만들기
  const fetchConnectionToken = async () => {
    try {
      await createConnection();
    } catch (error) {
      console.error("연결 토큰을 가져오는데 실패 :", error);
    }
  };

  // openvidu 연결
  const joinSession = async () => {
    try {
      // OpenVidu 인스턴스를 생성
      const ov = new OpenVidu();

      // OpenVidu 인스턴스를 사용하여 새로운 세션을 초기화 // 기존 방 세션은 변하지 않는다!!
      // initSession : 미디어 스트림을 전송하기 위한 컨테이너 역할
      const newSession = ov.initSession();

      // 새로운 스트림이 생성되었을 때의 이벤트 리스너를 등록
      newSession.on("streamCreated", event => {
        if (userStreams.length < MAX_USERS) {
          const subscriber = newSession.subscribe(event.stream, undefined);
          // setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
          setUserStreams(prevStreams => [...prevStreams, subscriber]);
        }
      });

      // 스트림이 파괴되었을 때의 이벤트 리스너를 등록
      // newSession.on('streamDestroyed', (event) => {
      //   deleteSubscriber(event.stream.streamManager);
      // });

      // 예외 상황이 발생했을 때의 이벤트 리스너를 등록
      // on(event, callback): 이벤트를 처리하는 리스너를 등록
      newSession.on("exception", exception => {
        console.warn("예외 상황 발생발생 : " + exception);
      });

      newSession
        .connect(connectionToken, { clientData: myUserName })
        .then(async () => {
          // initPublisherAsync(targetElement, properties): 로컬 사용자의 미디어 스트림을 생성하는 메서드
          const newPublisher = await ov.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          newSession.publish(newPublisher);

          const devices = await ov.getDevices();
          const videoDevices = devices.filter(
            device => device.kind === "videoinput"
          );
          const currentVideoDeviceId = newPublisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            device => device.deviceId === currentVideoDeviceId
          );

          // setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        })
        .catch(error => {
          console.log(
            "세션을 연결하는데 에러가 존재한다!! :",
            error.code,
            error.message
          );
        });
    } catch (error) {
      console.error("Error joining session:", error);
    }
  };

  // 최종 순서대로!
  useEffect(() => {
    fetchSession() // 방 세션 발급
      .then(() => fetchConnectionToken()) // 유저 토큰 발급
      .then(() => {
        joinSession(); // openvidu 연결
        console.log("동기 게임 시퀀스입니다 : " + gameSeq);
        console.log("동기 방 세션입니다 : " + roomSession);
        console.log("동기 연결 세션입니다: " + userConnection);
        console.log("동기 연결 토큰입니다 : " + connectionToken);
        setMainStreamManager(publisher);
      })
      .catch(error => {
        console.error("최종 연결을 실패했습니다 :", error);
      });
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

      <Grid container>
        {/* 멘트 */}
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            zIndex: 1, // z-index를 1로 설정하여 비디오 위에 텍스트가 나타나도록
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontFamily: "Pretendard-Regular",
              fontWeight: "bold",
              fontSize: "10px",
              color: "red",
            }}
          >
            전원 준비가 되면 게임이 시작합니다 악!
          </Typography>
        </Grid>

        {/* Top */}
        <Grid container>
          <Grid
            item
            xs={10}
            container
            alignItems="center"
            justifyContent="center"
            paddingLeft={"150px"}
          >
            <Card
              style={{
                width: "55vw",
                height: "40vh",
                background: "transparent",
                borderRadius: "30px",
              }}
            >
              {/* 대기중 비디오 */}
              <video
                src="/images/GameImage/Dance.mp4"
                autoPlay
                loop
                style={{
                  width: "100%",
                  height: "40vh",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>

          <Grid
            item
            xs={2}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ paddingTop: "40px" }}
          >
            {/* "게임준비" 버튼 */}
            <StyledIconButton
              onClick={handleGameReady}
              style={{ width: "70%" }}
            >
              <CheckIcon />
              <Typography
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "20px",
                  padding: "15px",
                }}
              >
                게임 준비
              </Typography>
            </StyledIconButton>

            {/* "채팅" 버튼 */}
            <StyledIconButton onClick={handleChat} style={{ width: "70%" }}>
              <ChatIcon />
              <Typography
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "20px",
                  padding: "15px",
                }}
              >
                채팅
              </Typography>
            </StyledIconButton>

            {/* "나가기" 버튼 */}
            <StyledIconButton onClick={handleExit} style={{ width: "70%" }}>
              <ExitToAppIcon />
              <Typography
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "20px",
                  padding: "15px",
                }}
              >
                나가기
              </Typography>
            </StyledIconButton>
          </Grid>
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
            {/* <UserVideoComponent
              streamManager={mainStreamManager}
            /> */}
            <UserVideoComponent streamManager={userStreams[0]} />
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
            <UserVideoComponent streamManager={userStreams[1]} />
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
            <UserVideoComponent streamManager={userStreams[2]} />
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
            <UserVideoComponent streamManager={userStreams[3]} />
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

      {/* '로그인 경고' 모달 */}
      <LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />
    </div>
  );
}

export default GameWait;
