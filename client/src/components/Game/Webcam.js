import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenVidu from "openvidu-browser";
import { closeSession, setWebcamStream } from "../../store";

const Webcam = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const sessionRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;

          // const roomId = "YOUR_ROOM_ID_HERE"; // 실제 방의 sessionId를 전달합니다.
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      if (sessionRef.current) {
        dispatch(closeSession({ sessionId: sessionRef.current.sessionId, connectionId: sessionRef.current.connection.connectionId }));
        dispatch(setWebcamStream(null));
      }
    };
  }, [dispatch]);

  const token = useSelector((state) => state.session.token);

  useEffect(() => {
    if (token && streamRef.current) {
      const OV = new OpenVidu();
      const session = OV.initSession();
      sessionRef.current = session;

      session.connect(token)
        .then(() => {
          session.publish(streamRef.current);
          dispatch(setWebcamStream(streamRef.current));
        })
        .catch((error) => {
          console.error("Error connecting to OpenVidu:", error);
        });
    }
  }, [token, dispatch]);

  // useImperativeHandle을 사용하여 부모 컴포넌트에서 getScreenshot 함수를 호출할 수 있도록 전달
  useImperativeHandle(ref, () => ({
    getScreenshot: () => {
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
        return canvas.toDataURL("image/png");
      }
      return null;
    },
  }));

  return (
    <video
      ref={videoRef}
      autoPlay
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
});

export default Webcam;
