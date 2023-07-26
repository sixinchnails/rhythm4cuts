// Login.js
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Home = () => {
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
          <button>PW찾기</button>
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
