import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./My_JoinImage.css";

const JoinImage = ({ initialImages, onImageSelect }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 선택된 이미지의 인덱스를 상태로 관리

  const handleImageChange = index => {
    if (onImageSelect) {
      onImageSelect(index + 1); // 이미지가 선택될 때마다 부모 컴포넌트에게 선택된 이미지의 인덱스 + 1을 전달
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
      <h1 className="Join-Content">회원 가입</h1>
      <div style={{ width: "100%", marginLeft: "80px" }}>
        {/* 이 div를 추가하여 Carousel의 너비를 조정합니다. */}
        <Carousel showStatus={false} onChange={handleImageChange}>
          {initialImages.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt="User"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default JoinImage;
