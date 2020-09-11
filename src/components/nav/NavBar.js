import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import "./Nav.css";
import getAccessToken from "../auth/SpotifyLogin";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <>
      <div>
        <header>
          <h1>MUSIC APP</h1>
        </header>
      </div>
      <nav>
        <ul>
          {/* <img
          className="logobang"
          src={require("../../Bangazon.png")}
          alt="logo"
        /> */}
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
          <li>
            <button onClickCapture={getAccessToken}>
              Connect Spotify Account
            </button>
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
      </nav>
    </>
  );
};

export default NavBar;
