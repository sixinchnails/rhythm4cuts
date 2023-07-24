import React from "react";

class Webcam extends React.Component {
  videoRef = React.createRef();

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          if (this.videoRef.current) {
            this.videoRef.current.srcObject = stream;
          }
        })
        .catch(console.error);
    }
  }

  getScreenshot = () => {
    const canvas = document.createElement("canvas");
    const video = this.videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      return canvas.toDataURL("image/png");
    }

    return null;
  };

  //  object-fit: 'contain' 속성은 비디오의 원래 비율을 유지하면서 가능한 한 많은 영역을 채우도록 비디오를 확대/축소
  render() {
    return (
      <video
        ref={this.videoRef}
        autoPlay
        style={{ width: "640px", height: "480px", objectFit: "contain" }}
      />
    );
  }
}

export default Webcam;
