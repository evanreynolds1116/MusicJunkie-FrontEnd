export default {
  searchArtists(searchedArtist) {
    return fetch(
      `https://api.spotify.com/v1/search?q=${searchedArtist}&type=artist`,
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
  searchSongs(searchedSong) {
    return fetch(
      `https://api.spotify.com/v1/search?q=${searchedSong}&type=track`,
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
  getRecommendationResults(songId) {
    return fetch(
      `https://api.spotify.com/v1/recommendations?market=US&seed_tracks=${songId}&min_energy=0.4&min_popularity=30`,
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
  createPlaylist(id, playlist, setNewPlaylistId) {
      return fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
          },
          body: JSON.stringify(playlist)
      })
      .then(response => response.json())
      .then(result => {
          return result
      })
      .then(result => setNewPlaylistId(result))
      .catch(error => console.log('error', error));
  },
  addItemsToPlaylist(playlistId, URIS, setCreatedPlaylist) {
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${URIS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
        },
      })
      .then(response => response.json())
      .then(result => setCreatedPlaylist(result))
      .catch(error => console.log('error', error));
  }
};
