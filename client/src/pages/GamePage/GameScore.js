/* eslint-disable */
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInfo } from "../../apis/userInfo";
import { styled } from "@mui/system";
// import FlowerAnimation from "../../components/Game/FlowerAnimation";
import Header from "../../components/Game/Header_light";
import Podium from "../../components/Game/Podium";
import Next from "../../components/Game/NextToShot";
import "./GameScore.css";

const Root = styled("div")({
  width: "100%",
  height: "100vh",
  position: "relative", // 배경 이미지를 감싸는 레이아웃 컨테이너를 상대적으로 설정
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url('/images/Game_Shot.png')", // 배경 이미지 URL
  zIndex: 0, // 위치확인
});

const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: 2,
});

const PodiumContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

function GameScore() {
  const navigate = useNavigate();

  //로그인 상태 확인
  // const [isLogin, setIsLogin] = useState(false);

  // try {
  //   userInfo()
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res);
  //         setIsLogin(true);
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert("로그인을 해주세요!");
  //       navigate("/");
  //     });
  // } catch (error) {
  //   console.log(error);
  // }

  let Result = useSelector((state) => state.GameScore_Result);

  return (
    <Root>
      <Header />
      {/* <FlowerAnimation />{" "} */}
      {/* FlowerAnimation 컴포넌트를 Root 컴포넌트로 감싸줍니다 */}
      <Container>
        <Title
          color={"white"}
          fontWeight={"bolder"}
          variant="h3"
          style={{ marginBottom: "10%" }}
        >
          Score Board
        </Title>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <PodiumContainer>
              <Podium
                rank="Silver"
                src={Result[1].imgSrc}
                color="#C0C0C0"
                height="40vh"
                crownWidth="80%"
              />
              <Podium
                rank="Gold"
                src={Result[0].imgSrc}
                color="#FFD700"
                height="50vh"
                crownWidth="100%"
              />
              <Podium
                rank="Bronze"
                src={Result[2].imgSrc}
                color="#CD7F32"
                height="25vh"
                crownWidth="50%"
              />
            </PodiumContainer>
          </Grid>
          <Grid xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }} align="center">
                      순위
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="center">
                      NickName
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="center">
                      Score
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="center">
                      Reward
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Result.map((result) => (
                    <TableRow key={result.rank}>
                      <TableCell align="center" component="th" scope="row">
                        {result.rank}
                      </TableCell>
                      <TableCell align="center">{result.nickname}</TableCell>
                      <TableCell align="center">{result.score}</TableCell>
                      <TableCell align="center">{result.reward}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Next />
        </Grid>
      </Container>
    </Root>
  );
}

export default GameScore;
