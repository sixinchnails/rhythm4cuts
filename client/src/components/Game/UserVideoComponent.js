import React from "react";
import OpenViduVideoComponent from "./OvVideo";

import { useSelector } from "react-redux";
import { Avatar, Grid } from '@mui/material';
import { userInfo } from '../../apis/userInfo';
import { useState } from 'react';

const UserVideoComponent = ({ streamManager, nickname }) => {

  const friendList = useSelector(state => state.MyPage_Friend);

  // 해당 사용자의 point 값 가져오기
  const user = friendList.find(friend => friend.name === nickname);
  // const point = user ? user.point : 0; // 기본값 0으로 설정
  // const point = user.point;

  //누적 포인트
  const [pointSum, setPointSum] = useState("");

  userInfo()
    .then(res => {
      if (res.status === 200) {
        setPointSum(res.data.score_sum);
        console.log(res);
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Grid item
              xs={3}>
              <Avatar
                src={getProfilePic(pointSum)}
                style={{ width: "40px", height: "40px", flexShrink: 0 }}
              />
            </Grid>
            <Grid item
              xs={7} style={{
                backgroundColor: "transparent",
                // paddingLeft: "5px",
              }}>
              {nickname}
            </Grid>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserVideoComponent;