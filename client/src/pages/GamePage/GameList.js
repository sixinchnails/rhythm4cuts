import React, { useState } from "react";
import { Grid, Pagination, Box, Button, Paper, TextField } from "@mui/material";
import RoomList from "../../components/Game/RoomList";
import FriendList from "../../components/Game/FriendList";
import Header from "../../components/Game/Header_light";
import { useSelector } from "react-redux";

function GameList() {
  let rooms = useSelector(state => state.GameList_Room); // 방 리스트
  let friends = useSelector(state => state.GameList_Friend); // 친구 리스트

  const itemsPerPage = 6; // 한 페이지당 표시할 방 수
  const [page, setPage] = useState(1); // 페이지 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  // 검색어에 따라 방 리스트 필터링
  let filteredRooms = rooms.filter(
    room =>
      room.number.toString().toLowerCase().includes(searchTerm.toLowerCase()) || // 번호를 문자열로 변환한 후 검색어를 포함하는지 확인
      room.song.toLowerCase().includes(searchTerm.toLowerCase()) // 노래 제목이 검색어를 포함하는지 확인
  );

  const noOfPages = Math.ceil(filteredRooms.length / itemsPerPage); // 필터링된 방 리스트를 통해 페이지 수 계산

  const handleChange = (event, value) => {
    setPage(value); // 페이지 변경 이벤트 핸들러
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value); // 검색어 변경 이벤트 핸들러
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/Game_List.png')",
      }}
    >
      <Header />
      <Grid container spacing="2%">
        <Grid item xs={8} margin={"1%"}>
          <Box display="flex" justifyContent="flex-end" marginBottom="1%">
            <TextField
              label="검색"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "20%" }} // 검색창 스타일링
              placeholder="방 번호 or 노래 제목"
              InputProps={{
                style: { color: "#ffffff" },
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredRooms
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((room, index) => (
                <Grid item xs={6} key={index}>
                  <RoomList key={index} room={room} />
                </Grid>
              ))}
          </Grid>

          <Paper
            elevation={10} // 그림자 정도 설정
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1%",
              backgroundColor: "#f5f5f5", // 배경색을 연한 회색으로 설정
              marginTop: "1%",
              width: "100%", // 너비를 100%로 설정
            }}
          >
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              color="primary"
              size="large"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white", // 기본 아이템 색상을 흰색으로 설정
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // 기본 아이템의 배경색을 약간 투명한 검정색으로 설정
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#3f51b5", // 선택된 아이템의 배경색을 파란색으로 설정
                  color: "white", // 선택된 아이템의 텍스트 색상을 흰색으로 설정
                },
                "& .MuiPaginationItem-page:hover": {
                  backgroundColor: "#283593", // 마우스 호버 시 아이템의 배경색을 진한 파란색으로 설정
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={10}>
            <Box p={5}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Button variant="contained">방 만들기</Button>
                    <Button variant="contained">빠른 입장</Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Button variant="contained">친구 추가</Button>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "50vh",
                      overflow: "auto",
                    }}
                  >
                    <FriendList friends={friends} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GameList;
