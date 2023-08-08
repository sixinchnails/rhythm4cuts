import { Grid } from "@mui/material";
import React from "react";

function UserRank({ user }) {
  return (
    <Grid container textAlign="center" marginTop={"3px"}>
      <Grid item xs={2.25}>
        <span>{user.rank}</span>
      </Grid>
      <Grid item xs={7.5}>
        <span>{user.nickName}</span>
      </Grid>
      <Grid item xs={2.25}>
        <span>{user.score}</span>
      </Grid>
    </Grid>
  );
}

export default UserRank;
