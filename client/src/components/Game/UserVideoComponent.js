import { React } from "react";
import OpenViduVideoComponent from "./OvVideo";

import { Avatar, Grid } from "@mui/material";

const UserVideoComponent = ({ streamManager, gameStarted }) => {
  function getUserInfo() {
    console.log("user info function");
    console.log(JSON.parse(streamManager.stream.connection.data).clientData);
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

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

        {/* 게임 시작 전 & 후 */}
        {gameStarted ? null : (
          <div
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "20px",
              color: "white",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={3} style={{ marginRight: "10px" }}>
              <Avatar
                src={getProfilePic(getUserInfo().data.score_sum)}
                style={{ width: "40px", height: "40px", flexShrink: 0 }}
              />
            </Grid>

            <Grid
              item
              xs={7}
              style={{ fontFamily: "Pretendard-Regular", fontSize: "20px" }}
            >
              {getUserInfo().data.nickname}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVideoComponent;
