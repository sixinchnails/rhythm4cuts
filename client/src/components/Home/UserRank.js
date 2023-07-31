import { Grid } from "@mui/material";
import React from "react";

function UserRank({ user }) {
  return (
    <Grid container textAlign="center">
      <Grid item xs={4}>
        <span>{user.rank}</span>
      </Grid>
      <Grid item xs={4}>
        <span>{user.nickName}</span>
      </Grid>
      <Grid item xs={4}>
        <span>{user.score}</span>
      </Grid>
    </Grid>
  );
}

export default UserRank;
