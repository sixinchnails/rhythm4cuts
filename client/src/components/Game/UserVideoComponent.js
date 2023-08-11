import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import { userInfo } from '../../apis/userInfo';


const UserVideoComponent = ({ streamManager, nickname }) => {

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
  // }  // 로그인 상태 확인


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
          {nickname}
        </div>
      </div>
    </div>
  );
}

export default UserVideoComponent;