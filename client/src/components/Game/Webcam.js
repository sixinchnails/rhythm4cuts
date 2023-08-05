/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { connect, Publisher, Session, StreamEvent } from "openvidu-browser";

function Webcam({ token, playerId }) {
  // 웹캠 스트림을 보여줄 video 엘리먼트에 접근하기 위한 ref를 생성합니다.
  const videoRef = useRef(null);

  // OpenVidu 세션과 publisher를 저장하기 위한 ref를 생성합니다.
  const sessionRef = useRef(null);
  const publisherRef = useRef(null);

  useEffect(() => {
    // OpenVidu 세션을 생성합니다.
    const session = new Session();
    sessionRef.current = session;

    // OpenVidu 세션에 연결합니다.
    session
      .connect(token)
      .then(() => {
        // 웹캠 스트림을 획득하고 publisher를 생성합니다.
        const publisher = new Publisher(videoRef.current);
        publisherRef.current = publisher;

        // 생성한 publisher를 OpenVidu 세션에 추가합니다.
        session.publish(publisher);

        // 플레이어 식별자(playerId)를 사용하여 퍼블리셔 객체에 player ID를 저장합니다.
        publisher.stream.publishers.playerId = playerId;
      })
      .catch((error) => {
        console.error("Failed to connect to OpenVidu session:", error);
      });

    // 컴포넌트 언마운트 시에 연결 해제 및 스트림 해제를 수행합니다.
    return () => {
      if (publisherRef.current) {
        // 생성한 publisher를 세션에서 unpublish합니다.
        sessionRef.current.unpublish(publisherRef.current);
      }
      if (sessionRef.current) {
        // 컴포넌트가 언마운트 될 때 OpenVidu 세션과의 연결을 해제합니다.
        sessionRef.current.disconnect();
      }
    };
  }, [token, playerId]);

  // video 엘리먼트를 렌더링하여 웹캠 스트림을 화면에 보여줍니다.
  return <video ref={videoRef} autoPlay muted playsInline />;
}

export default Webcam;
