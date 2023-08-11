import React from "react";
import OpenViduVideoComponent from "./OvVideo";

import { useSelector } from "react-redux";
import { Avatar, Grid } from '@mui/material';

const UserVideoComponent = ({ streamManager, nickname }) => {

  const friendList = useSelector(state => state.MyPage_Friend);

  // 해당 사용자의 point 값 가져오기
  const user = friendList.find(friend => friend.name === nickname);
  // const point = user ? user.point : 0; // 기본값 0으로 설정
  const point = user.point;

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   getMediaStream();
  //   addStreamToStreamManager();
  // }, []);

  // const getMediaStream = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     } else {
  //       console.error('Error: videoRef is null');
  //     }
  //   } catch (error) {
  //     console.error('Error accessing webcam:', error);
  //   }
  // };

  // const addStreamToStreamManager = () => {
  //   if (streamManager && typeof streamManager.addStream === 'function') {
  //     streamManager.addStream(videoRef.current.srcObject);
  //   } else {
  //     console.error('Error: addStream method not found in streamManager');
  //   }
  // };

  // 사용자의 닉네임을 가져오는 메서드
  // const getNicknameTag = () => {
  //   if (streamManager && streamManager.stream) {
  //     return JSON.parse(streamManager.stream.connection.data).clientData;
  //   }
  //   return "";
  // }

  // 서버데이터 가져올 것
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
                src={getProfilePic(point)}
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