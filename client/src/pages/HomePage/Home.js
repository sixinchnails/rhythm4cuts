// Home.js
import "animate.css";
import { React, useRef, useEffect } from "react";
import { Nav, Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import "./Home.css";

const DIVIDER_HEIGHT = 5;
const Home = () => {
  const outerDivRef = useRef();
  useEffect(() => {
    const wheelHandler = (e) => {
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
        <Container className="main1">
          <Nav>
            <div className="Logo">
              <img
                className="img"
                alt="Home_Effect2"
                src="images/Home_Effect2.png"
              ></img>
            </div>
          </Nav>
          <Nav>
            <div className="playBtn">
              <a href="/GameList">
                <img
                  className="play"
                  alt="Home_Play"
                  src="images/Home_Play.png"
                ></img>
              </a>
            </div>
          </Nav>
        </Container>
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
          <div>
            <h1>Music Rank</h1>
            <div className="rt_sing_rank">a</div>
          </div>
          <div>
            <h1>Total Rank</h1>
            <div className="total_rank">a</div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {/** Home 4 시작하는 곳 */}
      <div className="Home4"></div>
    </div>
  );
};

export default Home;
