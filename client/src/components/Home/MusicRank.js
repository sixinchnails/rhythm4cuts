import { Grid } from "@mui/material";
import React from "react";

function MusicRank({ music }) {
  return (
    <Grid container textAlign="center" marginTop={"7px"}>
      <Grid item xs={1}>
        <span>{music.ranking}</span>
      </Grid>
      <Grid item xs={7}>
        <span>{music.title}</span>
      </Grid>
      <Grid item xs={4}>
        <span>{music.singer}</span>
      </Grid>
    </Grid>
  );
}

export default MusicRank;
