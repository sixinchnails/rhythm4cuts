import React from "react";
import Header from "../../components/Home/Header";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="Home">
        <div className="Home1">
          <Header />
          <div className="main1">
            <div className="Logo">
              <img
                className="img"
                alt="Home_Effect2"
                src="images/Home_Effect2.png"
              ></img>
            </div>
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
      <div className="Home">
        <div className="Home2"></div>
      </div>
      <div className="Home">
        <div className="Home3"></div>
      </div>
    </div>
  );
};

export default Home;
