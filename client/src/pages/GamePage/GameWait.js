/* eslint-disable */
import {
  setSession as userSession,
  setConnection,
  setConnectionToken,
  resetRoomState,
  setPlayers,
  setGameseq,
} from "../../store";
import {
  Chat as ChatIcon,
  Check as CheckIcon,
  ExitToApp as ExitToAppIcon,
  PersonAdd as PersonAddIcon,
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
import { createConnection } from "../../openvidu/connectionInitialization";
import UserVideoComponent from "../../components/Game/UserVideoComponent";
import React, { Component, useState, useEffect } from "react";
import LoginAlert from "../../components/Common/LoginAlert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Game/HeaderPlay";
import Next from "../../components/Game/NextToPlay";
import { getCookie } from "../../utils/cookie";
import { userInfo } from "../../apis/userInfo";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";

function GameWait() {

  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const dispatch = useDispatch(); // 리덕스 업데이트
  const navigate = useNavigate(); // 페이지 이동
  const [nickname, setNickname] = useState(undefined);

  var { gameSeq } = useParams(); // url에서 추출

  dispatch(setGameseq(gameSeq));
  // const gameSeq = useSelector(state => state.roomState.gameseq);

  const session = useSelector(state => state.roomState.session);

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [connectSession, setConnectSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  // 통합
  const [players, setPlayers] = useState([]);

  // 로그인 상태를 업데이트하는 함수
  const handleOpenLoginAlert = () => {
    setLoginAlertOpen(true);
  };
  const handleCloseLoginAlert = () => {
    setLoginAlertOpen(false);
    navigate("/Login");
  };

  const { connectWebSocket } = useWebSocket(); // 웹소켓 연결 함수 가져오기

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

  const handleAddFriend = () => {
    // 친구 추가 로직을 여기에 작성
    console.log("친구 추가 버튼 클릭!");
  };

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

  const data = userInfo;
  console.log("1이야 : " + data);
  console.log("2이야 : " + data.data);

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
  }, [gameSeq]);


  // 페이지 떠날 때 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  const onBeforeUnload = () => {
    leaveSession();
  };

  // const leaveSession = () => {
  //   if (connectSession) {
  //     connectSession.disconnect();
  //   }

  //   // setConnectSession(undefined);
  //   // setSubscribers([]);
  //   // setMySessionId("SessionA");
  //   // setMyUserName('Participant' + Math.floor(Math.random() * 100));
  //   // setMainStreamManager(undefined);
  //   // setPublisher(undefined);
  // };

  // ------------------------------------------------------------------------------------------------------------------
  let MAX_PLAYERS = 40; // 4

  useEffect(() => {
    if (players.length >= MAX_PLAYERS) {
      window.alert("잘못된 접근 경로입니다.");
      navigate("/");
    } else {
      const joinSessionTimeout = setTimeout(() => {
        joinSession();
      }, 3000);

      return () => clearTimeout(joinSessionTimeout);
    }
  }, []);

  // players 배열의 길이가 항상 4로 유지되도록 조절

  const joinSession = async () => {
    try {
      fetchNickname();

      const ov = new OpenVidu();
      const newSession = ov.initSession();
      setConnectSession(newSession);

      newSession.on("streamCreated", event => {
        // 인원 수 제한 : subscribers.length = 방장을 제외한 수
        const subscriber = newSession.subscribe(event.stream, undefined);
        setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);

        setPlayers(prevPlayers => [...prevPlayers, subscriber]); // 플레이어 스트림 추가

        if (!mainStreamManager) {
          setMainStreamManager(subscriber);
        }
      });

      newSession.on("streamDestroyed", event => {
        deleteSubscriber(event.stream.streamManager);
      });

      newSession.on("exception", exception => {
        console.warn(exception);
      });

      const token = await getToken(); // Implement getToken function

      newSession
        .connect(token, { clientData: myUserName })
        .then(async () => {
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

          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);

          if (players.length === 0) {
            setPlayers(prevPlayers => [...prevPlayers, newPublisher]); // 플레이어 스트림 추가 // 맨 처음 등록
          }
        })
        .catch(error => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    } catch (error) {
      console.error("Error joining session:", error);
    }
  };
  console.log("방 인원수 : " + players.length);
  // ------------------------------------------------------------------------------------------------------------------

  // "게임 준비" 버튼을 클릭했을 때 동작
  function handleGameReady() {
    dispatch(userSession(session));
    dispatch(setConnection(connection));
    navigate(`/GamePlay/${gameSeq}`);
  }

  // "채팅" 버튼을 클릭했을 때 동작
  const handleChat = () => { };

  // "나가기" 버튼 눌렀을 때 동작
  const handleExit = () => {
    // axios 인원 수 줄이기
    onBeforeUnload();
    console.log("방 나갈거야 ~");
    navigate(`/GameList`);
  };

  // 유저 닉네임 가져오기 : 리덕스 저장 => 나중에 로그인 페이지에서 처리
  async function fetchNickname() {
    try {
      const email = getCookie("email");
      const access = getCookie("access");
      const response = await axios.get(
        "https://i9b109.p.ssafy.io:8443/member/info?email=" + email,
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      setNickname(response.data.nickname);
    } catch (error) {
      console.log("유저 닉네임 불러오기 실패");
    }
  }

  // 방 세션 발급
  async function getToken() {
    let res = await fetchConnectionToken();
    return res["connectionToken"];
  }

  // 유저 토큰 발급
  async function fetchConnectionToken() {
    try {
      await fetchSession();

      return await createConnection();
    } catch (error) {
      console.error("연결 토큰을 가져오는데 실패하였습니다:", error);
    }
  }

  // 유저 커넥션 발급
  async function fetchSession() {
    try {
      const access = getCookie("access");

      const response = await axios.get(
        `https://i9b109.p.ssafy.io:8443/wait/info/${gameSeq}`,
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      console.log("-----------------" + response.data.data.sessionId);
      dispatch(userSession(response.data.data.sessionId));
    } catch (error) {
      console.error("DB에서 세션 id 불러오기 실패:", error);
    }
  }

  function InviteFriend() {
    var request = {
      fromUser: fromUser,
      toUser: toUser,
      // roomNumber :
    };
    if (stomp.connected) {
      stomp.send("/public/request", {}, JSON.stringify(request));
    }
  }

  const leaveSession = () => {
    console.log("--------------------leave session");
    if (connectSession) {
      connectSession.disconnect();
    }

    setConnectSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    // setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);

    useEffect(() => {
      if (!connectSession) {
        joinSession();
      }
    }, [connectSession]);
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
        {/* 멘트
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
        </Grid> */}

        {/* TOP */}
        <Grid container>
          {/* Top : LEFT */}
          <Grid
            item
            xs={8}
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

          {/* Top : RIGHT */}
          <Grid item
            xs={4} container
            alignItems="center"
            justifyContent="center">

              <Grid container spacing={2}>
                {/* 친구 초대 버튼 */}
                <Grid item xs={5} style={{margin:"1px"}}>
                  <StyledIconButton onClick={handleAddFriend} style={{ width:"12vw"}}>
                    <PersonAddIcon />
                    <Typography
                      style={{
                        fontFamily: "Pretendard-Regular",
                        fontSize: "20px",
                        padding: "15px",
                      }}
                    >
                      친구 초대
                    </Typography>
                  </StyledIconButton>
                </Grid>

                {/* "게임준비" 버튼 */}
                <Grid item xs={5} style={{margin:"1px"}}>
                  <StyledIconButton onClick={handleGameReady} style={{ width:"12vw"}}>
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
                </Grid>

                {/* "채팅" 버튼 */}
                <Grid item xs={5} style={{margin:"1px"}}>
                  <StyledIconButton onClick={handleChat} style={{ width:"12vw"}} >
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
                </Grid>

                {/* "나가기" 버튼 */}
                <Grid item xs={5} style={{margin:"1px"}}>
                  <StyledIconButton onClick={handleExit} style={{ width:"12vw"}} >
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

          </Grid>

        </Grid>

        {/* Bottom */}
        <Grid
          style={{
            height: "25vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          {/* Player 1 */}
          <Grid
            item
            xs={3}
            style={{
              backgroundColor: "black",
              height: "25vh",
              padding: "2px",
              margin: "20px",
              border: "2px solid white",
              borderRadius: "20px",
            }}
          >
            {players[0] && (
              <UserVideoComponent
                streamManager={players[0]}
              // streamManager={publisher}
              // streamManager={subscribers[0]}
              // streamManager={mainStreamManager}
              />
            )}
          </Grid>
          {/* <Grid item xs={1} style={{ width: "20vw", height: "20vh" }}>
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
          </Grid> */}

          {/* Player 2 */}
          <Grid
            item
            xs={3}
            style={{
              backgroundColor: "black",
              height: "25vh",
              padding: "2px",
              margin: "20px",
              border: "2px solid white",
              borderRadius: "20px",
            }}
          >
            {players[1] && <UserVideoComponent streamManager={players[1]} />}
          </Grid>
          {/* <Grid item xs={1} style={{ width: "20vw", height: "20vh" }}>
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
          </Grid> */}

          {/* Player 3 */}
          <Grid
            item
            xs={3}
            style={{
              backgroundColor: "black",
              height: "25vh",
              padding: "2px",
              margin: "20px",
              border: "2px solid white",
              borderRadius: "20px",
            }}
          >
            {players[2] && <UserVideoComponent streamManager={players[2]} />}
          </Grid>
          {/* <Grid item xs={1} style={{ width: "20vw", height: "20vh" }}>
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
          </Grid> */}
          {/* Player 4 */}
          <Grid
            item
            xs={3}
            style={{
              backgroundColor: "black",
              height: "25vh",
              padding: "2px",
              margin: "20px",
              border: "2px solid white",
              borderRadius: "20px",
            }}
          >
            {players[3] && <UserVideoComponent streamManager={players[3]} />}
          </Grid>
          {/* <Grid item xs={1} style={{ width: "20vw", height: "20vh" }}>
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
          </Grid> */}
        </Grid>
      </Grid>

      {/* '로그인 경고' 모달 */}
      <LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />
    </div>
  );
}
export default GameWait;
