import React, { useState } from "react";
import "./My_JoinImage.css";

// 초기 이미지를 props로 받는다.
const JoinImage = ({ initialImage }) => {
  // image상태를 선언하고, 초기값을 initialImage로 설정
  const [image, setImage] = useState(initialImage);

  //   파일 입력 필드에서 파일이 선택되면 호출되는 이벤트 핸들러 정의
  const handleJoinImage = event => {
    // 선택된 파일을 가져옴
    const file = event.target.files[0];
    // FileReader 객체 생성
    const reader = new FileReader();

    // 파일 읽기가 끝나면 호출되는 이벤트 핸들러를 설정
    // 이 이벤트 핸들러는 읽은 파일의 데이터를 image 상태에 저장
    reader.onloadend = () => {
      setImage(reader.result);
    };

    // 선택한 파일을 읽어서 그 내용을 데이터 URL의 형태로 반환
    // 데이터 URL은 파일의 데이터를 직접 URL에 포함시킨 형태
    // 이 형태의 URL은 이미지, 오디오 등의 미디어를 브라우저에서 직접 표시할 수 있게 해줌
    reader.readAsDataURL(file);
  };

  //   랜더링
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 className="Join-Content">회원 가입</h1>
      <img
        src={image}
        alt="User"
        style={{ width: "200px", marginLeft: "90px", marginTop: "30px" }}
      />
      <label
        htmlFor="upload-button"
        style={{
          cursor: "pointer",
          marginLeft: "150px",
          marginTop: "10px",
          fontSize: "large",
          width: "90px",
        }}
      >
        사진 선택
      </label>
      <input
        id="upload-button"
        type="file"
        onChange={handleJoinImage}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default JoinImage;
