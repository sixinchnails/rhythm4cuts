import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function GameWait() {
  let cardInfo = [
    { id: 1, title: "카드 제목 1", content: "카드 내용 1" },
    { id: 2, title: "카드 제목 2", content: "카드 내용 2" },
    { id: 3, title: "카드 제목 3", content: "카드 내용 3" },
    { id: 4, title: "카드 제목 4", content: "카드 내용 4" },
  ];

  return (
    <Container fluid>
      {/* 위 컨테이너 */}
      <Row style={{ height: "70vh", backgroundColor: "lightblue" }}>
        <Col>
          {/* 위 컨테이너의 내용 */}
          <Card.Img
          />
        </Col>
      </Row>

      {/* 아래 컨테이너 */}
      <Row style={{ height: "100%", backgroundColor: "lightgreen" }}>
        <Col>
          {/* 아래 컨테이너의 첫 번째 열 */}
          <Row>
            {cardInfo.map(card => (
              <Col
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  padding: "30px",
                }}
                key={card.id}>
                <CardComponent title={card.title} content={card.content} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={2}>
          {/* 아래 컨테이너의 두 번째 열 */}
          <h1>아래 컨테이너 - 두 번째 열</h1>
        </Col>
      </Row>
    </Container>
  );
}

function CardComponent() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://via.placeholder.com/150"
        alt="Sample Image"
      />
      <Card.Body>
        <Card.Title>카드 제목</Card.Title>
        <Card.Text>카드 내용을 여기에 작성하세요.</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GameWait;
