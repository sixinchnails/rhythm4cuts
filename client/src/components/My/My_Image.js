import React from "react";
import "./My_Image.css";

// ImageByMonth component
// ImageByMonth component
const ImageByMonth = ({ month, year, images }) => {
  return (
    <div className="image-container">
      <h2>
        {year}년 {month}월
      </h2>
      <div className="images">
        {images.map((image, index) => (
          <div key={index} className="image-block">
            {/* image-block : 이미지와 다운로드 버튼을 하나의 블록으로 묶는다. */}
            <img src={image.src} alt={image.alt} className="image-size" />
            <a href={image.src} download className="download-btn">
              download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageByMonth;
