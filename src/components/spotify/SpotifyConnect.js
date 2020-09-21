import React from "react";
import { Button } from "reactstrap";
import getAccessToken from "../auth/SpotifyLogin";

const SpotifyConnect = (props) => {
  const connect = () => {
    getAccessToken();
    props.history.push({ pathname: "/home" });
  };

  return (
    <div>
      {localStorage.getItem("SpotifyAccessToken") === undefined ? (
        <div>
          <p>Click on the button below to log into your spotify account</p>
          <Button onClick={() => connect()}>Connect Spotify Account</Button>
        </div>
      ) : (
        <div>
        <p>Click on the button one more time to connect your spotify account to the app</p>
          <Button onClick={() => connect()}>Connect Spotify Account</Button>
        </div>
      )}
    </div>
  );
};

export default SpotifyConnect;
