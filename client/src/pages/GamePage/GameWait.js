/* eslint-disable */
import {
  setSession as userSession,
  setConnection,
  setGameseq,
} from "../../store";
import {
  Chat as ChatIcon,
  Check as CheckIcon,
  ExitToApp as ExitToAppIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { styled, Card, Grid, Typography, IconButton } from "@mui/material";
import { createConnection } from "../../openvidu/connectionInitialization";
import UserVideoComponent from "../../components/Game/UserVideoComponent";
import React, { Component, useState, useEffect } from "react";
import LoginAlert from "../../components/Common/LoginAlert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Game/HeaderPlay";
import Next from "../../components/Game/NextToPlay";
import { getCookie } from "../../utils/cookie";
import { userInfo } from "../../apis/userInfo";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";

function GameWait() {
  const location = useLocation();
  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const dispatch = useDispatch(); // 리덕스 업데이트
  const navigate = useNavigate(); // 페이지 이동

  //GameList에서 전달받은 해당 방의 데이터
  const songSeq = location.state?.data;
  {
    console.log(songSeq);
  }

  var { gameSeq } = useParams(); // url에서 추출

  dispatch(setGameseq(gameSeq));

  const session = useSelector((state) => state.roomState.session);

  // const [myUserName, setMyUserName] = useState(undefined);
  const [connectSession, setConnectSession] = useState(undefined);

  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 방장
  const [publisher, setPublisher] = useState(undefined); // 자신
  const [subscribers, setSubscribers] = useState([]); // 구독자
  const [players, setPlayers] = useState([]); // 통합
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 여부 상태
  const access = getCookie("access");


  // 로그인 상태를 업데이트하는 함수
  const handleOpenLoginAlert = () => {
    setLoginAlertOpen(true);
  };
  const handleCloseLoginAlert = () => {
    setLoginAlertOpen(false);
    navigate("/Login");
  };

  const { connectWebSocket } = useWebSocket(); // 웹소켓 연결 함수 가져오기
  const [isSessionJoined, setSessionJoined] = useState(false); // 세션에 참여했는지 여부

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


  useEffect(() => {
    axios.get("https://i9b109.p.ssafy.io:8443/member/info", {
      params: {
        "email": getCookie("email"),
      },
      headers: {
        'Authorization': `Bearer ${getCookie("access")}`
      }
    })
      .then((res) => {
        const param = {
          "userSeq": String(res.data.user_seq),
          "gameSeq": String(gameSeq)
        };
        console.log("체크하자 1 " + param.userSeq);
        console.log("체크하자 2 " + param.gameSeq);

        return axios.post("https://i9b109.p.ssafy.io:8443/wait/enter", param, {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie("access")}`
          }
        });
      })
      .then((postRes) => {
        // 이곳에서 post 요청에 대한 응답 처리
        console.log("POST 요청 응답:", postRes);
      })
      .catch((error) => {
        // 에러 처리
        console.error("에러 발생:", error);
      });
  }, []);

  // 로그인 상태관리
  useEffect(() => {
    connectWebSocket();
    userInfo()
      .then((res) => {
        if (res.status === 200) {

        } else {
          // 로그인 상태가 아니라면 알림.
          handleOpenLoginAlert();

        }
      })
      .catch((error) => {
        // 오류가 발생하면 로그인 알림.
        handleOpenLoginAlert();
      });
  }, []);

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
  }, [gameSeq]);

  // 페이지 떠날 때 이벤트 리스너 등록 및 해제
  useEffect(() => {
    // beforeunload는 웹 브라우저에서 발생하는 이벤트 중 하나로, 사용자가 현재 페이지를 떠날 때 발생하는 이벤트
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  // 시작 -----------------------------------------------------------------------------------------------------
  // 유저 토큰 발급
  async function getToken() {
    let res = await fetchConnectionToken();
    return res["connectionToken"];
  }

  async function fetchConnectionToken() {
    try {
      await fetchSession();

      return await createConnection();
    } catch (error) {
      console.error("연결 토큰을 가져오는데 실패하였습니다:", error);
    }
  }



  // 방 세션 가져오기
  async function fetchSession() {
    try {
      // 방 인원수 Axios 1. 들어올때, 인원 수 추가하기 ( 4명 초과면 아웃! )
      try {
        await axios.get(
          `https://i9b109.p.ssafy.io:8443/lobby/room/${gameSeq}`,
          {
            headers: {
              Authorization: "Bearer " + access,
            },
          }
        );
      } catch (error) {
        window.alert(
          "방인원수가 초과되었습니다. 게임 리스트 페이지로 이동합니다. "
        );
        navigate(`/GameList`);
      }

      // 방 세션 DB에서 가져오기
      const response = await axios.get(
        `https://i9b109.p.ssafy.io:8443/wait/info/${gameSeq}`,
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );

      dispatch(userSession(response.data.data.sessionId));
    } catch (error) {
      console.error("DB에서 세션 id 불러오기 실패:", error);
    }
  }

  // ------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!isSessionJoined) {
      // 세션에 참여하지 않았을 때만 실행
      const joinSessionTimeout = setTimeout(() => {
        joinSession();
      }, 3000);

      return () => clearTimeout(joinSessionTimeout);
    }
  }, [isSessionJoined]);

  // --------------------------------------------------------------------------------------------------------------
  const joinSession = async () => {


    try {
      if (connectSession) {
        console.log("이미 세션에 참여한 경우 중복 호출 방지");
        return;
      }


      const ov = new OpenVidu();
      const newSession = ov.initSession();
      setConnectSession(newSession);

      newSession.on("streamCreated", (event) => {
        const subscriber = newSession.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

        setPlayers((prevPlayers) => [...prevPlayers, subscriber]); // 플레이어 스트림 추가

        if (!mainStreamManager) {
          setMainStreamManager(subscriber);
        }
      });

      newSession.on("streamDestroyed", (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      newSession.on("exception", (exception) => {
        console.warn(exception);
      });

      const token = await getToken(); // Implement getToken function
      const userData = await userInfo();
      // console.log("유저 데이터가 뭐냐 : " + userData.data.user_seq);

      newSession
        .connect(token, { clientData: userData })
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

          setPublisher(newPublisher);
          setMainStreamManager(newPublisher);
          setPlayers((prevPlayers) => [...prevPlayers, newPublisher]);

          //--------------------------
        })
        .catch((error) => {
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




  // "친구 초대" 버튼을 눌렀을 때 동작 ------------------------------------------------------------------------------
  const handleAddFriend = () => {
    console.log("친구 초대 버튼 클릭!");
    InviteFriend();
  };

  // 친구 초대
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

  // "게임 시작" 버튼을 클릭했을 때 동작 -----------------------------------------------------------------------------
  function handleGameReady() {
    setGameStarted(true);

    // axios 보내기
    // console.log("access : " + access);

    // axios.post(`https://i9b109.p.ssafy.io:8443/wait/enter`,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + access,
    //     }
    //   },
    //   {
    //     "gameSeq": gameSeq,
    //     "userSeq": userseq
    //   }
    // )

  }

  // "채팅" 버튼을 클릭했을 때 동작 ---------------------------------------------------------------------------------
  const handleChat = () => { };

  // "나가기" 버튼 눌렀을 때 동작 -----------------------------------------------------------------------------------
  const handleExit = () => {
    onBeforeUnload();
    console.log("방 나갈거야 ~");
  };

  const onBeforeUnload = () => {
    leaveSession();
  };

  // 방에서 나갈때 ㅣ 수정 필요
  const leaveSession = () => {
    console.log("--------------------leave session");

    // 나가는 플레이어를 배열에서 제거하고 상태 업데이트
    const updatedPlayers = players.filter((player) => player !== publisher);
    setPlayers(updatedPlayers);

    // // 자신의 스트림 해제
    // if (typeof publisher.stream.dispose === "function") {
    //   publisher.stream.dispose();
    // }

    // 구독 중인 스트림 해제
    subscribers.forEach((subscriber) => {
      if (typeof subscriber.unsubscribe === "function") {
        subscriber.unsubscribe(); // 구독자 해제
        if (subscriber.streamManager) {
          subscriber.streamManager.stream.dispose(); // streamManager에 있는 stream 해제
        }
      }
    });

    // 현재 유저 커넥션 연결 끊기
    if (connectSession) {
      connectSession.disconnect();
    }

    // 방 인원수 줄이는 요청 보내기
    axios.get(`https://i9b109.p.ssafy.io:8443/lobby/room/exit/` + gameSeq, {
      headers: {
        Authorization: "Bearer " + access,
      },
    })
      .then(response => {
        // navigate(`/GameList`)
      })
      .catch(error => {
        // Handle error if needed
        console.error("Error:", error);
      });


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
        {/* TOP : 게임 시작 전*/}
        {gameStarted ?
          <Grid
            container
            alignItems="center"
            justifyContent="center"
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
                src="/images/GameImage/WaitSong.mp4"
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
          : (
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
              <Grid
                item
                xs={4}
                container
                alignItems="center"
                justifyContent="center"
              >
                {gameStarted
                  ? null // 시작하면 버튼 다 사라져랏
                  : (
                    <Grid container spacing={2}>

                      {/* 친구 초대 버튼 */}
                      {players.length !== 4 && (
                        <Grid item xs={5} style={{ margin: "1px" }}>
                          <StyledIconButton
                            onClick={handleAddFriend}
                            style={{ width: "12vw" }}
                          >
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
                      )}
                      
                      {/* "나가기" 버튼 */}
                      {players.length !== 4 && (
                        <Grid item xs={5} style={{ margin: "1px" }}>
                          <StyledIconButton
                            onClick={handleExit}
                            style={{ width: "12vw" }}
                          >
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
                      )}

                      {/* "게임 시작" 버튼 */}
                      {players.length === 4
                        ? (
                          <Grid item xs={10} style={{ margin: "1px" }}>
                            <StyledIconButton
                              onClick={handleGameReady}
                              style={{ width: "30vw" }}
                            >
                              <CheckIcon />
                              <Typography
                                style={{
                                  fontFamily: "Pretendard-Regular",
                                  fontSize: "20px",
                                  padding: "15px",
                                }}
                              >
                                게임 시작
                              </Typography>
                            </StyledIconButton>
                          </Grid>
                        )
                        : null
                      }
                    </Grid>
                  )
                }
              </Grid>

            </Grid>
          )}

        {/* Bottom */}
        <Grid container>
          {/* Bottom */}
          <Grid
            style={{
              height: "25vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "50px",
            }}
          >
            {/* 각 플레이어별로 Grid 아이템 생성 */}
            {[0, 1, 2, 3].map((index) => (
              <Grid
                key={index}
                item
                xs={3}
                style={{
                  backgroundColor: "transparent",
                  height: "34vh",
                  padding: "2px",
                  margin: "20px",
                  borderRadius: "20px",
                }}
              >
                {/* players 배열에 해당 인덱스의 스트림이 있는 경우 플레이어 정보 표시 */}
                {players[index] ? (
                  <UserVideoComponent streamManager={players[index]} gameStarted={gameStarted} />
                ) : (
                  // 빈 자리 표시
                  <video
                    autoPlay
                    loop
                    muted
                    style={{
                      width: "80%", // 비디오 크기 조정
                      height: "80%", // 비디오 크기 조정
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  >
                    <source src="/videos/33.mp4" type="video/mp4" />
                  </video>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>


      </Grid>

      {/* '로그인 경고' 모달 */}
      <LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />
    </div>
  );
}
export default GameWait;
