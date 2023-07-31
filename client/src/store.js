import { configureStore, createSlice } from "@reduxjs/toolkit";

// GameList : 친구 리스트
let GameList_Friend = createSlice({
  name: "Friend",
  initialState: [
    { name: "Friend 1", isOnline: true },
    { name: "Friend 2", isOnline: false },
    { name: "Friend 3", isOnline: true },
    { name: "Friend 4", isOnline: true },
    { name: "Friend 5", isOnline: false },
    { name: "Friend 6", isOnline: true },
    { name: "Friend 7", isOnline: false },
    { name: "Friend 8", isOnline: true },
    { name: "Friend 9", isOnline: true },
    { name: "Friend 가", isOnline: false },
    { name: "Friend 나", isOnline: true },
    { name: "Friend 다", isOnline: false },

    // More friends here...
  ],
});

// GameList : 방 리스트
let GameList_Room = createSlice({
  name: "Room",
  initialState: [
    {
      number: 1, // 방 넘버 ( Primary Value )
      name: "Room 1", // 방 이름
      description: "This is Room 1",
      song: "주저하는 연인들을 위해", // 노래 이름
      image: "/images/잔나비.jfif", // 노래에 따른 이미지
      currentOccupancy: 6, // 현재 인원 ( 서버 연결 예정)
      maxOccupancy: 6, // 최대 인원
      isSecret: true, // 비밀 방 여부
    },
    {
      number: 2,
      name: "Room 2",
      description: "This is Room 2",
      song: "Song 2",
      image: "/path/to/image2.jpg",
      currentOccupancy: 2,
      maxOccupancy: 4,
      isSecret: false,
    },
    {
      number: 3,
      name: "Room 3",
      description: "This is Room 3",
      song: "Song 3",
      image: "/path/to/image3.jpg",
      currentOccupancy: 1,
      maxOccupancy: 4,
      isSecret: false,
    },
    {
      number: 4,
      name: "Room 4",
      description: "This is Room 4",
      song: "Song 4",
      image: "/path/to/image4.jpg",
      currentOccupancy: 5,
      maxOccupancy: 5,
      isSecret: true,
    },
    {
      number: 5,
      name: "Room 5",
      description: "This is Room 5",
      song: "Song 5",
      image: "/path/to/image5.jpg",
      currentOccupancy: 4,
      maxOccupancy: 6,
      isSecret: false,
    },
    {
      number: 6,
      name: "Room 6",
      description: "This is Room 6",
      song: "Song 6",
      image: "/path/to/image6.jpg",
      currentOccupancy: 3,
      maxOccupancy: 6,
      isSecret: true,
    },
    {
      number: 7,
      name: "Room 7",
      description: "This is Room 7",
      song: "Song 7",
      image: "/path/to/image7.jpg",
      currentOccupancy: 2,
      maxOccupancy: 4,
      isSecret: false,
    },
    {
      number: 8,
      name: "Room 8",
      description: "This is Room 8",
      song: "Song 8",
      image: "/path/to/image8.jpg",
      currentOccupancy: 4,
      maxOccupancy: 6,
      isSecret: false,
    },
    // More rooms here...
  ],
});

// GameWait : 대기방 준비상태 관리
let GameWait_Ready = createSlice({
  name: "Ready",
  initialState: {
    player1: false,
    player2: false,
    player3: false,
    player4: false,
  },
  reducers: {
    toggleReady: (state, action) => {
      const playerId = action.payload;
      state[playerId] = !state[playerId];
    },
  },
});

export const { toggleReady } = GameWait_Ready.actions;

// GameShot : 인생네컷 배경 이미지 4종류
let GameShot_frameImage = createSlice({
  name: "frameImage",
  initialState: [
    "/images/Black.jfif",
    "/images/Blue.png",
    "/images/Green.png",
    "/images/Red.png",
  ],
});

