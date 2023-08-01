// // Login.js
// /* eslint-disable */
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import SearchPassword from "../../components/Common/SearchPassword";
// import "./Login.css";
// import { Box } from "@mui/material";
// import axios from "axios";
// <<<<<<< HEAD

// const Home = () => {
//   let navigate = useNavigate();
// =======
// import { setCookie } from "../../utils/cookie";
// import { doLogin } from "../../store";
// import { useDispatch, useSelector } from "react-redux";

// const Home = () => {
//   let dispatch = useDispatch();
// >>>>>>> f1b6cd2f7842963ff167cfbdbe05c0b8a0b7cbe0

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenSearchPasswordModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseSearchPasswordModal = () => {
//     setIsModalOpen(false);
//   };

//   // id 파트
//   const [id, setId] = useState("");
//   const onChangeId = e => {
//     setId(e.target.value);
//     console.log(id);
//   };

//   // pw 파트
//   const [pw, setPW] = useState("");
// <<<<<<< HEAD
//   const onChangePW = e => {
//     setPW(e.target.value);
//   };

//   const onKeyPress=e=>{
//     if(e.key==="Enter"){
//       login();
//     }
//   }

//   const login = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/member/login", {
//         email: id,
//         password: pw,
//       });

//       if (response.data.accessToken) {
//         window.alert("로그인을 성공하였습니다!");
//         navigate("/");
//       } else {
//         window.alert("로그인에 실패하였습니다!");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         window.alert("잘못된 이메일 또는 비밀번호입니다!");
//       } else {
//         window.alert("서버와의 통신 중 에러가 발생했습니다!");
//       }
// =======
//   const onChangePW = (e) => {
//     setPW(e.target.value);
//     console.log(pw);
//   };

//   let loginUser = useSelector((state) => {
//     return state.loginUser;
//   });

//   // 로그인
//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:8080/member/login", {
//         email: id,
//         password: pw,
//       });
//       // setCookie("refreshToken", res.data.refreshToken);
//       await setCookie("accessToken", res.data.accessToken);
//       console.log(loginUser);
//       console.log(res.data.nickname);
//       dispatch(
//         doLogin(res.data.nickname, res.data.points, res.data.profile_img_seq)
//       );
//       console.log(loginUser);
//     } catch (error) {
//       console.log(error);
// >>>>>>> f1b6cd2f7842963ff167cfbdbe05c0b8a0b7cbe0
//     }
//   };

//   return (
//     <div className="bg">
//       <div className="outer">
//         <div className="logo">
//           <img src="images/Mypage_Logo.png"></img>
//         </div>

//         <div className="input">
//           <input
//             type="text"
//             placeholder="ID(이메일)"
//             value={id}
//             onChange={onChangeId}
//             onKeyPress={onKeyPress}
//           ></input>
//         </div>
//         <div className="input">
//           <input
//             placeholder="비밀번호"
//             type="password"
//             value={pw}
//             onChange={onChangePW}
//             onKeyPress={onKeyPress}
//           ></input>
//         </div>
//         <div className="login">
// <<<<<<< HEAD
//           <button type="submit" onClick={login}>로그인</button>
// =======
//           <button onClick={login}>로그인</button>
// >>>>>>> f1b6cd2f7842963ff167cfbdbe05c0b8a0b7cbe0
//         </div>
//         <div className="searchAndJoin">
//           <button onClick={handleOpenSearchPasswordModal}>PW찾기</button>
//           <Box
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "50vh",
//               overflow: "auto",
//             }}
//           ></Box>
//           <div>|</div>
//           <Link to="/Join">회원가입</Link>
//         </div>
//         <div className="apiLogin">
//           <div className="naver-logo"></div>
//           <div className="kakao-logo"></div>
//         </div>
//       </div>

//       <SearchPassword
//         isOpen={isModalOpen}
//         handleClose={handleCloseSearchPasswordModal}
//       />
//     </div>
//   );
// };

// export default Home;
/* eslint-disable */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchPassword from "../../components/Common/SearchPassword";
import "./Login.css";
import { Box } from "@mui/material";
import axios from "axios";
import { setCookie } from "../../utils/cookie";
import { doLogin } from "../../store";
import { useDispatch, useSelector } from "react-redux";

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
  const onChangeId = e => {
    setId(e.target.value);
  };

  // pw 파트
  const [pw, setPW] = useState("");
  const onChangePW = e => {
    setPW(e.target.value);
  };

  let loginUser = useSelector((state) => {
    return state.loginUser;
  });

  const onKeyPress = e => {
    if(e.key === "Enter"){
      login();
    }
  }

  // 로그인
  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/member/login", {
        email: id,
        password: pw,
      });

      if (response.data.accessToken) {
        window.alert("로그인을 성공하였습니다!");
        await setCookie("accessToken", response.data.accessToken);
        // dispatch(
        //   doLogin(response.data.nickname, response.data.points, response.data.profile_img_seq)
        // );
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
          <button type="submit" onClick={login}>로그인</button>
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
