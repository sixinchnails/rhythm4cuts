// MyPoint.js
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";
import LoginMypageHeader from "../../components/Home/BlackHeader";
import Sidebar from "../../components/My/My_SideBar";
import "../../components/My/My_Friend.css";
import "./MyPoint.css";
import { useWebSocket } from "../../utils/WebSocket/WebSocket";

const MyPoint = () => {
  //누적 포인트
  const [pointSum, setPointSum] = useState("");

  const { connectWebSocket } = useWebSocket(); // 웹소켓 연결 함수 가져오기

  // 보유 포인트
  const [point, setPoint] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    connectWebSocket();
  }, []);

  //로그인 상태 확인

  try {
    userInfo()
      .then(res => {
        if (res.status === 200) {
          setPoint(res.data.point);
          setPointSum(res.data.score_sum);
        }
      })
      .catch(error => {
        window.alert("로그인을 해주세요!");
        navigate("/");
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
      <div className="page-container">
        <Sidebar></Sidebar>
        <div className="point-container">
          <span className="accumulate-point">누적 포인트</span>
          <span className="point">
            <img
              src="/images/pointFont0.png"
              alt="Font"
              className="pointFont"
            />
            {pointSum}포인트
          </span>
          <span className="accumulate-point">보유 포인트</span>
          <span className="point">
            <img
              src="/images/pointFont0.png"
              alt="Font"
              className="pointFont"
            />
            {point}포인트
          </span>
          <div className="table-container">
            <table className="table">
              <thead
                style={{ fontFamily: "Pretendard-Regular", fontWeight: "bold" }}
              >
                <tr>
                  <th>번호</th>
                  <th>이용서비스</th>
                  <th>구분</th>
                  <th>포인트 내역</th>
                  <th>적립/사용일</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "Pretendard-Regular" }}>
                <tr>
                  <td>1</td>
                  <td>게임 플레이</td>
                  <td>적립</td>
                  <td>100</td>
                  <td>2023-07-12</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>무료 다운로드</td>
                  <td>사용</td>
                  <td>200</td>
                  <td>2023-07-12</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>게임 플레이</td>
                  <td>적립</td>
                  <td>100</td>
                  <td>2023-07-12</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>게임 플레이</td>
                  <td>적립</td>
                  <td>100</td>
                  <td>2023-07-12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPoint;
