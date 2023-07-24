import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Header from "../../components/Game/Header";
import Footer from "../../components/Game/Footer";
import { useSelector } from "react-redux";


function GameScore() {
  // 어떤 state를 쓸건지 확실하게 하자! return + 중괄호 생략가능
  let gameResults = useSelector(state => state.gameResults);

  return (
    <div
      style={{
        // width: "1920px",
        // height: "1080px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/Game_Shot.png')", // 배경 이미지 URL
      }}>
      <Header />
      <h2 style={{ textAlign: "center", marginBottom: "80px" }}>Score Board</h2>
      <Container style={{ maxWidth: "80%" }}>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}>
              {/* 2등 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#C0C0C0",
                  height: "300px",
                  width: "30%",
                  textAlign: "center",
                  transform: "perspective(500px) rotateY(20deg)",
                  boxShadow: "-20px 10px 5px grey",
                }}>
                <div style={{ width: "100%", height: "50%" }}>
                  <img
                    src={gameResults[1].imgSrc}
                    alt={gameResults[1].nickname}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img
                  src="/images/Silver.png"
                  alt="2nd place crown"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              {/* 1등 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#FFD700",
                  height: "400px",
                  width: "30%",
                  textAlign: "center",
                  transform: "perspective(500px) rotateY(20deg)",
                  boxShadow: "-20px 10px 5px grey",
                }}>
                <div style={{ width: "100%", height: "50%" }}>
                  <img
                    src={gameResults[0].imgSrc}
                    alt={gameResults[0].nickname}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img
                  src="/images/Gold.png"
                  alt="1nd place crown"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              {/* 3등 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#CD7F32",
                  height: "200px",
                  width: "30%",
                  textAlign: "center",
                  transform: "perspective(500px) rotateY(20deg)",
                  boxShadow: "-20px 10px 5px grey",
                }}>
                <div style={{ width: "100%", height: "50%" }}>
                  <img
                    src={gameResults[2].imgSrc}
                    alt={gameResults[2].nickname}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img
                  src="/images/Bronze.png"
                  alt="3nd place crown"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
          </Col>
          <Col>
            <Table style={{ height: "400px" }}>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>NickName</th>
                  <th>Score</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                {gameResults.map(result => (
                  <tr key={result.rank}>
                    <td>{result.rank}</td>
                    <td>{result.nickname}</td>
                    <td>{result.score}</td>
                    <td>{result.reward}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default GameScore;
