import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, Grid } from "@mui/material";

function NextToScore() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      navigate("/GameScore");
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [seconds, navigate]);

  return (
    <Container>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h6" style={{ color: "white" }}>
            게임이 끝났습니다. {seconds}초 후 랭킹 화면으로 넘어갑니다.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NextToScore;
