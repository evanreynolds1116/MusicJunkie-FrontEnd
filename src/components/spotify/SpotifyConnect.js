import React, { useEffect } from "react";
import { Button } from "reactstrap";
import getAccessToken from "../auth/SpotifyLogin";

const SpotifyConnect = (props) => {
//   const connect = () => {
//     getAccessToken();
//     props.history.push({ pathname: "/home" });
//   };

  const connectToken = () => {
      const spotifyTokenURL = window.location.href.match(/access_token=([^&]*)/)
      const spotifyToken = spotifyTokenURL[1]
      localStorage.setItem("SpotifyAccessToken", spotifyToken)
      props.history.push({ pathname: "/home" });
  }

  useEffect(() => {
      connectToken();
  })

  return (
    <div>
    </div>
  );
};

export default SpotifyConnect;
