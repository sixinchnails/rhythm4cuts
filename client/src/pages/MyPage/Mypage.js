// Mypage.js
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/My/My_SideBar";
import "./Mypage.css";
// 마이 페이지들 import
import { userInfo } from "../../apis/userInfo";
import CheckUserToModiInfo from "../../components/Common/CheckUserToModiInfo";
import LoginMypageHeader from "../../components/Home/BlackHeader";
import MainContent from "../../components/My/My_MainContent"; // MainContent 컴포넌트를 import
import UserInfo from "../../components/My/My_UserInfo"; // UserInfo 컴포넌트를 import
import Button from "@mui/material/Button";

const Mypage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSearchPasswordModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseSearchPasswordModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  //이름
  const [name, setName] = useState("");

  //닉네임
  const [nickName, setNickName] = useState("");

  //성별
  const [gender, setGender] = useState("");

  //사진 seq 번호
  const [photo, setPhoto] = useState("");

  // 로그인 상태 확인
  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          setNickName(res.data.nickname);
          setName(res.data.name);
          setGender(res.data.gender);
          setPhoto(res.data.profile_img_seq);
        }
      })
      .catch((error) => {
        navigate("/");
        window.alert("로그인을 해주세요!");
      });
  } catch (error) {
    console.log(error);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(to right, rgb(123,123,255), rgb(255,123,123))",
      }}
    >
      <LoginMypageHeader />
      {/* 사이드바와 메인 제목을 수평으로 배치하기 위해서는 Flexbox 또는 CSS Grid를 사용해야한다.
      그럴려면 사이드 바와 메인 제목을 감싸고 있는 부모 요소가 필요하다.
      그 부모 요소는 사이드 바와 메인 제목을 자식 요소로 갖고, 이 자식 요소들을 수평으로 배치한다. */}
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="main-container">
          <MainContent></MainContent>
          <UserInfo
            name={name}
            nickName={nickName}
            gender={gender}
            photo={photo}
          />
          {/* UserInfo 컴포넌트를 사용하여 사용자 정보를 표시합니다. */}
        </div>
        <div className="buttons">
          {/* 정보 수정 버튼을 누르면 MyModify페이지로 넘어가게 해준다 */}
          <Button
            variant="contained"
            color="primary"
            className="edit-button"
            onClick={handleOpenSearchPasswordModal}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            정보 수정
          </Button>
          <Button
            variant="contained"
            color="error"
            className="delete-button"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            회원 탈퇴
          </Button>
        </div>
      </div>

      <CheckUserToModiInfo
        isOpen={isModalOpen}
        handleClose={handleCloseSearchPasswordModal}
      />
    </div>
  );
};

export default Mypage;
