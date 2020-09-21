// import React, { useRef } from "react";
// import { withRouter } from "react-router-dom";
// import { useState } from "react";

// const clientId = "5e04fc11444f46659968cb9a0094e811";
// const redirectUri = "localhost:3000";

const getAccessToken = () => {
  const clientId = "5e04fc11444f46659968cb9a0094e811";
  const redirectUri = "http://localhost:3000/spotify-connect";
  let accessToken;

  console.log("get our access token");

  if (accessToken) {
    localStorage.setItem("SpotifyAccessToken", accessToken);
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  localStorage.setItem("SpotifyAccessToken", accessTokenMatch);
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    localStorage.setItem("SpotifyAccessToken", accessToken);
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
    //   searchForm.style.visibility = "visible";
    //   connectButton.style.visibility = "hidden";

    console.log(accessToken);
    console.log("accessToken", accessToken);
    // setIsConnected(true);
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-top-read%20user-read-private%20user-read-email%20user-read-recently-played`;
    console.log("accessUrl", accessUrl);
    window.location = accessUrl;
    localStorage.setItem("SpotifyAccessToken", window.location);
    }
    localStorage.setItem("SpotifyAccessToken", accessToken);
};

export default getAccessToken;
