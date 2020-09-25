import React, { useEffect, useState } from "react";
import HomeManager from "../../modules/HomeManager";
import AlbumManager from "../../modules/AlbumManager";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import "./Home.css";

const Home = (props) => {
  const [spotifyUser, setSpotifyUser] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);

  const grabSpotifyUser = () => {
    HomeManager.getSpotifyUser().then((user) => {
      console.log(user)
      setSpotifyUser({
        display_name: user.display_name,
        profile_picture: user.images[0].url,
        followers: user.followers.total,
        spotify_account_link: user.external_urls.spotify,
      });
    });
    HomeManager.getRecentlyPlayedTracks().then((tracks) => {
      const allTracks = tracks.items;
      setRecentTracks(allTracks);
    });
    AlbumManager.fetchAlbums().then((albums) => {
      albums.sort(function (a, b) {
        return b.album_rating - a.album_rating;
      });
      setUserAlbums(albums[0]);
    });
  };

  useEffect(() => {
    grabSpotifyUser();
  }, []);

  return (
    <>
      <div>
        <div id="container">
          <div>
            <Card>
              <CardBody>
                <CardTitle><strong>Spotify User Info</strong></CardTitle>
                <CardText>{spotifyUser.display_name}</CardText>
                <CardText><strong>Followers: </strong>{spotifyUser.followers}</CardText>
                <CardText></CardText>
                <Button
                  outline
                  color="success"
                  size="sm"
                  href={spotifyUser.spotify_account_link}
                >
                  View Spotify Account
                </Button>
              </CardBody>
              <img
                top
                width="100%"
                width="100px"
                height="100px"
                id="card-img"
                src={spotifyUser.profile_picture}
              />
            </Card>
            {/* <p>
            <strong>Spotify Account Info</strong>
          </p>
          <img
            src={spotifyUser.profile_picture}
            height="100px"
            width="100px"
            alt="user"
          />
          <p>{spotifyUser.display_name}</p>
          <p>Followers: {spotifyUser.followers}</p>
          <Button color="success">
            <a href={spotifyUser.spotify_account_link}>View Spotify Account</a>
          </Button> */}
          </div>
          {userAlbums ? (
            <div id="cards">
              <Card>
                <CardBody>
                  <CardTitle><strong>Top Rated Album</strong></CardTitle>
                  <CardText><strong>Artist: </strong>{userAlbums.album_artist}</CardText>
                  <CardText><strong>Album: </strong>{userAlbums.album_name}</CardText>
                  <CardText><strong>Rating: </strong>{userAlbums.album_rating}/10</CardText>
                  <Button
                    outline
                    color="success"
                    size="sm"
                    href="/favorite-albums"
                  >
                    View Albums
                  </Button>
                </CardBody>
                <img
                  top
                  width="100%"
                  width="100px"
                  height="100px"
                  id="card-img"
                  src={userAlbums.album_image}
                />
              </Card>
              {/* <p>
              <strong>Top Rated Album</strong>
            </p>
            <img
              src={userAlbums.album_image}
              width="100px"
              height="100px"
              alt="album"
            />
            <p>Artist: {userAlbums.album_artist}</p>
            <p>Album: {userAlbums.album_name}</p>
            <p>Rating: {userAlbums.album_rating}/10</p> */}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
        <p id="recently-played">
          <strong>Recently Played Tracks</strong>
        </p>
      <div id="container-tracks">
        {recentTracks.map((recentTrack) => (
          <div id="container-songs">
            <iframe
              src={`https://open.spotify.com/embed/track/${recentTrack.track.id}`}
              width="300"
              height="280"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              title="Spotify"
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
