import React, { useState, useRef } from "react";

function Temp() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const audioElementRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);

    const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);

    // 오디오 재생을 위해 <audio> 요소에 source를 설정합니다.
    if (audioElementRef.current) {
      audioElementRef.current.src = audioUrl;
    }

    console.log(audioUrl);

    audioChunks.current = [];
  };

  return (
    <div>
      <h1>음성 녹음</h1>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "녹음 중지" : "녹음 시작"}
      </button>
      {recording && <p>녹음 중...</p>}
      <audio controls ref={audioElementRef}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Temp;
