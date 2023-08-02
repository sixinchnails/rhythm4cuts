// Login.js
/* eslint-disable */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchPassword from "../../components/Common/SearchPassword";
import "./Login.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../apis/login";
// import { loginHandler } from "../../store";
import { setCookie } from "../../utils/cookie";

const Home = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

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

  // 로그인 유저 정보
  let loginUser = useSelector((state) => {
    return state.loginUser;
  });

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

  // 로그인
  const Login = async () => {
    try {
      const result = await login(id, pw);
      console.log(result);
      if (result.status === 200) {
        window.alert("로그인을 성공하였습니다!");
        // dispatch(loginHandler(result.data));
        setCookie("access", result.data.accessToken);
        setCookie("refresh", result.data.refreshToken);
        // setCookie("email", result.data.email);
        navigate("/");
      } else {
        window.alert("로그인에 실패하였습니다!");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        window.alert("잘못된 이메일 또는 비밀번호입니다!");
      } else {
        window.alert("서버와의 통신 중 에러가 발생했습니다!");
      }
    }
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
          <button type="submit" onClick={login}>
            로그인
          </button>
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
          <div className="naver-logo"></div>
          <div className="kakao-logo"></div>
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
