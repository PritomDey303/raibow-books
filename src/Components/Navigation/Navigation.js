import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import RainbowText from "react-rainbow-text";
import { Link } from "react-router-dom";
import { BookContext } from "../../App";

function Navigation() {
  const [, , LoggedInUser] = useContext(BookContext);

  return (
    <div>
      <Navbar sticky="top" collapseOnSelect expand="lg" variant="light">
        <Container>
          <Navbar.Brand to="/home">
            <h3>
              <RainbowText lightness={0.5} saturation={1}>
                Rainbow Books
              </RainbowText>
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Link className="px-3 py-2 text-dark" to="/home">
                Home
              </Link>
              <Link to="/orders" className="px-3 py-2 text-dark">
                Orders
              </Link>
              <Link to="/admin" className="px-3 py-2 text-dark">
                Admin
              </Link>
              <Link to="/checkout/0" className="px-3 py-2 text-dark">
                Check Out
              </Link>
              <Link
                to="/login"
                className="px-3 py-2 bg-primary rounded text-light"
              >
                {LoggedInUser.displayName ? LoggedInUser.displayName : "Login"}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
