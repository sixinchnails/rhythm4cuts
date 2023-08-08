import React from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Avatar,
  Button,
  Pagination,
  Grid,
  Box,
} from "@mui/material";
import { useState } from "react";

function FriendInfo() {
  const Info = useSelector(state => state.MyPage_Friend);

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const noOfPages = Math.ceil(Info.length / itemsPerPage);

  function getProfilePic(point) {
    if (point <= 2000) {
      return "/images/브론즈.png";
    } else if (point <= 4000) {
      return "/images/실버.png";
    } else if (point <= 6000) {
      return "/images/골드.png";
    } else if (point <= 8000) {
      return "/images/플레.png";
    } else {
      return "/images/다이아.png";
    }
  }

  function deleteFriend(params) {
    if (window.confirm("친구를 삭제하시겠습니까?")) {
      window.alert("삭제되었습니다.");
    }
  }

  return (
    <div
      style={{
        width: "80%", // 전체 컨테이너의 너비를 80%로 조정
        height: "100vh",
        marginLeft: "5%", // 마진을 조정하여 중앙에 위치하게 함
        marginRight: "5%",
      }}
    >
      <Grid container style={{ marginLeft: "10%" }}>
        <Grid item xs={12} padding={"20px"}>
          <Box display="flex" justifyContent="flex-end" marginBottom="1%"></Box>
          <Grid container spacing={3}>
            {Info.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(
              (item, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      width: "400px",
                    }}
                  >
                    <Avatar
                      src={getProfilePic(item.point)}
                      style={{ width: "80px", height: "80px", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <Typography variant="h6" style={{ color: "#ffffff" }}>
                        이름: {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{ color: "#ffffff" }}
                      >
                        포인트: {item.point}
                      </Typography>
                      <Typography variant="body2" style={{ color: "#ffffff" }}>
                        상태: {item.playing}
                      </Typography>
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={deleteFriend}
                      style={{ flexShrink: 0 }}
                    >
                      삭제
                    </Button>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>

          <Pagination
            count={noOfPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
            shape="rounded"
            sx={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}
          />
        </Grid>

        {/* Right: If you want to add something on the right side, like in GameList */}
        <Grid item xs={3} padding={"15px"}>
          {/* Content for the right side column */}
        </Grid>
      </Grid>
    </div>
  );
}

export default FriendInfo;
