/* eslint-disable */
import { setSession as userSession, setGameseq } from "../../store";
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
import BoomAlert from "../../components/Common/BoomAlert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Game/HeaderPlay";
import { getCookie } from "../../utils/cookie";
import { userInfo } from "../../apis/userInfo";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

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
            const receivedMessage = JSON.parse(message.body);
            // 서버로부터 받은 메시지에 'START_GAME' 신호가 포함되어 있으면
            if (receivedMessage.action === "START_GAME") {
              console.log("video start");
              setGameStarted(true);
            }
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

  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람
  const [isBoomAlertOpen, setBoomAlertOpen] = useState(false); // 방 폭파 알람
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

  const [connectSession, setConnectSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 방장
  const [publisher, setPublisher] = useState(undefined); // 자신
  const [subscribers, setSubscribers] = useState([]); // 구독자
  const [players, setPlayers] = useState([]); // 통합
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 여부 상태
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  // 게임 시작 여부에 따른 녹음 시작/종료 처리
  useEffect(() => {
    // 게임이 시작되면 녹음 시작
    if (gameStarted && !isRecording) {
      startRecording();
    }
    // 게임이 종료되면 녹음 종료
    else if (!gameStarted && isRecording) {
      stopRecording();
    }
  }, [gameStarted]);

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(stream => {
        if (stream && stream instanceof MediaStream) {
          setStream(stream);
          setIsRecording(true);
          setAudioChunks([]);
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorderRef.current = mediaRecorder;

          // 녹음 데이터가 생성될 때마다 chunks 배열에 추가
          mediaRecorderRef.current.ondataavailable = e => {
            if (e.data.size > 0) {
              setAudioChunks(chunks => [...chunks, e.data]);
            }
          };

          // 녹음이 종료되면 호출되는 이벤트 핸들러
          mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            setAudioBlob(audioBlob);

            const formData = new FormData();
            formData.append("audio", audioBlob, "recorded-audio.wav");
            formData.append("gameSeq", gameSeq);
            formData.append("userSeq", userSeq);

            try {
              const response = await axios.post(
                "https://i9b109.p.ssafy.io:8443/upload/user/audio",
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("access")}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("Audio URL:", response.data);
            } catch (error) {
              console.error("Error saving audio:", error);
            }
          };

          // 녹음을 시작합니다.
          mediaRecorderRef.current.start();
        } else {
          console.error("Stream is not valid");
        }
      })
      .catch(error => {
        console.error("Error starting recording:", error);
      });
  };

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

  // 방 붕괴 상태를 업데이트하는 함수
  const handleOpenBoomAlert = () => {
    setBoomAlertOpen(true);
  };
  const handleCloseBoomAlert = () => {
    setBoomAlertOpen(false);
    connectSession.disconnect();
    navigate("/GameList");
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

  // 친구 초대
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

  const stopRecording = () => {
    setIsRecording(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();

      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recorded-audio.wav");
      formData.append("gameSeq", gameSeq); // 게임 일련번호 추가
      formData.append("userSeq", userSeq); // 유저 일련번호 추가

      axios
        .post("https://i9b109.p.ssafy.io:8443/upload/user/audio", formData, {
          headers: {
            Authorization: `Bearer ${getCookie("access")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => {
          console.log("Audio URL:", response.data);
          // 응답으로 받은 오디오 URL 활용 가능
        })
        .catch(error => {
          console.error("Error saving audio:", error);
        });
    }
  };

  // 페이지 떠날 때 이벤트 리스너 등록 및 해제
  useEffect(() => {
    // beforeunload는 웹 브라우저에서 발생하는 이벤트 중 하나로, 사용자가 현재 페이지를 떠날 때 발생하는 이벤트
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  const onBeforeUnload = () => {
    stopRecording();
  };

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

      // 방 폭파 시키기
      newSession.on("streamDestroyed", event => {
        // deleteSubscriber(event.stream.streamManager);
        // 방 인원수 줄이는 요청 보내기
        axios
          .get(`https://i9b109.p.ssafy.io:8443/lobby/room/exit/` + gameSeq, {
            headers: {
              Authorization: "Bearer " + access,
            },
          })
          .then()
          .then(
            handleOpenBoomAlert()
            // navigate("/gameList")
          );
      });

      newSession.on("exception", exception => {
        console.warn(exception);
      });

      const token = await getToken(); // Implement getToken function
      const userData = await userInfo();

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

  function handleGameReady() {
    console.log("게임 시작 버튼 누름");
    console.log(stomp);
    // 게임 시작 메시지를 서버에 전송
    if (stomp && stomp.connected) {
      console.log("연결 후 자동 재생 요청");
      const message = {
        gameSeq: gameSeq,
        action: "START_GAME", // 게임 시작 신호를 표시하는 필드 추가
        // 필요한 경우 여기에 다른 데이터 추가
      };
      stomp.send("/public/song", {}, JSON.stringify(message));
    }
  }

  // "채팅" 버튼을 클릭했을 때 동작 ---------------------------------------------------------------------------------
  const handleChat = () => {};

  // "나가기" 버튼 눌렀을 때 동작 -----------------------------------------------------------------------------------
  const handleExit = () => {
    onBeforeUnload();
    console.log("방 나갈거야 ~");
  };

  // 방에서 나갈때 ㅣ 수정 필요
  const leaveSession = () => {
    console.log("--------------------leave session");

    // 나가는 플레이어를 배열에서 제거하고 상태 업데이트
    const updatedPlayers = players.filter(player => player !== publisher);
    setPlayers(updatedPlayers);

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
      .then(response => {})
      .catch(error => {
        console.error("Error:", error);
      });

    navigate("/GameList");
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

  // 가사 순서 변화 실행을 위한 코드 Start

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1); // 현재 인덱스 상태 추가

  const [timeRanges, setTimeRanges] = useState([]);

  useEffect(() => {
    bringTimeRanges();
  }, [musicUrl]);

  const bringTimeRanges = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + getCookie("access"),
      };
      const response = await axios.get(
        `https://i9b109.p.ssafy.io:8443/lyrics/${songSeq}`,
        { headers }
      );

      if (response.status === 200) {
        const data = response.data.data;
        const newTimeRanges = data.map(item => [
          item.startTime + 3,
          item.endTime + 3,
        ]);
        setTimeRanges(newTimeRanges);
        console.log(1);
      }
      console.log(timeRanges);
    } catch (error) {
      console.error("Error fetching time ranges:", error);
    }
  };

  const [content, setContent] = useState("1번의 차례입니다.");

  if (currentIndex % 4 === 0) {
    setContent("1번의 차례입니다.");
  } else if (currentIndex % 4 === 1) {
    setContent("2번의 차례입니다.");
  } else if (currentIndex % 4 === 2) {
    setContent("3번의 차례입니다.");
  } else if (currentIndex % 4 === 3) {
    setContent("4번의 차례입니다.");
  }

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
    startTimer();
    setCurrentIndex(0); // 처음 인덱스로 값을 초기화
  };

  const startTimer = () => {
    const timerInterval = 1000; // 1초마다 타이머 업데이트
    let currentTime = 0;

    const timer = setInterval(() => {
      currentTime += timerInterval / 1000; // 초 단위로 업데이트

      timeRanges.forEach(([startTime, endTime], index) => {
        if (currentTime >= startTime && currentTime <= endTime) {
          console.log(`Dynamic change at time ${currentTime}`);
          setCurrentIndex(index); // 현재 인덱스 업데이트
        }
      });

      if (currentTime >= timeRanges[timeRanges.length - 1][1]) {
        clearInterval(timer);
        setIsPlaying(false);
        setCurrentIndex(-1); // 인덱스 초기화
      }
    }, timerInterval);
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
            <div
              style={{
                width: "20vw",
                height: "5vh",
                marginLeft: "5%",
                backgroundColor: "none",
                color: "gray",
                fontWeight: "bolder",
              }}
            >
              {content}
            </div>
          </Grid>
        ) : (
          // 게임 시작 하기 전 춤추는 동영상 ----------------------------------------------------------------------
          <Grid container>
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
                    <UserVideoComponent
                      streamManager={players[index]}
                      userSeq={userSeq}
                      cnt={players.length}
                    />
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
      {/* '방 폭파 모달 */}
      <BoomAlert isOpen={isBoomAlertOpen} onClose={handleCloseBoomAlert} />

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
