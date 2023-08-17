/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Button, Card, Grid, Typography, Container } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Game/HeaderPlay";
import { createSession } from "../../openvidu/sessionInitialization";
import { createConnection } from "../../openvidu/connectionInitialization";
import LoginAlert from "../../components/Common/LoginAlert";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import { useNavigate, useParams } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";
import axios from "axios";
import { getCookie } from "../../utils/cookie";

//close test
import { closeSession } from "../../store";
import UserVideoShot from "../../components/Game/UserVideoShot";
// import UserVideoComponent from "../../components/Game/UserVideoComponent";

const GameShot = () => {
  const [doState, setDoState] = useState(false);

  const dispatch = useDispatch();

  const handleTestClose = async () => {
    try {
      const sessionData = await createSession();
      const sessionId = sessionData.id;
      const connectionData = await createConnection(sessionId);
      const connectionId = connectionData.connectionId;
      console.log("버튼 클릭 전 세션 데이터:", sessionData);
      console.log("버튼 클릭 전 연결 데이터:", connectionData);

      // closeSession 액션을 호출하여 세션을 종료합니다.
      await dispatch(closeSession({ sessionId, connectionId }));

      // 세션/연결 종료 후 상태 확인
      console.log("세션 종료 후 상태:", sessionData);
      console.log("세션 종료 후 상태:", connectionData);

      // 세션 종료 후 5초 후에 상태를 다시 확인
      setTimeout(async () => {
        const newSessionData = await createSession();
        const newSessionId = newSessionData.id;
        const newConnectionData = await createConnection(newSessionId);
        console.log("5초 후 세션 데이터:", newSessionData);
        console.log("5초 후 연결 데이터:", newConnectionData);
      }, 5000);
    } catch (error) {
      // closeSession 액션이 실패한 경우 에러 처리
      console.error("세션 종료 실패:", error);
    }
  };

  // 캡처된 이미지를 저장하는 상태 변수
  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();

  const [userSeq, setUserSeq] = useState(0);
  //로그인 상태 확인
  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          setUserSeq(res.data.user_seq);
          console.log(userSeq);
        }
      })
      .catch((error) => {
        handleOpenLoginAlert();
      });
  } catch (error) {
    console.log(error);
  }
  const [isLoginAlertOpen, setLoginAlertOpen] = useState(false); // 로그인 알람

  // 로그인 상태를 업데이트하는 함수
  const handleOpenLoginAlert = () => {
    setLoginAlertOpen(true);
  };
  const handleCloseLoginAlert = () => {
    setLoginAlertOpen(false);
    navigate("/Login");
  };

  // 사진을 찍는 타이머를 설정하기 위한 상태 변수
  const [shotSeconds, setShotSeconds] = useState(10);

  // 프레임 고르는 타이머를 설정하기 위한 상태 변수
  const [frameSeconds, setFrameSeconds] = useState(5);

  // 캡처가 완료되었는지 여부를 확인하는 상태 변수
  const [captured, setCaptured] = useState(false);

  // Frame 이미지 배열에서 현재 선택된 이미지의 인덱스를 저장하는 상태 변수
  const [imageIndex, setImageIndex] = useState(0);

  // 웹캠 캡처를 위한 참조 변수
  const captureRef = useRef(null);

  // 유저 이미지를 표시할 Card 요소를 위한 참조 변수
  const user1Ref = useRef(null);

  // 웹캠 컴포넌트를 표시하는 Webcam 컴포넌트를 위한 참조 변수
  const webcamRef = useRef(null);

  // Frame 이미지 배열을 리덕스 상태로부터 가져옵니다.
  let frameImage = useSelector((state) => state.GameShot_frameImage);

  // Ref를 최상위 레벨로 이동하고, DOM 요소를 가리킬 수 있도록 설정합니다.
  const copyRef = useRef(null);

  // 웹캠으로부터 스크린샷을 찍어 이미지를 캡처하는 함수
  const handleCapture = useCallback(() => {
    if (webcamRef.current && !captured) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        // 이미지를 캡처하고 URL을 상태에 저장
        setCapturedImage(screenshot);

        // 캡처된 이미지를 user1Ref에 추가하여 표시
        const img = document.createElement("img");
        img.src = screenshot;
        img.style.objectFit = "cover";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.borderRadius = "5%";

        if (user1Ref.current) {
          // 캡처된 이미지를 user1Ref에 추가하여 표시합니다.
          while (user1Ref.current.firstChild) {
            user1Ref.current.firstChild.remove();
          }
          user1Ref.current.appendChild(img);
        }
        setCaptured(true);
        // copyCapture(copyRef.current); // 이건 4개 묶음 사진

        if (shotSeconds === 0) {
          // captureRef.current 요소를 이미지로 저장
          copyCapture(captureRef.current);
        }

        // 이미지 데이터를 파일로 다운로드
        const blob = dataURLtoBlob(screenshot);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "captured_image.png";
        link.click();
      }
    }
  }, [webcamRef, captured, shotSeconds]);
  useEffect(() => {
    if (shotSeconds === 0) {
      console.log(shotSeconds);
      // captureRef.current 요소를 이미지로 저장
      copyCapture(captureRef.current);
    }
  }, [shotSeconds]);
  // "captured" 상태가 변경될 때 메시지를 업데이트하는 useEffect 훅 추가
  // useEffect(() => {
  //   if (captured) {
  //     setShotSeconds(0); // "captured"가 true가 되면 "땡초 남았습니다~" 메시지를 강제로 "촬영이 완료되었습니다."로 변경합니다.
  //   }
  // }, [captured]);

  //  타이머를 설정하고 타이머가 끝나면 촬영 함수를 호출하거나 자동 촬영 함수를 호출합니다.
  useEffect(() => {
    const timerId = setInterval(() => {
      setShotSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          handleCapture();
          clearInterval(timerId); // 타이머를 종료합니다.
          setDoState(true);

          return prevSeconds;
        } else {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          return prevSeconds;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [handleCapture, captured]);

  //frame timer
  useEffect(() => {
    const timerId = setInterval(() => {
      setFrameSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          handleCapture();
          clearInterval(timerId); // 타이머를 종료합니다.
          setDoState(true);

          return prevSeconds;
        } else {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          return prevSeconds;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [handleCapture, captured]);

  // Frame 이미지 이전 버튼 핸들러
  const handlePrev = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? frameImage.length - 1 : prevIndex - 1
    );
  };

  // Frame 이미지 다음 버튼 핸들러
  const handleNext = () => {
    setImageIndex((prevIndex) =>
      prevIndex === frameImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [gameResults, setGameResults] = useState([]);
  var { gameSeq } = useParams(); // url에서 추출

  // 로그인 상태 확인
  useEffect(() => {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          // 로그인 상태일 때 axios로 데이터를 가져옴
          axios
            .get(`https://i9b109.p.ssafy.io:8443/wait/order/${gameSeq}`, {
              headers: {
                Authorization: "Bearer " + getCookie("access"),
              },
            })
            .then((response) => {
              // 가져온 데이터를 score 순서로 정렬하여 저장
              const sortedResults = response.data.sort(
                (a, b) => b.score - a.score
              );
              setGameResults(sortedResults);
            })
            .catch((error) => {
              console.error("Error fetching game results:", error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        handleOpenLoginAlert();
      });
  }, []);

  const [userRank, setUserRank] = useState(-1);

  useEffect(() => {
    gameResults.forEach((data, index) => {
      if (data.userSeq === userSeq) {
        setUserRank(index + 1);
        console.log(userRank);
      }
    });
    console.log(gameResults);
  }, [userSeq]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/Game_Shot.png')",
      }}
    >
      {/* 상단 헤더 */}
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <Grid container spacing={10}>
          {/* Webcam 영역 */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "90%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "black",
                  flex: "1 1 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "borderRadius",
                }}
              >
                {/* Webcam 컴포넌트를 표시합니다. */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "white",
                  }}
                  ref={captureRef}
                >
                  {/* 비디오 나오게! */}
                  <UserVideoShot time={shotSeconds} />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                {/* 촬영 버튼 */}
                {doState === true ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">
                      {shotSeconds === 0
                        ? "촬영이 완료되었습니다."
                        : `${shotSeconds}초 뒤에 촬영됩니다~ `}
                    </Typography>
                    <Button onClick={() => setShotSeconds(0)}>촬영</Button>
                  </div>
                ) : (
                  <Typography variant="h6">
                    {frameSeconds === 0
                      ? "프레임 선택이 완료되었습니다."
                      : `${frameSeconds}초 뒤에 프레임이 선택됩니다.`}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Frame 이미지 영역 */}
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                // copyRef를 캡처하려는 DOM 요소에 연결합니다.
                ref={copyRef}
                sx={{
                  height: "80%",
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "borderRadius",
                  backgroundImage: `url(${frameImage[imageIndex]})`,
                }}
              >
                {/* 유저 이미지를 표시하는 Card */}
                <Card
                  ref={user1Ref}
                  sx={{
                    backgroundImage: `url("/images/ShotEmpty.jfif")`,
                    height: "15vh",
                    margin: "5%",
                  }}
                >
                  User 1
                </Card>
                <Card
                  sx={{
                    backgroundImage: `url("/images/ShotEmpty.jfif")`,
                    height: "15vh",
                    margin: "5%",
                  }}
                >
                  User 2
                </Card>
                <Card
                  sx={{
                    backgroundImage: `url("/images/ShotEmpty.jfif")`,
                    height: "15vh",
                    margin: "5%",
                  }}
                >
                  User 3
                </Card>
                <Card
                  sx={{
                    backgroundImage: `url("/images/ShotEmpty.jfif")`,
                    height: "15vh",
                    margin: "5%",
                  }}
                >
                  User 4
                </Card>
              </Box>
              {/* 이미지 전환 버튼 */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Button variant="outlined" color="warning" onClick={handlePrev}>
                  <FaArrowLeft />
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => copyCapture(copyRef.current)}
                >
                  확인
                </Button>

                <Button variant="outlined" color="warning" onClick={handleNext}>
                  <FaArrowRight />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Button variant="contained" color="secondary" onClick={handleTestClose}>
          Test Close
        </Button> */}
      </Container>
      {/* '로그인 경고' 모달 */}
      <LoginAlert isOpen={isLoginAlertOpen} onClose={handleCloseLoginAlert} />
    </Box>
  );
};

// 인생네컷 저장 컴포넌트
// function copyCapture(element) {
//   if (element) {
//     domtoimage
//       .toPng(element)
//       .then(function (dataUrl) {
//         console.log(dataUrl);
//         const link = document.createElement("a");
//         link.download = "capture.png";
//         link.href = dataUrl;
//         link.click();
//       })
//       .catch(function (error) {
//         console.error("oops, something went wrong!", error);
//       });
//   }
// }

function copyCapture(element) {
  if (element) {
    domtoimage
      .toPng(element)
      .then(function (dataUrl) {
        console.log(dataUrl);
        const link = document.createElement("a");
        link.download = "capture.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
}

// 인생네컷 DB 전송 컴포넌트
function sendCapture(element) {
  if (element) {
    domtoimage.toPng(element).then((res) => {
      try {
        // const response = async axios.post
      } catch (error) {}
    });
  }
}

export default GameShot;
