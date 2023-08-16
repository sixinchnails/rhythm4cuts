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
import {
  styled,
  Card,
  Grid,
  Typography,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { createConnection } from "../../openvidu/connectionInitialization";
import UserVideoComponent from "../../components/Game/UserVideoComponent";
import UserComponent from "../../components/Game/UserComponent";
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
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import UserInfo from "../../components/My/My_UserInfo";

function InviteFriendsModal({
  isOpen,
  onClose,
  friends,
  setToUser,
  InviteGame,
}) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          width: "300px",
          margin: "100px auto",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <h3>친구 초대하기</h3>
        <List>
          {friends.map(friend => (
            <ListItem key={friend.email}>
              <ListItemText
                primary={friend.nickname}
                secondary={friend.email}
              />
              <Button
                onClick={() => {
                  setToUser(friend.userSeq); // 친구 선택 시 toUser 상태 업데이트
                  console.log(friend.userSeq);
                  InviteGame(friend.userSeq);
                }}
              >
                초대
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </Modal>
  );
}

function GameWait() {
  const [stomp, setStomp] = useState(null); // stomp 객체 상태 추가

  useEffect(() => {
    if (!stomp) {
      // stomp 객체가 없을 때만 초기화
      const sock = new SockJS("https://i9b109.p.ssafy.io:8443/stomp/chat");
      const stompClient = Stomp.over(sock);

      stompClient.connect(
        {},
        function () {
          console.log("게임 페이지 안 웹소켓 연결.");
          stompClient.subscribe(`/subscribe/song/${gameSeq}`, message => {
            console.log("video start");
            setGameStarted(true);
          });
          console.log(userSeq);
          if (userSeq) {
            stompClient.subscribe(
              `/subscribe/friend/invite/${userSeq}`,
              () => {}
            );
          }
        },
        error => {
          console.log("STOMP 연결 실패:", error);
        }
      );

      setStomp(stompClient); // stomp 객체를 상태에 저장
    }
  }, [stomp]);

  const location = useLocation();
  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const dispatch = useDispatch(); // 리덕스 업데이트
  const navigate = useNavigate(); // 페이지 이동
  const [userSeq, setUserSeq] = useState("");
  const [toUser, setToUser] = useState("");
  const [songSeq, setSongSeq] = useState(0);

  {
    console.log(songSeq);
  }

  var { gameSeq } = useParams(); // url에서 추출

  dispatch(setGameseq(gameSeq));

  const session = useSelector(state => state.roomState.session);

  // const [myUserName, setMyUserName] = useState(undefined);
  const [connectSession, setConnectSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 방장
  const [publisher, setPublisher] = useState(undefined); // 자신
  const [subscribers, setSubscribers] = useState([]); // 구독자
  const [players, setPlayers] = useState([]); // 통합
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 여부 상태
  const access = getCookie("access");
  const [musicUrl, setMusicUrl] = useState(""); // 해당 노래 url

  const [playerFix, setPlayerFix] = useState([]); // 배열 순서 고정

  // 상태 추가
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  // 친구 초대 모달 열기
  const handleOpenInviteModal = async () => {
    const friendList = await fetchFriendList(userSeq);
    setFriends(friendList);
    setInviteModalOpen(true);
  };

  // 친구 초대 모달 닫기
  const handleCloseInviteModal = () => {
    setInviteModalOpen(false);
  };

  // 로그인 상태를 업데이트하는 함수
  const handleOpenLoginAlert = () => {
    setLoginAlertOpen(true);
  };
  const handleCloseLoginAlert = () => {
    setLoginAlertOpen(false);
    navigate("/Login");
  };

  //친구 목록 가져오는 함수
  const fetchFriendList = async userSeq => {
    const headers = {
      Authorization: "Bearer " + getCookie("access"),
    };

    const response = await axios.get(
      `https://i9b109.p.ssafy.io:8443/friend/list/${userSeq}`,
      { headers }
    );
    return response.data.data;
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

  // useEffect(() => {
  //   console.log("useeffect.");
  //   console.log("stomp object:", stomp);
  //   stomp.connect(
  //     {},
  //     () => {
  //       console.log("게임 페이지 안 웹소캣 연결.");
  //       if (userSeq) {
  //         stomp.subscribe(`/subscribe/friend/invite/${userSeq}`, () => {
  //           alert("게임 초대 요청 옴");
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.log("STOMP 연결 실패:", error);
  //     }
  //   );
  // }, [userSeq]);

  function InviteGame(toUserValue) {
    var request = {
      fromUser: userSeq,
      toUser: toUserValue,
      gameSeq: gameSeq,
    };
    if (stomp.connected) {
      stomp.send("/public/invite", {}, JSON.stringify(request));
    }
  }

  useEffect(() => {
    axios
      .get("https://i9b109.p.ssafy.io:8443/member/info", {
        params: {
          email: getCookie("email"),
        },
        headers: {
          Authorization: `Bearer ${getCookie("access")}`,
        },
      })
      .then(res => {
        const param = {
          userSeq: String(res.data.user_seq),
          gameSeq: String(gameSeq),
        };
        console.log("체크하자 1 " + param.userSeq);
        console.log("체크하자 2 " + param.gameSeq);

        return axios.post("https://i9b109.p.ssafy.io:8443/wait/enter", param, {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("access")}`,
          },
        });
      })
      .then(postRes => {
        // 이곳에서 post 요청에 대한 응답 처리
        console.log("POST 요청 응답:", postRes);
      })
      .catch(error => {
        // 에러 처리
        console.error("에러 발생:", error);
      });
  }, []);

  // 로그인 상태관리
  useEffect(() => {
    connectWebSocket();
    userInfo()
      .then(res => {
        if (res.status === 200) {
          setUserSeq(res.data.user_seq);
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

      newSession.on("streamCreated", event => {
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
          setPlayers(prevPlayers => [...prevPlayers, newPublisher]);

          //--------------------------
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

  // "친구 초대" 버튼을 눌렀을 때 동작 ------------------------------------------------------------------------------
  const handleAddFriend = () => {
    console.log("친구 초대 버튼 클릭!");
    InviteFriend();
  };

  // "게임 준비" 버튼을 클릭했을 때 동작 -----------------------------------------------------------------------------
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
  // function handleGameReady() {
  //   setGameStarted(true);
  //   setPlayerFix([...players]); // player 배열 복사

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
  // }

  function handleGameReady() {
    console.log("게임 시작 버튼 누름");
    console.log(stomp);
    // 게임 시작 메시지를 서버에 전송
    if (stomp && stomp.connected) {
      console.log("연결 후 자동 재생 요청");
      const message = {
        gameSeq: gameSeq,
        // 필요한 경우 여기에 다른 데이터 추가
      };
      stomp.send("/public/song", {}, JSON.stringify(message));
    }
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
    const updatedPlayers = players.filter(player => player !== publisher);
    setPlayers(updatedPlayers);

    // // 자신의 스트림 해제
    // if (typeof publisher.stream.dispose === "function") {
    //   publisher.stream.dispose();
    // }

    // 구독 중인 스트림 해제
    subscribers.forEach(subscriber => {
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
    axios
      .get(`https://i9b109.p.ssafy.io:8443/lobby/room/exit/` + gameSeq, {
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

    navigate("/GameList")
  };

  // 해당 노래 번호 가져오기
  const bringSongSeq = async () => {
    try {
      const response = await axios.get(
        `https://i9b109.p.ssafy.io:8443/wait/info/${gameSeq}`,
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      console.log(response.data.data.songSeq);
      setSongSeq(response.data.data.songSeq);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bringSongSeq();
  }, []);
  // //선택된 노래에 맞는 해당 영상 가져오기

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
  }, [songSeq]);

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
        {gameStarted ? (
          <Grid container alignItems="center" justifyContent="center">
            <Card
              style={{
                width: "55vw",
                height: "40vh",
                background: "transparent",
                borderRadius: "30px",
              }}
            >
              {/* 대기중 비디오 */}
              {gameStarted && (
                <video
                  src={musicUrl}
                  controls={false}
                  autoPlay
                  loop
                  style={{
                    width: "100%",
                    height: "40vh",
                    objectFit: "cover",
                  }}
                />
              )}
            </Card>
          </Grid>
        ) : (
          // 게임 시작 하기 전 춤추는 동영상 ----------------------------------------------------------------------
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
              <Grid container spacing={2}>
                {/* 친구 초대 버튼 */}
                {players.length !== 4 && (
                  <Grid item xs={5} style={{ margin: "1px" }}>
                    <StyledIconButton
                      onClick={() => {
                        handleOpenInviteModal();
                      }}
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
                {/* "게임 시작" 버튼 : 4명이 차면 뜬다!! */}
                {players.length === 4 ? (
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
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        )}
        {/* Bottom */}
        <Grid container>
          {gameStarted ? (
            // 게임시작 버튼 클릭 후 후 후! -------------------------------------------------------------------------------------
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
              {[0, 1, 2, 3].map(index => (
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
                  {players[index] ? (
                    <UserVideoComponent streamManager={players[index]} userSeq={userSeq} cnt = {players.length}/>
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
          ) : (
            // 게임시작 버튼 클릭 전 전 전! --------------------------------------------------------------------------------
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
              {[0, 1, 2, 3].map(index => (
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
                  {players[index] ? (
                    <UserComponent streamManager={players[index]} />
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
          )}
        </Grid>
      </Grid>

      {/* '로그인 경고' 모달 */}
      <LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />
      {/* 친구 초대 모달 추가 */}
      <InviteFriendsModal
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
        friends={friends}
        setToUser={setToUser}
        InviteGame={InviteGame}
      />
    </div>
  );
}
export default GameWait;
