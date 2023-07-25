import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" href="/">
          <img
            src="/images/Mypage_Logo.png"
            width="240"
            height="80"
            alt="Game Header Logo"
            className="d-inline-block align-top"
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
