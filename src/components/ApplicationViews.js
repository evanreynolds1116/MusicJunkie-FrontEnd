import { Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TopArtistsList from "./TopArtists/TopArtistsList";
import TopSongsList from "./TopSongs/TopSongsList";
import FavoriteAlbumsList from "./FavoriteAlbums/FavoriteAlbumsList"
import AlbumForm from "./FavoriteAlbums/AlbumForm"
import { Form } from "reactstrap";

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
            return <FavoriteAlbumsList {...props} />;
        }}
      />

      <Route
        path="/new-album"
        render={(props) => {
            return <AlbumForm {...props} />;
        }}/>

    </>
  );
};

export default withRouter(ApplicationViews);
