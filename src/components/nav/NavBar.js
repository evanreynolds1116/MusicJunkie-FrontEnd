import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import "./Nav.css";
import getAccessToken from "../auth/SpotifyLogin";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div>
        <header>
          <h1>MUSIC APP</h1>
        </header>
      </div>
      {/* <nav>
        <ul>
          <img
          className="logobang"
          src={require("../../Bangazon.png")}
          alt="logo"
        />
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/top-songs">Top Songs</Link>
          </li>
          <li>
            <Link to="/top-artists">Top Artists</Link>
          </li>
          <li>
            <Link to="/favorite-albums">Favorite Albums</Link>
          </li>
          <li>
            <Link to="/music-recommendations">Music Recommendation</Link>
          </li>
          {isAuthenticated() ? (
            <li className="nav-item">
              <button
                className="nav-link fakeLink"
                onClick={() => {
                  logout();
                  props.history.push({
                    pathname: "/",
                  });
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button onClickCapture={getAccessToken}>
                  Connect Spotify Account
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav> */}
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
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
                <NavLink href="/music-recommendations">
                  Song Recommendation
                </NavLink>
              </NavItem>
              {isAuthenticated() ? (
                <NavItem>
                  <NavLink
                    onClick={() => {
                      logout();
                      props.history.push({ pathname: "/" });
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              ) : (
                <>
                  <NavItem>
                    <NavLink onClick={getAccessToken}>
                      Connect Spotify Account
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register">Register</NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
