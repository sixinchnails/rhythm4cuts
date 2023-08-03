// Join.js
/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import "./Join.css";
import JoinImage from "../../components/My/My_JoinImage";
import JoinInfo from "../../components/My/My_JoinInfo";
import Button from "@mui/material/Button";
import Header from "../../components/Home/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#F8E8EE";
    // 컴포넌트 unmount 시점에 원래의 배경색으로 되돌리기 위한 cleanup 함수
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const navigate = useNavigate();

  // 회원가입 정보를 저장할 상태
  const [joinInfo, setJoinInfo] = useState({});

  const handleJoinInfo = useCallback((data) => {
    setJoinInfo(data); // JoinInfo 컴포넌트로부터 받은 데이터를 상태에 저장
  }, []);

  //회원가입
  const handleJoinComplete = async () => {
    if (joinInfo.nickNameStatus === false) {
      window.confirm("닉네임 중복확인하세요.");
    } else if (joinInfo.emailCodeStatus === false) {
      window.confirm("이메일 인증확인하세요.");
    } else if (
      joinInfo.isPasswordValid === false ||
      joinInfo.password !== joinInfo.passwordConfirm
    ) {
      window.confirm("비밀번호 확인하세요.");
    } else {
      try {
        const response = await axios.post(
          "member/register",
          // "http://localhost:8080/member/register",
          joinInfo
        );
        const confirmed = window.confirm("회원가입이 완료! 로그인 해주세요");
        if (confirmed) {
          navigate("/Login");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {/* 위쪽 컨테이너 */}
      <Header></Header>
      <div style={{ display: "flex" }}>
        {/* flex style을 줘서 각각 다른 박스로 만들어 좌우로 배치할 수 있게 해준다. 
        flex가 없으면 사진 선택 밑으로 JoinInfo 컴포넌트가 들어감.*/}
        <JoinImage initialImage="/images/회원.png" />
        <JoinInfo onJoinInfo={handleJoinInfo} />
      </div>
      <Button
        color="primary"
        style={{
          color: "black",
          fontSize: "large",
          float: "right",
          marginRight: "300px",
          marginTop: "-50px",
        }}
        onClick={handleJoinComplete}
      >
        가입 완료
      </Button>
    </div>
  );
};

export default Join;
