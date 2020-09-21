import React, { useEffect, useState } from "react";
import HomeManager from "../../modules/HomeManager";
import AlbumManager from "../../modules/AlbumManager";
import { Button } from "reactstrap";

const Home = (props) => {
  console.log(HomeManager.getSpotifyUser());

  const [spotifyUser, setSpotifyUser] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);

  const grabSpotifyUser = () => {
    HomeManager.getSpotifyUser().then((user) => {
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

  console.log(recentTracks.map((recentTrack) => recentTrack.track.id));

  return (
    <>
      <div>
        <div>
          <p>
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
          </Button>
        </div>
        <div>
            <p><strong>Top Rated Album</strong></p>
            <img
                src={userAlbums.album_image}
                width="100px"
                height="100px"
                alt="album"
            />
            <p>Artist: {userAlbums.album_artist}</p>
            <p>Album: {userAlbums.album_name}</p>
            <p>Rating: {userAlbums.album_rating}/10</p>
        </div>
      </div>
      <div>
        <p>
          <strong>Recently Played Tracks</strong>
        </p>
        {recentTracks.map((recentTrack) => (
          <iframe
            src={`https://open.spotify.com/embed/track/${recentTrack.track.id}`}
            width="300"
            height="280"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        ))}
      </div>
    </>
  );
};

export default Home;
