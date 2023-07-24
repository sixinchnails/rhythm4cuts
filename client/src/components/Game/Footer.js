import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

function Footer() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      navigate("/GameShot");
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [seconds, navigate]);

  return (
    <Container bg="transparent" style={{ padding: "10px" }}>
      <Row>
        <Col className="d-flex justify-content-end">
          <h4>{seconds}초 후 사진 촬영 화면으로 넘어갑니다. </h4>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="primary" onClick={() => navigate("/")}>
            나가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
