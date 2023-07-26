// Home.js
/* eslint-disable */
import "animate.css";
import { React, useRef, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Home.css";

const DIVIDER_HEIGHT = 5;
const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const outerDivRef = useRef();
  useEffect(() => {
    const wheelHandler = e => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <div ref={outerDivRef} className="outer">
      {/** Home 1 시작하는 곳 */}
      <div className="Home1">
        <Header />
        <div className="main1">
          <div className="beatbox">
            <div className="Logo">
              <img
                className="img"
                alt="Home_Effect2"
                src="images/Home_Effect2.png"
              ></img>
            </div>
          </div>
          <div>
            <div className="playBtn">
              <a href="/GameList">
                <img
                  className="play"
                  alt="Home_Play"
                  src="images/Home_Play.png"
                ></img>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {/** Home 2 시작하는 곳 */}
      <div className="Home2">
        <h1>Game Intro & Rules</h1>
        <div className="content">
          <div className="intro"></div>
          <div className="rules"></div>
        </div>
      </div>
      <div className="divider"></div>
      {/** Home 3 시작하는 곳 */}
      <div className="Home3">
        <div className="content">
          <div className="rank1">
            <h1>Music Rank</h1>
            <div className="rt_sing_rank">
              <div className="category">
                <span>순위</span>
                <span>제목</span>
                <span>가수</span>
              </div>
            </div>
          </div>
          <div className="rank2">
            <h1>Total Rank</h1>
            <div className="total_rank"></div>
            <div className="nickname">
              <span>1등</span>
              <span>2등</span>
              <span>3등</span>
            </div>
            <div className="top100">
              <div className="category">
                <span>순위</span>
                <span>닉네임</span>
                <span>점수</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {/** Home 4 시작하는 곳 */}
      <div className="Home4">
        <div className="sideBar">
          <div className="title">
            <span>Today 방명록</span>
          </div>
          <div className="calender">
            <DatePicker
              className="datePicker"
              dateFormat="yyyy.MM.dd" // 날짜 형태
              shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </div>
        </div>
        <div className="content">
          <div className="line1">
            <div className="picture"></div>
            <div className="picture"></div>
            <div className="picture"></div>
            <div className="picture"></div>
          </div>
          <div className="line2">
            <div className="picture"></div>
            <div className="picture"></div>
            <div className="picture"></div>
            <div className="picture"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const picture = () => {
//   return(
//     <div>

//     </div>
//   )
// };

export default Home;