// GameScore : 게임 순위 (나중에 게임 순위 별 유저 이미지로 받아와야함.)
let GameScore_Result = createSlice({
  name: "gameResults",
  initialState: [
    {
      rank: 1,
      nickname: "Player1",
      score: 100 + "점",
      reward: "+" + 200 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
    {
      rank: 2,
      nickname: "Player2",
      score: 80 + "점",
      reward: "+" + 150 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
    {
      rank: 3,
      nickname: "Player3",
      score: 60 + "점",
      reward: "+" + 100 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
    {
      rank: 4,
      nickname: "Player4",
      score: 40 + "점",
      reward: "+" + 0 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
  ],
});

let Music_Rank = createSlice({
  name: "music_rank",
  initialState: [
    {
      rank: 1,
      title: "주저하는 연인들을 위해",
      singer: "잔나비",
    },
    {
      rank: 2,
      title: "퀸카",
      singer: "(여자)아이들",
    },
    {
      rank: 3,
      title: "Super Shy",
      singer: "New Jeans",
    },
    {
      rank: 4,
      title: "UNFORGIVEN",
      singer: "르세라핌",
    },
    {
      rank: 5,
      title: "일어나",
      singer: "김광석",
    },
    {
      rank: 6,
      title: "주저하는 연인들을 위해",
      singer: "잔나비",
    },
    {
      rank: 7,
      title: "퀸카",
      singer: "(여자)아이들",
    },
    {
      rank: 8,
      title: "Super Shy",
      singer: "New Jeans",
    },
    {
      rank: 9,
      title: "UNFORGIVEN",
      singer: "르세라핌",
    },
    {
      rank: 10,
      title: "일어나",
      singer: "김광석",
    },
    {
      rank: 11,
      title: "주저하는 연인들을 위해",
      singer: "잔나비",
    },
    {
      rank: 12,
      title: "퀸카",
      singer: "(여자)아이들",
    },
    {
      rank: 13,
      title: "Super Shy",
      singer: "New Jeans",
    },
    {
      rank: 14,
      title: "UNFORGIVEN",
      singer: "르세라핌",
    },
    {
      rank: 15,
      title: "일어나",
      singer: "김광석",
    },
    {
      rank: 16,
      title: "주저하는 연인들을 위해",
      singer: "잔나비",
    },
    {
      rank: 17,
      title: "퀸카",
      singer: "(여자)아이들",
    },
    {
      rank: 18,
      title: "Super Shy",
      singer: "New Jeans",
    },
    {
      rank: 19,
      title: "UNFORGIVEN",
      singer: "르세라핌",
    },
    {
      rank: 20,
      title: "일어나",
      singer: "김광석",
    },
  ],
});

let User_Rank = createSlice({
  name: "user_rank",
  initialState: [
    {
      rank: 1,
      nickName: "최재드래곤",
      score: 1000,
    },
    {
      rank: 2,
      nickName: "한윤팀장",
      score: 900,
    },
    {
      rank: 3,
      nickName: "실버캐슬",
      score: 800,
    },
    {
      rank: 4,
      nickName: "홍유콩",
      score: 700,
    },
    {
      rank: 5,
      nickName: "최강현",
      score: 600,
    },
    {
      rank: 6,
      nickName: "밍국이",
      score: 500,
    },
    {
      rank: 7,
      nickName: "누군가",
      score: 300,
    },
    {
      rank: 8,
      nickName: "최재드래곤2",
      score: 1000,
    },
    {
      rank: 9,
      nickName: "한윤팀장2",
      score: 900,
    },
    {
      rank: 10,
      nickName: "실버캐슬2",
      score: 800,
    },
    {
      rank: 11,
      nickName: "홍유콩2",
      score: 700,
    },
    {
      rank: 12,
      nickName: "최강현2",
      score: 600,
    },
    {
      rank: 13,
      nickName: "밍국이2",
      score: 500,
    },
    {
      rank: 14,
      nickName: "누군가2",
      score: 300,
    },
  ],
});

export default configureStore({
  reducer: {
    GameShot_frameImage: GameShot_frameImage.reducer,
    GameScore_Result: GameScore_Result.reducer,
    GameWait_Ready: GameWait_Ready.reducer,
    GameList_Room: GameList_Room.reducer,
    GameList_Friend: GameList_Friend.reducer,
    Music_Rank: Music_Rank.reducer,
    User_Rank: User_Rank.reducer,
  },
});
