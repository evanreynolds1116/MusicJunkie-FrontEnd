import React, { useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./NavBar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div id="header-div">
        <header>
          <h1>MUSIC JUNKIE</h1>
        </header>
      </div>
      <div>
        <Navbar dark expand="md" id="navbar">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isAuthenticated() ? (
                <>
                  <NavbarBrand href="/home">Home</NavbarBrand>
                  <NavItem>
                    <NavLink href="/top-songs">Top Songs</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/top-artists">Top Artists</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/favorite-albums">Favorite Albums</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/music-recommendation">
                      Song Recommendations
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register">Register</NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
            {isAuthenticated() ? (
              <NavLink
                href="/"
                onClick={() => {
                  logout();
                  props.history.push({ pathname: "/" });
                }}
              >
                Logout
              </NavLink>
            ) : (
              <p></p>
            )}
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
