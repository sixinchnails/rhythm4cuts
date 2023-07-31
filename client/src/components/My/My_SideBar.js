// 독립적인 사이드바 아이템들을 하나씩 모아 사이드바를 만듦
import React from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./My_SideBarItem";

function Sidebar() {
  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;

  const menus = [
    {
      name: "My 회원 정보",
      subMenu: [
        { name: "가입 정보", path: "/Mypage" },
        { name: "친구 정보", path: "/MyFriend" },
        { name: "Point 정보", path: "/MyPoint" },
      ],
    },
    { name: "My Photo", path: "/MyPhoto" },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        const isTitle =
          menu.name === "My 회원 정보" || menu.name === "My Photo";
        // 'My 회원 정보' 또는 'My Photo'일 때 true
        return (
          <div key={index}>
            <SidebarItem
              menu={menu}
              isActive={pathName === menu.path}
              isTitle={isTitle}
            />
            {menu.subMenu &&
              menu.subMenu.map((subItem, subIndex) => (
                <SidebarItem
                  menu={subItem}
                  isActive={pathName === subItem.path}
                  isSub={true}
                  //마지막 point 정보의 props를 전달
                  lastSubItem={subIndex === menu.subMenu.length - 1}
                  key={subIndex}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}
export default Sidebar;
