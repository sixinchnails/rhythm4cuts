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
  const [profileImgSeq, setProfileImgSeq] = useState(1); // profile_img_seq를 상태로 관리

  const handleImageSelect = useCallback((index) => {
    console.log("Selected Image Index:", index);
    setProfileImgSeq(index);
  }, []);

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
          "https://i9b109.p.ssafy.io:8443/member/register",
          // "http://lo/calhost:8080/member/register",
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
      <Header></Header>
      <div style={{ display: "flex", width: "30%" }}>
        <JoinImage
          initialImages={[
            "/images/노래람쥐.png",
            "/images/노래랑이.png",
            "/images/노래요미.png",
            "/images/핑클.png",
          ]}
          onImageSelect={handleImageSelect}
        />
        <JoinInfo onJoinInfo={handleJoinInfo} profileImgSeq={profileImgSeq} />
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
