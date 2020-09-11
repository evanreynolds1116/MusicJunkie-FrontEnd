import { Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TopArtistsList from "./TopArtists/TopArtistsList";

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
    </>
  );
};

export default withRouter(ApplicationViews);
