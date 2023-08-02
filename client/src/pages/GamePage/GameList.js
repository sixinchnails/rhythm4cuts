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
} from "@mui/material";
import RoomList from "../../components/Game/RoomList";
import FriendList from "../../components/Game/FriendList";
import Header from "../../components/Game/Header_light";
import { useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateRoom from "../../components/Common/CreateRoom";
import AddFriend from "../../components/Common/AddFriend";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";

function GameList() {
  // let rooms = useSelector(state => state.GameList_Room); // 방 리스트
  const [rooms, setRooms] = useState([]); // 방 리스트 (초기값 빈 배열로 설정)

  // 방 리스트 가져오기
  useEffect(() => {
    axios
      .get("/lobby/list") // 서버로 GET 요청 보내기, "/api/getRooms"는 서버에서 방 리스트를 반환하는 API 경로입니다. 서버에 맞게 수정해야 합니다.
      .then(response => {
        setRooms(response.data); // 서버 응답으로 받은 방 리스트를 상태로 업데이트합니다.
      })
      .catch(error => {
        console.error("Failed to fetch room list.", error);
      });
  }, []); // 두 번째 매개변수인 빈 배열은 useEffect가 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정합니다.

  let friends = useSelector(state => state.GameList_Friend); // 친구 리스트

  const navigate = useNavigate();

  //로그인 상태 확인
  const [isLogin, setIsLogin] = useState(false);

  try {
    userInfo()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          setIsLogin(true);
        }
      })
      .catch(error => {
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  }

  // let rooms = useSelector((state) => state.GameList_Room); // 방 리스트
  // let friends = useSelector((state) => state.GameList_Friend); // 친구 리스트

  // 방 만들기
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false); //  '방 만들기' 모달의 상태를 관리
  // 방만들기 상태를 업데이트하는 함수
  const handleOpenCreateRoomModal = () => {
    setCreateRoomModalOpen(true);
  };

  const handleCloseCreateRoomModal = () => {
    setCreateRoomModalOpen(false);
  };

  // 친구 추가
  const [isAddFriendModalOpen, setAddFriendModalOpen] = useState(false); // '친구 추가' 모달의 상태를 관리
  // '친구 추가' 모달 상태를 업데이트하는 함수
  const handleOpenAddFriendModal = () => {
    setAddFriendModalOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setAddFriendModalOpen(false);
  };

  // 방 개수 컨트롤러
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
        <Grid item xs={8} margin={"3%"}>
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
          <Box display="flex" justifyContent="flex-end" marginBottom="1%">
            <IconButton
              onClick={() => {
                // State상태 Update되도록 추후 추가예정
              }}
              sx={{ marginRight: 1 }}
            >
              <RefreshIcon style={{ color: "#ffffff" }} />
            </IconButton>
            <TextField
              label="검색"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "100%" }} // 검색창 스타일링
              placeholder="방 번호 or 노래 제목"
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
                    {/* <Button variant="contained">방 만들기</Button> */}
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
