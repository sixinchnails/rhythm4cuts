/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import "./My_JoinInfo.css";
import Button from "@mui/material/Button";
import axios from "axios";

const JoinInfo = ({ onJoinInfo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailCodeStatus, setEmailCodeStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인을 위한 상태 추가
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 상태
  const [birth, setbirth] = useState("");
  const [nickname, setnickname] = useState("");
  const [nickNameStatus, setNickNameStatus] = useState(false);
  const [gender, setgender] = useState("");

  useEffect(() => {
    //이게진짜임
    const passwordRegex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/
    );
    setIsPasswordValid(passwordRegex.test(password));
  }, [password]);

  // 부모 컴포넌트에 데이터 전달
  useEffect(() => {
    if (onJoinInfo) {
      onJoinInfo({
        name,
        ssn: birth + "-" + gender,
        nickname,
        email,
        password,
        passwordConfirm,
        profile_img_seq: 1,
        emailCodeStatus,
        isPasswordValid,
        nickNameStatus,
      });
    }
  }, [
    name,
    email,
    password,
    passwordConfirm,
    birth,
    gender,
    nickname,
    onJoinInfo,
    emailCodeStatus,
    isPasswordValid,
    nickNameStatus,
  ]);

  // 상태가 변경될 때마다 콜백 함수를 호출

  const genderRef = useRef(); // ref를 생성합니다.
  const nicknameRef = useRef(); // ref를 생성합니다.
  const handleBirthChange = (e) => {
    setbirth(e.target.value);
    if (e.target.value.length >= 6) {
      // 입력 값의 길이가 6 이상이면
      genderRef.current.focus(); // gender 입력 필드로 초점을 이동합니다.
    }
  };
  const handleGenderChange = (e) => {
    setgender(e.target.value);
    if (e.target.value.length >= 1) {
      // 입력 값의 길이가 6 이상이면
      nicknameRef.current.focus(); // gender 입력 필드로 초점을 이동합니다.
    }
  };

  //이메일 코드 전송
  const emailCheck = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/member/mail?email=${email}`
      );
      if (response.status === 200) {
        setEmailCodeStatus(false);
        window.confirm("인증번호가 발송되었습니다.");
      }
    } catch (error) {
      console.log(error);
      window.confirm("인증번호 발송을 실패하였습니다.");
    }
  };
  //이메일 코드 인증

  const emailCodeCheck = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/member/mailcheck",
        {
          email: email,
          certificate: emailCode,
        }
      );
      if (response.data.checked === true) {
        setEmailCodeStatus(true);
        window.confirm("인증되었습니다.");
      } else {
        setEmailCodeStatus(false);
        window.confirm("인증을 실패하였습니다.");
      }
    } catch (error) {
      console.log(error);
      window.confirm("인증을 실패하였습니다.");
    }
  };

  //닉네임 인증

  const nickNameCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/member/nickname?nickname=${nickname}`
      );
      if (response.data.duplicate === false) {
        setNickNameStatus(true);
        window.confirm("사용 가능한 닉네임입니다.");
      } else {
        setNickNameStatus(false);
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      setNickNameStatus(false);
      window.confirm("사용중인 닉네임입니다.");
    }
  };

  return (
    <div className="Join-info-container">
      <div className="Join-info">
        <div className="Join-item">
          <span className="Join-name Join-name-topline">이름</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="Join-value"
          />
        </div>
        <div className="Join-item">
          <span className="Join-name">주민등록번호</span>
          <input
            type="text"
            value={birth}
            onChange={handleBirthChange} // 입력 값이 변경될 때마다 handleBirthChange 함수를 호출합니다.
            className="Join-birth"
            maxLength="6" // 입력 필드의 최대 길이를 6로 설정합니다.
            placeholder="생년월일 6글자"
          />
          <span>-</span>
          <input
            type="password"
            value={gender}
            onChange={handleGenderChange}
            className="Join-birth"
            style={{ display: "flex", width: "30px", marginLeft: "1px" }}
            ref={genderRef} // ref를 설정합니다.
            maxLength="1"
          />
          <span>******</span>
        </div>
        <div className="Join-item">
          <span className="Join-name">닉네임</span>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setnickname(e.target.value);
              setNickNameStatus(false);
            }}
            className="Join-value"
            placeholder="닉네임"
            ref={nicknameRef}
          />
          <Button color="primary" onClick={nickNameCheck}>
            중복 확인
          </Button>
        </div>
        <div className="Join-item">
          <span className="Join-name">이메일</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="Join-value"
          />
          <Button color="primary" onClick={emailCheck}>
            인증
          </Button>
        </div>
        <div className="Join-item">
          <span className="Join-name">이메일 인증</span>
          <input
            type="text"
            className="Join-value"
            placeholder="이메일 인증"
            value={emailCode}
            onChange={(e) => {
              setEmailCode(e.target.value);
              setEmailCodeStatus(false);
            }}
          />
          <Button color="primary" onClick={emailCodeCheck}>
            인증 확인
          </Button>
        </div>
        <div className="Join-item">
          <span className="Join-name">비밀 번호</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Join-value"
            placeholder="영어,숫자,특수 기호 포함 8자리 이상"
          />
          {isPasswordValid && password && (
            <img
              src={"/images/체크.png"}
              alt="Check"
              className="Join-check"
              style={{ width: "40px", height: "40px" }}
            />
          )}
          {!isPasswordValid && password && (
            <span className="Join-warning" style={{ color: "red" }}>
              <img
                src={"/images/오답.png"}
                alt="Check"
                className="Join-check password-check"
                style={{ width: "40px", height: "40px" }}
              />
            </span>
          )}
        </div>
        <div className="Join-item">
          <span className="Join-name">비밀 번호 확인</span>
          <input
            type="password"
            className="Join-value"
            placeholder="비밀 번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {/* 비밀번호와 일치하는지 가르쳐줌 */}
          {password === passwordConfirm && passwordConfirm && (
            <img
              src={"/images/체크.png"}
              alt="Check"
              className="Join-check"
              style={{ width: "40px", height: "40px" }}
            />
          )}
          {password !== passwordConfirm && passwordConfirm && (
            <img
              src={"/images/오답.png"}
              alt="Check"
              className="Join-check"
              style={{ width: "40px", height: "40px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinInfo;
