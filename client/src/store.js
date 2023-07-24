import { configureStore, createSlice } from "@reduxjs/toolkit";

// 인생네컷 배경 이미지 4종류
let frameImage = createSlice({
  name: "frameImage",
  initialState: [
    "/images/Black.jfif",
    "/images/Blue.png",
    "/images/Green.png",
    "/images/Red.png",
  ],
});

// 나중에 게임 순위 별 유저 이미지로 받아와야함.
// 게임 순위
let gameResults = createSlice({
  name: "gameResults",
  initialState: [
    {
      rank: 1,
      nickname: "Player1",
      score: 100 + "점",
      reward: 200 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
    {
      rank: 2,
      nickname: "Player2",
      score: 80 + "점",
      reward: 150 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
    {
      rank: 3,
      nickname: "Player3",
      score: 60 + "점",
      reward: 100 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
    {
      rank: 4,
      nickname: "Player4",
      score: 40 + "점",
      reward: 0 + "P",
      imgSrc: "/images/잔나비.jfif",
    },
  ],
});

export default configureStore({
  reducer: {
    gameResults: gameResults.reducer,
    frameImage: frameImage.reducer,
  },
});
