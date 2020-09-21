import { Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TopArtistsList from "./TopArtists/TopArtistsList";
import TopSongsList from "./TopSongs/TopSongsList";
import FavoriteAlbumsList from "./FavoriteAlbums/FavoriteAlbumsList"
import AlbumForm from "./FavoriteAlbums/AlbumForm"
// import { Form } from "reactstrap";
import SongRecommendation from "./recommendations/SongRecommendation";
import SpotifyConnect from "./spotify/SpotifyConnect"
import Home from "./home/Home";

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
            return <SpotifyConnect {...props} />
        }}
        />

    <Route
        exact path="/home"
        render={(props) => {
            return <Home {...props} />
        }}
        />

      <Route
        path="/top-artists"
        render={(props) => {
          return <TopArtistsList {...props} />;
        }}
      />

      <Route
        path="/top-songs"
        render={(props) => {
          return <TopSongsList {...props} />;
        }}
      />

      <Route
        path="/favorite-albums"
        render={(props) => {
            return <FavoriteAlbumsList albumId={parseInt(props.match.params.albumId)} {...props} />;
        }}
      />

      <Route
        path="/new-album"
        render={(props) => {
            return <AlbumForm {...props} />;
        }}/>

      <Route
        path="/music-recommendation"
        render={(props) => {
            return <SongRecommendation {...props} />;
        }}/>

    </>
  );
};

export default withRouter(ApplicationViews);
