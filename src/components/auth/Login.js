import React, { useRef } from "react";
// import "./Login.css";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import getAccessToken from "../auth/SpotifyLogin";
import { Button, Form, FormGroup, Label, Input, Jumbotron } from "reactstrap";

const Login = (props) => {
  const username = useRef();
  const password = useRef();
  const { login } = useSimpleAuth();

  // Simplistic handler for login submit
  const handleLogin = (e) => {
    e.preventDefault();

    /*
            For now, just store the username and password that
            the customer enters into local storage.
        */
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };

    login(credentials).then(() => {
      getAccessToken();
      //   props.history.push({
      //     pathname: "/spotify-connect",
      //   });
    });
  };

  return (
    <main>
      <div id="login-container">
        {/* <h1 className="h3 mb-3 font-weight-normal" id="login-header">
          Please sign in
        </h1> */}
        <Jumbotron id="login-jumbotron">
          <h1 className="display-3" id="login-header">
            Please sign in
          </h1>
          <hr className="my-2" />
          <form className="form--login" onSubmit={handleLogin} id="login-form">
            <fieldset>
              <label htmlFor="inputUsername"> Username </label>
              <input
                ref={username}
                type="username"
                // name="username"
                id="username"
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputPassword"> Password </label>
              <input
                ref={password}
                type="password"
                // name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </fieldset>
            <fieldset>
              <Button color="primary" type="submit">
                Sign in
              </Button>
            </fieldset>
          </form>
          {/* <p className="lead">
            This is a simple hero unit, a simple Jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-2" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p> */}
        </Jumbotron>
      </div>
      {/* <Form className="form--login" onSubmit={handleLogin} id="login-form">
        <FormGroup>
          <Label htmlFor="inputUsername"> Username </Label>
          <Input
            ref={username}
            type="username"
            // name="username"
            // id="username"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="inputPassword"> Password </Label>
          <Input
            ref={password}
            type="password"
            // name="password"
            // id="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </FormGroup>
        <Button color="primary" type="submit" onClick={handleLogin}>Sign in</Button>
      </Form> */}
      {/* <form className="form--login" onSubmit={handleLogin} id="login-form">
        <fieldset>
          <label htmlFor="inputUsername"> Username </label>
          <input
            ref={username}
            type="username"
            // name="username"
            id="username"
            className="form-control"
            placeholder="Username"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            // name="password"
            id="password"
            className="form-control"
            placeholder="Password"
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
export default Login;
