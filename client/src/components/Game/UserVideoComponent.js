import React from "react";
import OpenViduVideoComponent from "./OvVideo";

import { Avatar, Grid } from '@mui/material';
import { userInfo } from '../../apis/userInfo';
import { useState } from 'react';

const UserVideoComponent = ({ streamManager }) => {

  const [pointSum, setPointSum] = useState(""); // 누적 포인트
  const [nickname, setNickname] = useState(""); // 닉네임

  userInfo()
    .then(res => {
      if (res.status === 200) {
        setPointSum(res.data.score_sum);
        setNickname(res.data.nickname);
      }
    })

  // 서버데이터 가져올 것
  function getProfilePic(pointSum) {
    if (pointSum <= 2000) {
      return "/images/브론즈.png";
    } else if (pointSum <= 4000) {
      return "/images/실버.png";
    } else if (pointSum <= 6000) {
      return "/images/골드.png";
    } else if (pointSum <= 8000) {
      return "/images/플레.png";
    } else {
      return "/images/다이아.png";
    }
  }

  return (
    <div>
      <div>
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>

        <div
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: "20px",
            color: "white",
            margin: "20px",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <Grid item xs={3} style={{ marginRight: "10px" }}>
            <Avatar
              src={getProfilePic(pointSum)}
              style={{ width: "40px", height: "40px", flexShrink: 0 }}
            />
          </Grid>
          <Grid item xs={7} style={{ fontFamily: "Pretendard-Regular", fontSize: "20px" }}>
            {nickname}
          </Grid>

        </div>
      </div>
    </div>
  );
}

export default UserVideoComponent;