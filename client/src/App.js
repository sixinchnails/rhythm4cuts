import React from "react";
import { Routes, Route } from "react-router-dom"; //Link,
import { Provider } from "react-redux";
import store from "./store";

import Home from "./pages/HomePage/Home";
import Join from "./pages/HomePage/Join";
import Login from "./pages/HomePage/Login";

import GameList from "./pages/GamePage/GameList";
import GameWait from "./pages/GamePage/GameWait";
import GamePlay from "./pages/GamePage/GamePlay";
import GameScore from "./pages/GamePage/GameScore";
import GameShot from "./pages/GamePage/GameShot";

import MyPage from "./pages/MyPage/Mypage";
import MyFriend from "./pages/MyPage/MyFriend";
import MyPoint from "./pages/MyPage/MyPoint";
import MyPhoto from "./pages/MyPage/MyPhoto";
import MyModify from "./pages/MyPage/MyModify";

function App() {
  return (
    <Provider store={store}>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Join">Join</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/GameList">GameList</Link>
          </li>
          <li>
            <Link to="/GameWait">GameWait</Link>
          </li>
          <li>
            <Link to="/GamePlay">GamePlay</Link>
          </li>
          <li>
            <Link to="/GameScore">GameScore</Link>
          </li>
          <li>
            <Link to="/GameShot">GameShot</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/MyPage">MyPage</Link>
          </li>
          <li>
            <Link to="/MyFriend">MyFriend</Link>
          </li>
          <li>
            <Link to="/MyPoint">MyPoint</Link>
          </li>
          <li>
            <Link to="/MyPhoto">MyPhoto</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />

        <Route path="/GameList" element={<GameList />} />
        <Route path="/GameWait" element={<GameWait />} />
        <Route path="/GamePlay" element={<GamePlay />} />
        <Route path="/GameScore" element={<GameScore />} />
        <Route path="/GameShot" element={<GameShot />} />

        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyFriend" element={<MyFriend />} />
        <Route path="/MyPoint" element={<MyPoint />} />
        <Route path="/MyPhoto" element={<MyPhoto />} />
        <Route path="/MyModify" element={<MyModify />} />

      </Routes>
    </Provider>
  );
}

export default App;
