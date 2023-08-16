import {
  Paper,
  Typography,
  Avatar,
  Button,
  Pagination,
  Grid,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { getCookie } from '../../utils/cookie';
import { userInfo } from '../../apis/userInfo';

function FriendInfo() {
  const [friendData, setFriendData] = useState([]); // 친구 데이터를 저장할 상태
  const [userSeq, setUserSeq] = useState(""); // 유저시퀀스

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const noOfPages = Math.ceil(friendData.length / itemsPerPage);

  useEffect(() => {
    userInfo()
      .then(res => {
        if (res.status === 200) {
          setUserSeq(res.data.user_seq);
        } else {
          console.log("MyFriend_친구 정보 오류")
        }
      })
  }, [])

  // Axios를 사용하여 친구 데이터를 가져옴
  useEffect(() => {
    axios.get(
      `https://i9b109.p.ssafy.io:8443/friend/list/` + userSeq,
      {
        headers: {
          Authorization: "Bearer " + getCookie("access"),
        },
      })
      .then((response) => {
        const fetchedData = response.data.data;
        setFriendData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching friend data:", error);
      });
  }, [userSeq]);

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

  function deleteFriend(toUserSeq) {
    if (window.confirm("친구를 삭제하시겠습니까?")) {
      axios.delete(
        `https://i9b109.p.ssafy.io:8443/friend/del/${userSeq}/${toUserSeq}`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("access"),
          },
        }
      )
        .then(() => {
          // 삭제 성공 시에 friendData를 업데이트하여 변경된 데이터를 반영
          const updatedFriendData = friendData.filter(item => item.userSeq !== toUserSeq);
          setFriendData(updatedFriendData);
          window.alert("삭제되었습니다.");
        })
        .catch((error) => {
          console.error("Error deleting friend:", error);
        });
    }
  }

  return (
    <div
      style={{
        width: "80%",
        height: "100vh",
        marginLeft: "5%",
        marginRight: "5%",
        fontFamily: 'Ramche',
      }}
    >
      <Grid container style={{ marginLeft: "10%", fontFamily: 'Ramche', }}>
        <Grid item xs={12} style={{ padding: "20px" }}>
          <Box display="flex" justifyContent="flex-end" marginBottom="2px"></Box>
          <Grid container spacing={3}>
            {friendData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(
              (item, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      width: "30vw",
                      fontFamily: 'Ramche',
                    }}
                  >
                    <Avatar
                      src={getProfilePic(item.point)}
                      style={{ width: "3vw", height: "10vh", flexShrink: 0, fontFamily: 'Ramche', }}
                    />
                    <div style={{ flex: 1 }}>
                      <Typography variant="h6" style={{ color: "#ffffff", fontFamily: 'Ramche', }}>
                        이름: {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{ color: "#ffffff", fontFamily: 'Ramche', }}
                      >
                        포인트: {item.point}
                      </Typography>

                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteFriend(item.userSeq)}
                      style={{ flexShrink: 0, fontFamily: 'Ramche', }}
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
            sx={{ display: "flex", justifyContent: "center", margin: "1rem 0", fontFamily: 'Ramche', }}
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