import React, { useRef, useEffect } from "react";

function UserVideoShot() {
  const webcamRef = useRef(null);

  useEffect(() => {
    // 웹캠 스트림 가져오기
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }, []);

  return (
    <video
      ref={webcamRef}
      autoPlay
      playsInline
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

export default UserVideoShot;
