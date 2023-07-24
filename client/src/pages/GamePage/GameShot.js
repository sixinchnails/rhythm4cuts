import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import Header from "../../components/Game/Header";
import Webcam from "../../components/Game/Webcam";

function GameShot() {
  const [seconds, setSeconds] = useState(5);
  const [captured, setCaptured] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const captureRef = useRef(null);

  // 나중에 서버에서 받아올거야.
  let frameImage = useSelector(state => state.frameImage);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          handleCapture();
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

  const user1Ref = useRef(null);
  const webcamRef = React.createRef();

  function handleCapture() {
    if (webcamRef.current && !captured) {
      const screenshot = webcamRef.current.getScreenshot(); // 웹캠 스크린샷을 얻습니다.

      if (screenshot) {
        const img = document.createElement("img");
        img.src = screenshot;
        img.style.objectFit = "cover"; // contain vs cover 골라보자
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.borderRadius = "5px";

        if (user1Ref.current) {
          while (user1Ref.current.firstChild) {
            user1Ref.current.firstChild.remove();
          }
          user1Ref.current.appendChild(img);
        }

        setCaptured(true);
      }
    }
  }

  function handlePrev() {
    setImageIndex(prevIndex =>
      prevIndex === 0 ? frameImage.length - 1 : prevIndex - 1
    );
  }

  function handleNext() {
    setImageIndex(prevIndex =>
      prevIndex === frameImage.length - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div
      style={{
        // width: "1920px",
        // height: "1080px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundImage: "url('/images/Game_Shot.png')", // 배경 이미지 URL
      }}>
      <Header />
      <Container style={{ maxWidth: "80%" }}>
        <Row>
          <Col>
            <div ref={captureRef}>
              <Container
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "800px",
                  height: "500px",
                  // backgroundColor: "#cfcfcf",
                  margin: "40px",
                }}>
                {/* 캠 컴포넌트 */}
                <Webcam ref={webcamRef} />
              </Container>
              <Row className="align-items-center mt-4">
                <Col>
                  <h4 className={captured ? "text-success" : "text-danger"}>
                    {captured
                      ? "촬영이 완료되었습니다."
                      : `${seconds}초 남았습니다~`}
                  </h4>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    onClick={handleCapture}
                    className={
                      captured ? "bg-info text-white" : "bg-primary text-white"
                    }>
                    {captured ? "촬영 완료" : "촬영"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>

          {/* 인생네컷 */}
          <Col>
            <Container
              style={{
                width: "250px",
                height: "600px",
                backgroundColor: "#cfcfcf",
                backgroundImage: `url(${frameImage[imageIndex]})`,
              }}
              className="d-flex flex-column justify-content-center">
              <Row>
                <Col>
                  <Card
                    // ref={user1Ref}
                    style={{
                      backgroundColor: "#f9f9f9",
                      height: "100px",
                      margin: "10px",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    style={{
                      backgroundColor: "#f9f9f9",
                      height: "100px",
                      margin: "10px",
                    }}>
                    User 2
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <div
                    style={{
                      backgroundColor: "#f9f9f9",
                      height: "100px",
                      margin: "10px",
                    }}>
                    User 3
                  </div>
                   */}
                  <Card
                    ref={user1Ref}
                    style={{
                      backgroundColor: "#f9f9f9",
                      height: "100px",
                      margin: "10px",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div
                    style={{
                      backgroundColor: "#f9f9f9",
                      height: "100px",
                      margin: "10px",
                    }}>
                    User 4
                  </div>
                </Col>
              </Row>
            </Container>

            <Container
              style={{
                width: "250px",
                padding: "20px",
              }}>
              {/* 인생네컷 배경 전환 */}
              <Row>
                <Col md={4} className="text-center">
                  <button onClick={handlePrev}>
                    <FaArrowLeft />
                  </button>
                </Col>
                <Col md={4} className="text-center">
                  <button>확인</button>
                </Col>
                <Col md={4} className="text-center">
                  <button onClick={handleNext}>
                    <FaArrowRight />
                  </button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GameShot;
