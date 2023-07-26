import React, { useEffect, useRef, useState } from "react";
import "./My_ModifyInfo.css";
import Button from "@mui/material/Button";

function UserInfo({ info }) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);
  const [image, setImage] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  useEffect(() => {
    if (password !== passwordConfirm) {
      setPasswordConfirmError(true);
    } else {
      setPasswordConfirmError(false);
    }
  }, [password, passwordConfirm]);

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = e => {
    setPasswordConfirm(e.target.value);
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    // Add a click handler for the button
    fileInput.current.click();
  };

  return (
    <div className="modify-info-container">
      <div className="modify-info">
        <div className="modify-item">
          <span className="modify-name">닉네임</span>
          <input placeholder="닉네임" className="modify-value"></input>
        </div>

        <div className="modify-item">
          <span className="modify-name">비밀 번호</span>
          <input
            type="password"
            placeholder="영어,숫자,특수 기호 포함 8자리 이상"
            className={`modify-value ${
              passwordError ? "input-with-warning" : ""
            }`}
            onChange={handlePasswordChange}
          ></input>
          {password && (
            <img
              src={passwordError ? "/images/오답.png" : "/images/체크.png"}
              alt="Password Validation"
              style={{ width: "40px", height: "40px" }}
            />
          )}
        </div>

        <div className="modify-item">
          <span className="modify-name">비밀 번호 확인</span>
          <input
            placeholder="비밀 번호 확인"
            type="password"
            className="modify-value"
            onChange={handlePasswordConfirmChange}
          ></input>
          {passwordConfirm && (
            <img
              src={
                passwordConfirmError ? "/images/오답.png" : "/images/체크.png"
              }
              alt="Password Confirm Validation"
              style={{ width: "40px", height: "40px" }}
            />
          )}
        </div>
      </div>
      <img
        className="profile-picture"
        src="data:image/jpeg;base64,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"
        alt="Profile"
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          className="modify-button"
          style={{
            backgroundColor: "#F2BED1",
            color: "#000000",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          사진 변경
        </Button>
        <input
          ref={fileInput}
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        className="complete-button"
        style={{
          backgroundColor: "#F2BED1",
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        수정 완료
      </Button>
    </div>
  );
}

export default UserInfo;
