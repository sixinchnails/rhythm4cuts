/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Pagination,
  Box,
  Button,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import RoomList from "../../components/Game/RoomList";
import FriendList from "../../components/Game/FriendList";
import Header from "../../components/Game/Header_light";
import { useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateRoom from "../../components/Common/CreateRoom";
import AddFriend from "../../components/Common/AddFriend";
import { useNavigate, Link } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";
import { getCookie } from "../../utils/cookie";

function GameList() {



  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]); // 방 리스트 (초기값 빈 배열로 설정)
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false); //  '방 만들기' 모달의 상태를 관리
  let friends = useSelector(state => state.GameList_Friend); // 친구 리스트
  const itemsPerPage = 6; // 한 페이지당 표시할 방 수
  const [page, setPage] = useState(1); // 페이지 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchCategory, setSearchCategory] = useState("gameSeq"); //  검색 카테고리 상태 (기본값을 'gameSeq'로 설정)

  // 친구 추가
  const [isAddFriendModalOpen, setAddFriendModalOpen] = useState(false); // '친구 추가' 모달의 상태를 관리
  // '친구 추가' 모달 상태를 업데이트하는 함수
  const handleOpenAddFriendModal = () => {
    setAddFriendModalOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setAddFriendModalOpen(false);
  };

  // 방만들기 상태를 업데이트하는 함수
  const handleOpenCreateRoomModal = () => {
    setCreateRoomModalOpen(true);
  };

  const handleCloseCreateRoomModal = () => {
    setCreateRoomModalOpen(false);
  };

  //로그인 상태 확인
  try {
    userInfo()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch(error => {
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  }

  // 방 리스트 가져오기
  useEffect(() => {
    axios
      .get("/lobby/list", {
        headers: {
          Authorization: "Bearer " + getCookie("access"),
        },
      })
      .then(response => {
        setRooms(response.data.data); // 서버 응답으로 받은 방 리스트를 상태로 업데이트합니다.
      })
      .catch(error => {
        console.error("방 리스트 가져오는데 실패 뽝! : ", error);
      });
  }, []);

  // 검색어에 따라 방 리스트 필터링
  let filteredRooms = rooms.filter(room => {
    switch (searchCategory) {
      case "gameSeq":
        return room.gameSeq
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()); // 방 번호를 문자열로 변환한 후 검색어를 포함하는지 확인
      case "title":
        return room.title.toLowerCase().includes(searchTerm.toLowerCase()); // 방 제목이 검색어를 포함하는지 확인
      case "songSeq":
        return room.songSeq
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()); // 노래 번호를 문자열로 변환한 후 검색어를 포함하는지 확인
      default:
        return true; // 검색 카테고리가 설정되지 않은 경우, 모든 방을 표시
    }
  });
  // 필터링된 방 리스트를 통해 페이지 수 계산
  const noOfPages = Math.ceil(filteredRooms.length / itemsPerPage);
  // 페이지 변경 이벤트 핸들러
  const handleChange = (event, value) => {
    setPage(value);
  };
  // 검색어 변경 이벤트 핸들러
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
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
        <Grid item xs={8} margin={"3%"}>
          <Grid container spacing={2}>
            {filteredRooms
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((room, gameSeq) => (
                <Grid item xs={6} key={gameSeq}>
                  {/* 방 누르면 입장 */}
                  <Link to={`/GameWait/${room.gameSeq}`}>
                    <RoomList key={gameSeq} room={room} />
                  </Link>
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
          <Box display="flex" justifyContent="flex-end" marginBottom="1%">

            {/* 새로고침 아이콘 : 기능 추가예정 */}
            <IconButton
              onClick={() => {
              }}
              sx={{ marginRight: 1 }}
            >
              <RefreshIcon style={{ color: "#ffffff" }} />
            </IconButton>

            {/* 검색 카테고리 추가 */}
            <Select
              value={searchCategory}
              onChange={e => setSearchCategory(e.target.value)}
              style={{ marginRight: "1em" }}
            >
              <MenuItem value={"gameSeq"}>방 번호</MenuItem>
              <MenuItem value={"title"}>방 이름</MenuItem>
              <MenuItem value={"songSeq"}>노래 일련번호</MenuItem>
            </Select>
            <TextField
              label="검색"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "100%" }} // 검색창 스타일링
              InputProps={{
                style: { color: "#ffffff" },
              }}
            />
          </Box>
          <Paper elevation={10}>
            <Box p={5}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Button
                      variant="contained"
                      onClick={handleOpenCreateRoomModal}
                    >
                      방 만들기
                    </Button>
                    <Button variant="contained">빠른 입장</Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Button
                      variant="contained"
                      onClick={handleOpenAddFriendModal}
                    >
                      친구 추가
                    </Button>
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

      {/* '방 만들기' 모달 */}
      <CreateRoom
        isOpen={isCreateRoomModalOpen}
        handleClose={handleCloseCreateRoomModal}
      />

      {/* '친구 추가' 모달 */}
      <AddFriend
        isOpen={isAddFriendModalOpen}
        handleClose={handleCloseAddFriendModal}
      />
    </div>
  );
}

export default GameList;
