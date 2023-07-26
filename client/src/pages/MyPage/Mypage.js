// Home.js
import React, { useEffect } from "react";
import Header from "../../components/Home/Header";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./Mypage.css";
// 마이페이지들 import
import Mypage from "./Mypage";
import MyFriend from "./MyFriend";
import MyPhoto from "./MyPhoto";
import MyPoint from "./MyPoint";

const Home = () => {
  // 배경색 설정
  useEffect(() => {
    document.body.style.backgroundColor = "#f8e8ee";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <div>
      {/* navbar */}
      <Header />
      {/* 사이드바 */}
      <Sidebar></Sidebar>
      {/* 클릭 시 페이지로 넘어가게 하기 */}
      <Routes>
        <Route path="Mypage" element={<Mypage />} />
        <Route path="MyFriend" element={<MyFriend />} />
        <Route path="MyPoint" element={<MyPoint />} />
        <Route path="MyPhoto" element={<MyPhoto />} />
      </Routes>
    </div>
  );
};

function Sidebar() {
  const location = useLocation();
  const menus = [
    { name: "My 회원 정보", isTitle: true, isFirst: true },
    { name: "가입 정보", path: "/Mypage", isSubitem: true },
    { name: "친구 정보", path: "/MyFriend", isSubitem: true },
    { name: "point 정보", path: "/MyPoint", isSubitem: true, hasDivider: true },
    { name: "My Photo", path: "/MyPhoto", isTitle: true, hasTopPadding: true },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        const isActive = location.pathname === menu.path;
        return (
          <SidebarItem
            key={index}
            menu={menu}
            isActive={isActive}
            isTitle={menu.isTitle}
            isFirst={menu.isFirst}
            hasTopPadding={menu.hasTopPadding}
            isSubitem={menu.isSubitem}
          />
        );
      })}
    </div>
  );
}

// 사이드 바 글자 나타내게 하는 곳
function SidebarItem({
  menu,
  isActive,
  isTitle,
  isFirst,
  hasTopPadding,
  isSubitem,
}) {
  return (
    <div
      className={`sidebar-item 
        ${isTitle ? "menu-title" : ""} 
        ${menu.hasDivider ? "menu-divider" : ""} 
        ${isFirst ? "menu-first" : ""}
        ${hasTopPadding ? "menu-padding-top" : ""}
        ${isSubitem ? "menu-subitem" : ""}
        ${isActive ? "active" : ""}  /* New class for active state */
      `}
    >
      {menu.path ? (
        <Link
          to={menu.path}
          className={`link-item ${isActive ? "active" : ""}`}
          style={{
            textDecoration: "none",
            color: isActive ? "white" : "black",
            backgroundColor: isActive ? "black" : "transparent",
          }}
        >
          <p>{menu.name}</p>
        </Link>
      ) : (
        <p>{menu.name}</p>
      )}
    </div>
  );
}

export default Home;
