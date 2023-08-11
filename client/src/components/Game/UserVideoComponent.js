import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import { userInfo } from '../../apis/userInfo';


export default class UserVideoComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   // 비디오 요소를 저장할 Ref 생성
  //   this.videoRef = React.createRef();
  // }

  // // 컴포넌트가 처음 마운트될 때 호출되는 메서드
  // async componentDidMount() {
  //   await this.getMediaStream(); // 웹캠 스트림 가져오기
  //   await this.addStreamToStreamManager()
  // }

  // // 웹캠 스트림을 가져오는 메서드
  // async getMediaStream() {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //     if (this.videoRef.current) { // Check if videoRef is not null
  //       this.videoRef.current.srcObject = stream;
  //     } else {
  //       console.error('Error: videoRef is null');
  //     }
  //   } catch (error) {
  //     console.error('Error accessing webcam:', error);
  //   }
  // }

  // async addStreamToStreamManager() {
  //   const { streamManager } = this.props;
  //   // if (streamManager && streamManager.addStream) {
  //   if (streamManager && typeof streamManager.addStream === 'function') {
  //     streamManager.addStream(this.videoRef.current.srcObject);
  //   } else {
  //     console.error('Error: addStream method not found in streamManager');
  //   }
  // }

  // 사용자의 닉네임을 가져오는 메서드
  // getNicknameTag() {
  //   const { streamManager } = this.props;
  //   if (streamManager && streamManager.stream) {
  //     return JSON.parse(streamManager.stream.connection.data).clientData;
  //   }
  //   return "";
  // }  // 로그인 상태 확인
 



  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={this.props.streamManager} />
          <div>{/* <p>{this.getNicknameTag()}</p> */}</div>
          <div>dddddd</div>
        </div>
      </div>
    );
  }
}
