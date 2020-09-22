import { Route, Redirect } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TopArtistsList from "./TopArtists/TopArtistsList";
import TopSongsList from "./TopSongs/TopSongsList";
import FavoriteAlbumsList from "./FavoriteAlbums/FavoriteAlbumsList";
import AlbumForm from "./FavoriteAlbums/AlbumForm";
// import { Form } from "reactstrap";
import SongRecommendation from "./recommendations/SongRecommendation";
import SpotifyConnect from "./spotify/SpotifyConnect";
import Home from "./home/Home";

const isSpotifyConnected = () =>
  localStorage.getItem("SpotifyAccessToken") !== undefined || null ;

const ApplicationViews = () => {
  return (
    <>
      <Route
        path="/register/"
        render={(props) => {
          return <Register {...props} />;
        }}
      />

      <Route
        path="/login/"
        render={(props) => {
          return <Login {...props} />;
        }}
      />

      <Route
        path="/spotify-connect"
        render={(props) => {
          return <SpotifyConnect {...props} />;
        }}
      />

      <Route
        path="/home"
        render={(props) => {
          if (isSpotifyConnected()) {
            return <Home {...props} />;
          } else {
            return <Redirect to="/spotify-connect" />;
          }
        }}
      />

      <Route
        path="/top-artists"
        render={(props) => {
          if (isSpotifyConnected()) {
            return <TopArtistsList {...props} />;
          } else {
            return <Redirect to="/spotify-connect" />;
          }
        }}
      />

      <Route
        path="/top-songs"
        render={(props) => {
          if (isSpotifyConnected()) {
            return <TopSongsList {...props} />;
          } else {
            return <Redirect to="/spotify-connect" />;
          }
        }}
      />

      <Route
        path="/favorite-albums"
        render={(props) => {
          if (isSpotifyConnected()) {
            return (
              <FavoriteAlbumsList
                albumId={parseInt(props.match.params.albumId)}
                {...props}
              />
            );
          } else {
            return <Redirect to="/spotify-connect" />;
          }
        }}
      />

      <Route
        path="/new-album"
        render={(props) => {
          if (isSpotifyConnected()) {
            return <AlbumForm {...props} />;
          } else {
            return <Redirect to="/spotify-connect" />;
          }
        }}
      />

      <Route
        path="/music-recommendation"
        render={(props) => {
          if (isSpotifyConnected()) {
            return <SongRecommendation {...props} />;
          } else {
            return <Redirect to="/spotify-connect" />;
          }
        }}
      />
    </>
  );
};

export default withRouter(ApplicationViews);
