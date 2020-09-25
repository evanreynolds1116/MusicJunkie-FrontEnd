export default {
  getSpotifyUser() {
    return fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
      },
    }).then((response) => response.json());
  },
  getRecentlyPlayedTracks() {
    return fetch(
      "https://api.spotify.com/v1/me/player/recently-played?type=track&limit=16&after=1484811043508",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
        },
      }
    ).then((response) => response.json());
  },
};
