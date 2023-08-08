// Home.js
/* eslint-disable */
import { React, useRef, useEffect, useState } from "react";
import { getCookie, setCookie } from "../../utils/cookie";
import { renewAccessToken } from "../../apis/renewAccessToken";
import { Grid, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../apis/userInfo";
import DatePicker from "react-datepicker";
import MusicRank from "../../components/Home/MusicRank";
import UserRank from "../../components/Home/UserRank";
import WhiteHeader from "../../components/Home/WhiteHeader"; // 로그인 되어있을 때
import Header from "../../components/Home/Header";
import Dots from "../../components/Home/Dots";
import "react-datepicker/dist/react-datepicker.css";
import "animate.css";
import "./Home.css";

const DIVIDER_HEIGHT = 5;

function Home() {
  const navigate = useNavigate();
  //로그인 상태 저장변수
  const [isLogin, setIsLogin] = useState(false);

  //로그인 상태 확인 및 유저 정보 불러오는 부분
  try {
    userInfo()
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setIsLogin(true);
          // 401은 access토큰이 틀린거
        } else if (res.status === 401) {
          console.log("access토큰이 틀렸습니다.");
          // 403은 access토큰이 만료된거
        } else if (res.status === 403) {
          console.log("accessToken이 만료되었습니다.");
          renewAccessToken().then((res) => {
            if (res.status === 200) {
              setCookie("access", res.accessToken);
              console.log("accessToken 재발급 완료");
              window.location.reload();
            } else if (res.status === 401) {
              console.log("refresh토큰이 틀렸습니다.");
            } else if (res.status === 403) {
              checkLogin();
              console.log("refresh토큰이 만료되었습니다.");
              window.confirm("로그인 기간이 만료되었습니다.");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLogin(false);
      });
  } catch (error) {
    console.log(error);
  }

  //로그아웃 관련 코드
  const checkLogin = async () => {
    try {
      const response = await axios.post(
        "/member/logout",
        {
          email: getCookie("email"),
          accessToken: access,
        },
        {
          headers: {
            Authorization: "Bearer " + access,
          },
        }
      );
      if (response.status === 200) {
        console.log("로그아웃 성공");
        removeCookie("access");
        removeCookie("refresh");
        removeCookie("email");
        window.location.reload();
      } else {
        window.confirm("1오류가 발생했습니다.");
      }
    } catch (error) {
      console.log(error);
      window.confirm("2오류가 발생했습니다.");
    }
  };

  const [startDate, setStartDate] = useState(new Date());
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  //음악 랭킹
  let music_rank = useSelector((state) => {
    return state.Music_Rank;
  });

  // 음악 개수 컨트롤러
  const musicPerPage = 15; // 한 페이지당 표시할 방 수
  const [musicPage, setMusicPage] = useState(1); // 페이지 상태

  // 음악 페이지 변경 이벤트 핸들러
  const handleMusicChange = (event, value) => {
    setMusicPage(value);
  };

  // 음악 페이지 수 계산
  const noOfMusicPages = Math.ceil(music_rank.length / musicPerPage);

  //유저 랭킹
  let user_rank = useSelector((state) => {
    return state.User_Rank;
  });

  // 유저 개수 컨트롤러
  const userPerPage = 8; // 한 페이지당 표시할 방 수
  const [userPage, setUserPage] = useState(1); // 페이지 상태

  // 유저페이지 변경 이벤트 핸들러
  const handleUserChange = (event, value) => {
    setUserPage(value);
  };

  // 음악 페이지 수 계산
  const noOfUserPages = Math.ceil(user_rank.length / userPerPage);

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
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
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
    <div className="background">
      <div className="background-image"></div>
      <div ref={outerDivRef} className="outer">
        <Dots scrollIndex={scrollIndex} />
        {/** Home 1 시작하는 곳 */}
        <div className="Home1">

          {isLogin ? <WhiteHeader /> : <Header />}
          
          <div className="main1">
            <div className="beatbox">
              <div className="Logo">
                <a href="/GameList">
                  <img
                    className="img"
                    alt="Home_Effect2"
                    src="images/dddd.png"
                  ></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        {/** Home 2 시작하는 곳 */}
        <div className="Home2">
          <div className="title">
            <span>Game Intro & Rules</span>
          </div>
          <div className="content">
            <div className="intro"></div>
            <div className="rules">
              <img style={{ height: 560, width: 514 }} src="images/Rules.png" />
            </div>
          </div>
        </div>
        <div className="divider"></div>
        {/** Home 3 시작하는 곳 */}
        <div className="Home3">
          <div className="content">
            <div className="rank1">
              <h1>Music Rank</h1>
              <div className="rt_sing_rank">
                <div>
                  <div className="category">
                    <Grid container textAlign="center">
                      <Grid item xs={2}>
                        순위
                      </Grid>
                      <Grid item xs={6}>
                        제목
                      </Grid>
                      <Grid item xs={4}>
                        가수
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="music_rank">
                  <div className="rank">
                    {music_rank
                      .slice(
                        (musicPage - 1) * musicPerPage,
                        musicPage * musicPerPage
                      )
                      .map((music, index) => (
                        <MusicRank key={index} music={music} />
                      ))}
                  </div>
                </div>
                <Pagination
                  count={noOfMusicPages}
                  page={musicPage}
                  onChange={handleMusicChange}
                  color="primary"
                  size="large"
                  shape="rounded"
                  sx={{
                    padding: "3%",
                    display: "flex",
                    justifyContent: "center",
                    "& .MuiPaginationItem-root": {
                      color: "white", // 기본 아이템 색상을 흰색으로 설정
                      backgroundColor: "rgba(0, 0, 0, 0.1)", // 기본 아이템의 배경색을 약간 투명한 검정색으로 설정
                    },
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: "#3f51b5", // 선택된 아이템의 배경색을 파란색으로 설정
                      color: "white", // 선택된 아이템의 텍스트 색상을 흰색으로 설정
                    },
                    "& .MuiPaginationItem-page:hover": {
                      backgroundColor: "#283593", // 마우스 호버 시 아이템의 배경색을 진한 파란색으로 설정
                    },
                  }}
                />
              </div>
            </div>
            <div className="rank2">
              <h1>Total Rank</h1>
              <div className="total_rank"></div>
              <div className="nickname">
                <span>{user_rank[0].nickName}</span>
                <span>{user_rank[1].nickName}</span>
                <span>{user_rank[2].nickName}</span>
              </div>
              <div className="top100">
                <div style={{ height: "20%" }}>
                  <div className="category">
                    <Grid container textAlign="center">
                      <Grid item xs={3.25}>
                        순위
                      </Grid>
                      <Grid item xs={5.5}>
                        닉네임
                      </Grid>
                      <Grid item xs={3.25}>
                        점수
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="user_rank">
                  <div className="rank">
                    {user_rank
                      .slice(
                        (userPage - 1) * userPerPage,
                        userPage * userPerPage
                      )
                      .map((user, index) => (
                        <UserRank key={index} user={user} />
                      ))}
                  </div>
                </div>
              </div>
              <Pagination
                count={noOfUserPages}
                page={userPage}
                onChange={handleUserChange}
                color="primary"
                size="large"
                shape="rounded"
                sx={{
                  padding: "3%",
                  display: "flex",
                  justifyContent: "center",
                  "& .MuiPaginationItem-root": {
                    color: "white", // 기본 아이템 색상을 흰색으로 설정
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // 기본 아이템의 배경색을 약간 투명한 검정색으로 설정
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#3f51b5", // 선택된 아이템의 배경색을 파란색으로 설정
                    color: "white", // 선택된 아이템의 텍스트 색상을 흰색으로 설정
                  },
                  "& .MuiPaginationItem-page:hover": {
                    backgroundColor: "#283593", // 마우스 호버 시 아이템의 배경색을 진한 파란색으로 설정
                  },
                }}
              />
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
                onChange={(date) => setStartDate(date)}
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
    </div>
  );
}

export default Home;
