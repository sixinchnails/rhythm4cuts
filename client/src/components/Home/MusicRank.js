import { Grid } from "@mui/material";
import React from "react";

function MusicRank({ music }) {
  return (
    <Grid container textAlign="center">
      <Grid item xs={2}>
        <span>{music.rank}</span>
      </Grid>
      <Grid item xs={6}>
        <span>{music.title}</span>
      </Grid>
      <Grid item xs={4}>
        <span>{music.singer}</span>
      </Grid>
    </Grid>
  );
}

export default MusicRank;
