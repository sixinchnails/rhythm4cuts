import React from "react";
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
import { styled } from '@mui/system';
import Header from "../../components/Game/Header_dark";
import Next from "../../components/Game/NextToShot";
import { useSelector } from "react-redux";
import Podium from "../../components/Game/Podium";

const Root = styled('div')({
  width: "100%",
  height: "100vh",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url('/images/Game_Shot.png')", // 배경 이미지 URL
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
  let Result = useSelector(state => state.GameScore_Result);

  return (
    <Root>
      <Container>
        <Header />
        <Title variant="h3" style={{marginBottom: "3%"}}>Score Board</Title>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>순위</TableCell>
                    <TableCell align="right">NickName</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="right">Reward</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Result.map(result => (
                    <TableRow key={result.rank}>
                      <TableCell component="th" scope="row">
                        {result.rank}
                      </TableCell>
                      <TableCell align="right">{result.nickname}</TableCell>
                      <TableCell align="right">{result.score}</TableCell>
                      <TableCell align="right">{result.reward}</TableCell>
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
