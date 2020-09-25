const getAccessToken = () => {
  const clientId = "18e3f566c32e431eab92162f1ca7e6e0";
  const redirectUri = "http://localhost:3000/spotify-connect";
  let accessToken;

  console.log("get our access token");

  if (accessToken) {
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    console.log("function 2")
    localStorage.setItem("SpotifyAccessToken2", accessToken);
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
    //   searchForm.style.visibility = "visible";
    //   connectButton.style.visibility = "hidden";

    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&show_dialog=true&scope=user-top-read%20user-read-private%20user-read-email%20user-read-recently-played%20playlist-modify-public%20playlist-modify-private`;
    window.location = accessUrl;
    }

};

export default getAccessToken;
