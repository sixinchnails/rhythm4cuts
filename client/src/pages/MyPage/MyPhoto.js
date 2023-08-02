// MyPhoto.js
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/My/My_SideBar";
import "./MyPhoto.css";
import ImageByMonth from "../../components/My/My_Image";
import { userInfo } from "../../apis/userInfo";
import LoginMypageHeader from "../../components/Home/LoginMypageHeader";
import { useNavigate } from "react-router-dom";

const MyPhoto = () => {
  const navigate = useNavigate();

  //로그인 상태 확인
  const [isLogin, setIsLogin] = useState(false);

  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setIsLogin(true);
        }
      })
      .catch((error) => {
        window.alert("로그인을 해주세요!");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  }

  const imagesData = [
    {
      year: 2023,
      month: 3,
      images: [
        { src: "/images/네컷1.jpg", alt: "Image 1" },
        { src: "/images/네컷2.jfif", alt: "Image 2" },
        { src: "/images/네컷3.jfif", alt: "Image 2" },
      ],
    },
    {
      year: 2023,
      month: 2,
      images: [
        { src: "/images/네컷4.jfif", alt: "Image 1" },
        { src: "/images/네컷5.jfif", alt: "Image 2" },
      ],
    },
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#F8E8EE";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
  return (
    <>
      <LoginMypageHeader />
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="photo-container">
          {imagesData.map((data, index) => (
            <ImageByMonth
              key={index}
              month={data.month}
              year={data.year}
              images={data.images}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPhoto;
