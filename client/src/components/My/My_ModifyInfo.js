/* eslint-disable */
import "./My_ModifyInfo.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNickname, updatePassword, updateProfilePic } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/cookie";

function UserInfo(props) {
  const Info = useSelector((state) => state.MyPage_MyInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //라우터

  // 상태 변수 추가
  const [nicknameEdit, setNicknameEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  // 값들 불러오기
  const nicknameItem = Info.find((item) => item.name === "닉네임");
  const passwordItem = Info.find((item) => item.name === "비밀번호");
  const profilePic = Info.find((item) => item.name === "프로필 사진")?.value;

  // 비밀번호 수정 관련 상태 변수 추가
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  // 비밀번호 확인 관련 상태 변수 추가
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const fileInput = useRef();

  const [selectedImage, setSelectedImage] = useState(profilePic);

  const handleComplete = () => {
    if (!isValidPassword && password.length > 0) {
      // 비밀번호가 비어있지 않으면서 형식이 잘못된 경우에만 메시지 표시
      window.alert("비밀번호 형식을 확인해주세요");
      return;
    }
    const confirmed = window.confirm("수정을 완료하시겠습니까?");
    if (confirmed) {
      handlePasswordUpdate(confirmPassword);
      handleProfilePicUpdate(selectedImage);
      window.alert("수정이 완료되었습니다.");
      navigate("/Mypage");
    }
  };

  const handlePasswordUpdate = (newPassword) => {
    if (newPassword === "") {
      newPassword = passwordItem.value; // if no new password is provided, use the original one
    }
    dispatch(updatePassword(newPassword));
  };

  const handleProfilePicUpdate = (newProfilePic) => {
    dispatch(updateProfilePic(newProfilePic));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileOpen = () => {
    fileInput.current.click();
  };

  // 비밀번호 유효성 검사 함수
  const checkPassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    // 비밀번호가 비어있지 않은 경우에만 유효성 검사 수행
    setIsValidPassword(checkPassword(password));
    setIsMatchPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  //닉네임 인증
  const [nickNameCheckStatus, setNickNameCheckStatus] = useState(false);

  const nickNameCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/member/nickname?nickname=${nickname}`
      );
      if (response.data.duplicate === false) {
        setNickNameCheckStatus(true);
        window.confirm("사용 가능한 닉네임입니다.");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      window.confirm("사용중인 닉네임입니다.");
    }
  };

  //닉네임 변경
  const nickNameModify = async () => {
    const access = getCookie("access");
    try {
      if (nickNameCheckStatus) {
        const response = await axios.patch(
          "http://localhost:8080/member/nickname",
          {
            email: getCookie("email"),
            nickname: nickname,
          },
          {
            headers: {
              Authorization: "Bearer " + access,
            },
          }
        );
        if (response.status === 200) {
          window.confirm("닉네임이 변경되었습니다.");
          setNicknameEdit(!nicknameEdit);
          navigate("/MyModify");
        } else {
          throw new Error();
        }
      } else {
        window.confirm("닉네임 중복 확인을 해주세요.");
      }
    } catch (error) {
      console.log(error);
      window.confirm("닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <div className="mainn-container">
      <div className="modify-info-container">
        <div className="modify-info">
          <div className="modify-item">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <span className="modify-name">닉네임</span>
              <span className="modify-value">{props.nickName}</span>
              <Button
                className="modify-value-button"
                style={{ left: "170px" }}
                onClick={() => setNicknameEdit(!nicknameEdit)}
              >
                수정
              </Button>
            </div>
            {nicknameEdit && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  right: "100px",
                  top: "30px",
                  position: "absolute",
                  width: "600px",
                }}
              >
                <span className="modify-nickName-name">닉네임 수정</span>
                <input
                  type="text"
                  className="modify-input"
                  value={nickname}
                  placeholder={props.nickName}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setNickNameCheckStatus(false);
                  }}
                />
                <Button
                  color="primary"
                  style={{ minWidth: "90px", top: "20px" }}
                  onClick={nickNameCheck}
                >
                  중복 확인
                </Button>
                <Button
                  color="warning"
                  style={{ minWidth: "50px", top: "20px" }}
                  onClick={nickNameModify}
                >
                  완료
                </Button>
              </div>
            )}
          </div>
          <div className="modify-item">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="modify-name">비밀 번호</span>
              <span className="modify-value">
                {"*".repeat(passwordItem.value.length)}
              </span>

              <Button
                className="modify-value-button"
                style={{ left: "160px" }}
                onClick={() => setPasswordEdit(!passwordEdit)}
              >
                수정
              </Button>
            </div>
            {passwordEdit && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    right: "100px",
                    top: "30px",
                    position: "absolute",
                    width: "600px",
                  }}
                >
                  <span className="modify-password-name">비밀번호 수정</span>
                  <input
                    type="password"
                    className="modify-input"
                    placeholder="영어,숫자,특수 기호 포함 8자리 이상"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isValidPassword && password && (
                    <img
                      src={"/images/체크.png"}
                      alt="Check"
                      className="Join-check"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginTop: "35px",
                      }}
                    />
                  )}
                  {!isValidPassword && password && (
                    <img
                      src={"/images/오답.png"}
                      alt="Check"
                      className="Join-check"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginTop: "35px",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    right: "100px",
                    top: "90px",
                    position: "absolute",
                    width: "600px",
                  }}
                >
                  <span className="modify-password-name">비밀번호 확인</span>
                  <input
                    type="password"
                    className="modify-input"
                    placeholder="영어,숫자,특수 기호 포함 8자리 이상"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    color="warning"
                    style={{
                      minWidth: "50px",
                      top: "20px",
                      marginLeft: "100px",
                    }}
                    onClick={nickNameModify}
                  >
                    완료
                  </Button>
                  {password === confirmPassword && confirmPassword && (
                    <img
                      src={"/images/체크.png"}
                      alt="Check"
                      className="Join-check"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginTop: "35px",
                      }}
                    />
                  )}
                  {password !== confirmPassword && confirmPassword && (
                    <img
                      src={"/images/오답.png"}
                      alt="Check"
                      className="Join-check"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginTop: "35px",
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile-container">
          <img className="profile-picture" src={selectedImage} alt="Profile" />
          <div>
            <Button
              variant="contained"
              color="primary"
              className="modify-button"
              style={{
                backgroundColor: "#F2BED1",
                color: "#000000",
                fontWeight: "bold",
              }}
              onClick={handleFileOpen}
            >
              사진 변경
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={handleFileChange}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="complete-button"
            style={{
              backgroundColor: "#F2BED1",
              color: "#000000",
              fontWeight: "bold",
            }}
            onClick={handleComplete}
          >
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
