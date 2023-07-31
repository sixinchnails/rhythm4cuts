import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Grid } from "@mui/material";

function NextToShot() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
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
    <Container>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h5">{seconds}초 후 사진 촬영 화면으로 넘어갑니다.</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            나가기
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NextToShot;
