import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg">
      <Container className="justify-content-start">
        <Navbar.Brand href="/">
          <img
            src="/images/Mypage_Logo.png"
            width="300"
            height="100"
            alt='헤더 로고'
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
