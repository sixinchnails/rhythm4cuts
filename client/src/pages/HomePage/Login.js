// Login.js
/* eslint-disable */
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Login.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg">
      <div className="outer">
        <div className="logo">
          <img src="images/Mypage_Logo.png"></img>
        </div>
        <div className="input">
          <input type="text" placeholder="ID(이메일)"></input>
        </div>
        <div className="input">
          <input type="text" placeholder="비밀번호"></input>
        </div>
        <div className="login">
          <button>로그인</button>
        </div>
        <div className="searchAndJoin">
          <button onClick={openModal}>PW찾기</button>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="md_outer">
              <Container vertical-align="middle" align="center">
                <div>비밀번호 찾기</div>
                <br />
                <div>
                  <input type="text" placeholder="아이디"></input>
                </div>
                <div>
                  <input type="text" placeholder="이메일"></input>
                </div>
              </Container>
            </div>
          </Modal>
          <div>|</div>
          <Link to="/Join">회원가입</Link>
        </div>
        <div className="apiLogin">
          <div class="naver-logo"></div>
          <div class="kakao-logo"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
