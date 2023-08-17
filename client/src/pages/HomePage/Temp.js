import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { getCookie } from "../../utils/cookie";

function Temp() {
  const [image, setImage] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    console.log(image);
    console.log(typeof image);
  }, [webcamRef]);

  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("gameSeq", 122);
      formData.append("userSeq", 10);
      formData.append("playerRank", 1);
      formData.append("privateFilm", dataURLtoFile(image, "temp.jpg"));

      const headers = {
        Authorization: "Bearer " + getCookie("access"),
      };

      try {
        const response = await axios.post(
          "https://i9b109.p.ssafy.io:8443/film/private/film",
          formData,
          { headers }
        );
        console.log("Image uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          style={{ height: "50vh" }}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture Photo</button>
        {image && (
          <>
            {/* <img src={image} alt="Captured" /> */}
            <button onClick={uploadImage}>Upload</button>
          </>
        )}
      </header>
    </div>
  );
}

function dataURLtoFile(dataURL, filename) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export default Temp;
