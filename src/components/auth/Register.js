import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import "./Login.css";
import getAccessToken from "../auth/SpotifyLogin";
import { Button, Jumbotron } from "reactstrap";

const Register = (props) => {
  const email = useRef();
  const userName = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const { register } = useSimpleAuth();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      username: userName.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    register(newUser).then(() => {
      getAccessToken();
      // props.history.push({
      // 	pathname: "/",
      // });
    });
  };

  // const spotifyUserFetch = () => {
  //     return fetch("https://api.spotify.com/v1/me", {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`
  //         }
  //     }).then((response) => response.json());
  // };

  // const getSpotifyUser = (e) => {
  //     e.preventDefault();

  //     spotifyUserFetch().then((object) => {
  //         console.log(object)
  //         const spotifyUserToAdd = { ...userSpotify}
  //         spotifyUserToAdd["display_name"] = object.display_name;
  //         spotifyUserToAdd["spotify_id"] = object.id;
  //         spotifyUserToAdd["profile_picture"] = object.images[0].url
  //         setUserSpotify(spotifyUserToAdd)
  //     })
  // }

  // const [userSpotify, setUserSpotify] = useState({
  //     display_name: "",
  //     spotify_id: "",
  //     profile_picture: ""
  // })

  // const handleSpotifyUser = (object) => {
  //     const spotifyUserToAdd = { ...userSpotify }
  //     spotifyUserToAdd["display_name"] =
  // }

  return (
    <main>
      <div id="register-container">
        <Jumbotron id="register-jumbotron">
          <h1 className="display-3" id="register-header">Register</h1>
          <hr className="my-2" />
          <form
            className="form--login"
            id="register-form"
            onSubmit={handleRegister}
          >
            <fieldset>
              <label htmlFor="userName"> Username </label>
              <input
                ref={userName}
                type="text"
                name="userName"
                id="userName"
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputEmail"> Email address </label>
              <input
                ref={email}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputPassword"> Password </label>
              <input
                ref={password}
                type="password"
                name="password"
                id="passWord"
                className="form-control"
                placeholder="Password"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="verifyPassword"> Verify Password </label>
              <input
                ref={verifyPassword}
                type="password"
                name="verifyPassword"
                id="verifyPassword"
                className="form-control"
                placeholder="Verify password"
                required
              />
            </fieldset>
            <fieldset>
              <Button color="primary" type="submit">
                Sign in
              </Button>
            </fieldset>
          </form>
        </Jumbotron>
      </div>
      {/* <form
        className="form--login"
        id="register-form"
        onSubmit={handleRegister}
      >
        <fieldset>
          <label htmlFor="userName"> Username </label>
          <input
            ref={userName}
            type="text"
            name="userName"
            id="userName"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            id="passWord"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <Button color="primary" type="submit">
            Sign in
          </Button>
        </fieldset>
      </form> */}
    </main>
  );
};
export default withRouter(Register);
