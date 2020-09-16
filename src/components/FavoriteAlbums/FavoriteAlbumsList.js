import React, { useState, useEffect } from "react";

const FavoriteAlbumsList = (props) => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = () => {
    return fetch(`http://localhost:8000/albums`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("music_token")}`,
      },
    }).then((response) => response.json());
  };

  const getAlbums = () => {
    fetchAlbums().then((albumsFromAPI) => {
      setAlbums(albumsFromAPI);
    });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  // const getAlbums = (id) => {
  //     return fetch(`http://localhost:8000/albums?user_id=${id}`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //             "Accept": "application/json",
  //             "Authorization": `Token ${localStorage.getItem("music_token")}`
  //         }
  //     })
  //     .then(response => response.json)
  //     .then(response => console.log(response))
  // }

  // const getUserAlbums = () => {
  //     getAlbums(localStorage.getItem("music_token")).then(albumsFromAPI => {
  //         console.log(albumsFromAPI)
  //         // const userAlbums = albumsFromAPI.filter(album => album.user.url.split("/user/")[1] == user.id)
  //         // console.log(userAlbums)
  //     })
  // }

  // console.log(getUserAlbums());

  return (
    <>
      <div>
        <h1>Favorite Albums</h1>
        <button
          onClick={() => {
            props.history.push("/new-album");
          }}
        >
          Add New Album
        </button>
      </div>
      <div>
        {albums.map((album) => (
          <li key={album.id}>
            <img
              src={album.album_image}
              width="100px"
              height="100px"
              alt="artist"
            />
            <p>
              <strong>Album:</strong> {album.album_name}
            </p>
            <p>
              <strong>Artist:</strong> {album.album_artist}
            </p>
            <p>
              <strong>Rating:</strong> {album.album_rating}/10
            </p>
          </li>
        ))}
      </div>
    </>
  );
};

export default FavoriteAlbumsList;
