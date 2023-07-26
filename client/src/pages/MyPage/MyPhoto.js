// Home.js
import React, { useEffect } from "react";
import Sidebar from "../../components/My/My_SideBar";
import Header from "../../components/Home/Header";
import "./MyPhoto.css";
import ImageByMonth from "../../components/My/My_Image";

const Home = () => {
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
      <Header></Header>
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

export default Home;
