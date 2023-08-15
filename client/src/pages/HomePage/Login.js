// Login.js
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";
import { setCookie } from "../../utils/cookie";
import { login } from "../../apis/login";
import SearchPassword from "../../components/Common/SearchPassword";

import "./Login.css";

const Login = () => {
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  let navigate = useNavigate();

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

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

  const { connectWebSocket } = useWebSocket(); // 웹소켓 연결 함수 가져오기
  // 로그인
  const Login = async () => {
    try {
      const result = await login(id, pw);
      if (result.status === 200) {
        window.alert("로그인을 성공하였습니다!");
        setCookie("access", result.data.accessToken);
        setCookie("refresh", result.data.refreshToken);
        setCookie("email", result.data.email);
        // connectWebSocket(); // 로그인 성공 후 웹소켓 연결 시작
        navigate("/");
      } else {
        window.alert("로그인에 실패하였습니다!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("잘못된 이메일 또는 비밀번호입니다!");
      } else {
        window.alert("서버와의 통신 중 에러가 발생했습니다!");
      }
    }
  };

  return (
    <div className="bg">
      <video autoPlay loop muted>
        <source src="/videos/33.mp4" type="video/mp4" />
      </video>
      <div className="outer">
        <div className="logo">
          <a href="/">
            <img
              alt="로고 사진"
              src="images/Home_Logo.png"
              style={{ marginLeft: "50px", marginTop: "25px" }}
            ></img>
          </a>
        </div>

        <div className="input">
          <input
            type="text"
            ref={emailRef}
            placeholder="이메일"
            value={id}
            onChange={onChangeId}
            onKeyPress={onKeyPress}
          ></input>
        </div>
        <div className="input">
          <input
            placeholder="비밀번호"
            type="password"
            value={pw}
            onChange={onChangePW}
            onKeyPress={onKeyPress}
          ></input>
        </div>
        <div className="login">
          <button type="submit" onClick={Login}>
            로그인
          </button>
        </div>
        <div className="searchAndJoin">
          <button onClick={handleOpenSearchPasswordModal}>PW찾기</button>
          <div style={{ color: "white", margin: "7px" }}>|</div>
          <Link to="/Join" style={{ color: "white" }}>
            회원가입
          </Link>
        </div>
        {/* <div className="apiLogin">
          <div className="naver-logo"></div>
          <div className="kakao-logo"></div>
        </div> */}
      </div>

      <SearchPassword
        isOpen={isModalOpen}
        handleClose={handleCloseSearchPasswordModal}
      />
    </div>
  );
};

export default Login;
