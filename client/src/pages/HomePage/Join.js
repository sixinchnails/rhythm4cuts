// Home.js
import React, { useEffect } from "react";
import "./Join.css";
import JoinImage from "../../components/My/My_JoinImage";
import JoinInfo from "../../components/My/My_JoinInfo";
import Button from "@mui/material/Button";
import Header from "../../components/Home/Header";

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#F8E8EE";
    // 컴포넌트 unmount 시점에 원래의 배경색으로 되돌리기 위한 cleanup 함수
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
  return (
    <div>
      {/* 위쪽 컨테이너 */}
      <Header></Header>
      <div style={{ display: "flex" }}>
        {/* flex style을 줘서 각각 다른 박스로 만들어 좌우로 배치할 수 있게 해준다. 
        flex가 없으면 사진 선택 밑으로 JoinInfo 컴포넌트가 들어감.*/}
        <JoinImage initialImage="/images/회원.png" />
        <JoinInfo />
        {/* <div> */}
        {/* </div> */}
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
      >
        가입 완료
      </Button>
    </div>
  );
};

export default Home;
