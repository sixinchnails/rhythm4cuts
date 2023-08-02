// Login.js
/* eslint-disable */
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchPassword from "../../components/Common/SearchPassword";
import "./Login.css";
import { Box } from "@mui/material";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSearchPasswordModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseSearchPasswordModal = () => {
    setIsModalOpen(false);
  };

  // id 파트
  const [id, setId] = useState("");
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  // pw 파트
  const [pw, setPW] = useState("");
  const onChangePW = (e) => {
    setPW(e.target.value);
  };

  // 로그인
  const onClick = () => {
    //로그인 api
    const login = async (id, pw) => {};
  };

  return (
    <div className="bg">
      <div className="outer">
        <div className="logo">
          <img src="images/Mypage_Logo.png"></img>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="ID(이메일)"
            value={id}
            onChange={onChangeId}
          ></input>
        </div>
        <div className="input">
          <input
            placeholder="비밀번호"
            type="password"
            value={pw}
            onChange={onChangePW}
          ></input>
        </div>
        <div className="login">
          <button>로그인</button>
        </div>
        <div className="searchAndJoin">
          <button onClick={handleOpenSearchPasswordModal}>PW찾기</button>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              overflow: "auto",
            }}
          ></Box>
          <div>|</div>
          <Link to="/Join">회원가입</Link>
        </div>
        <div className="apiLogin">
          <div class="naver-logo"></div>
          <div class="kakao-logo"></div>
        </div>
      </div>

      <SearchPassword
        isOpen={isModalOpen}
        handleClose={handleCloseSearchPasswordModal}
      />
    </div>
  );
};

export default Home;
