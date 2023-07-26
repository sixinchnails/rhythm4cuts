import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

function RoomList({ room }) {
  let isFull = room.currentOccupancy >= room.maxOccupancy;

  return (
    <Grid item xs={6} sm={12}>
      <Card>
        <Grid container>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CardMedia
              component="img"
              image={room.image}
              style={{
                height: "80%",
                borderRadius: "10px",
                objectFit: "cover",
                padding: "3%",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    방 번호: {room.number} / 방 이름: {room.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: "2%",
                    }}>
                    🎵 {room.song}
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Box
                      style={{
                        border: "1px solid",
                        padding: "5px",
                        color: isFull ? "red" : "green",
                      }}>
                      <Typography variant="body2">
                        방 인원수: {room.currentOccupancy} / {room.maxOccupancy}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    {room.isSecret ? <LockIcon /> : <LockOpenIcon />}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default RoomList;
