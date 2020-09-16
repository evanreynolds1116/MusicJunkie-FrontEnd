export default {
    shortTerm() {
        return fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
            },
        })
        .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(error => console.log('error', error));
    },
    mediumTerm() {
        return fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
            },
        })
        .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(error => console.log('error', error));
    },
    longTerm() {
        return fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
            },
        })
        .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(error => console.log('error', error));
    }
}