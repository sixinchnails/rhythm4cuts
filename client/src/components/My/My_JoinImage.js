import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./My_JoinImage.css";

const JoinImage = ({ initialImages, onImageSelect }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 선택된 이미지의 인덱스를 상태로 관리

  const handleImageChange = index => {
    setSelectedImageIndex(index);
    if (onImageSelect) {
      onImageSelect(index + 1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
      <h1 className="Join-Content">회원 가입</h1>
      <div style={{ width: "100%", marginLeft: "80px" }}>
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
