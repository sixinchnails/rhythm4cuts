import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "pink" }} className="mr-auto">
          리듬네컷
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="MyPage" style={{ color: "pink" }}>
            My Page
          </Nav.Link>
          <Nav.Link href="Join" style={{ color: "pink" }}>
            Join
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
