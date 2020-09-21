import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const AlbumForm = (props) => {
  const searchAlbums = () => {
    return fetch(
      `https://api.spotify.com/v1/search?q=${searchedAlbum.search}&type=album`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`,
        },
      }
    ).then((response) => response.json());
    // .then(response => console.log(response))
  };

  const [searchedAlbum, setSearchedAlbums] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [album, setAlbum] = useState({
    album_name: "",
    album_artist: "",
    album_image: "",
    album_rating: 0.0
  });

  const handleSelection = (object) => {
    setSelectedAlbum(object);
    const albumToAdd = { ...album };
    albumToAdd["album_name"] = object.name;
    albumToAdd["album_artist"] = object.artists[0].name;
    albumToAdd["album_image"] = object.images[0].url;
    setAlbum(albumToAdd);
    toggle();
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...searchedAlbum };
    stateToChange[evt.target.id] = evt.target.value;
    setSearchedAlbums(stateToChange);
  };

  const handleRatingChange = (evt) => {
      const stateToChange = { ...album };
      stateToChange[evt.target.id] = evt.target.value;
      setAlbum(stateToChange)
  }

  const getSearchedAlbums = (evt) => {
    evt.preventDefault();
    searchAlbums().then((albumsFromAPI) => {
      const allAlbums = albumsFromAPI.albums;
      const finalResults = allAlbums.items;
      setAlbumResults(finalResults);
      console.log(albumResults);
    });
  };

  console.log(selectedAlbum);

  const constructNewAlbum = (evt) => {
      evt.preventDefault();

      if (
          album.album_name === "" ||
          album.album_artist === "" ||
          album.album_image === "" ||
          album.album_rating === ""
      ) {
          window.alert("Please fill out Title, Artist, Image, and Rating")
      } else {
          fetch("http://localhost:8000/albums", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("music_token")}`,
              },
              body: JSON.stringify(album),
          })
          .then((response) => response.json())
          .then(() => {
              console.log("added");
              props.history.push("/favorite-albums");
          })
      }
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div>
        <h1>Add New Album</h1>
      </div>
      <div>
        <Form>
         <FormGroup>
          {/* <p>Search Spotify by Artist or Album Title</p> */}
          <Label htmlFor="search">Search Spotify by Artist or Album Title</Label>
          <Input
            type="search"
            id="search"
            onChange={handleFieldChange}
            name="search"
          ></Input>
          <Button onClick={getSearchedAlbums}>Search</Button>
          <p>(if artist or album title is more than one word, you must wrap it in quotes)</p>
         </FormGroup>
        </Form>
      </div>
      <div>
        <h1>Results</h1>
        <ul>
          {albumResults.map((object) => (
            <li key={object.id}>
              <img
                src={object.images[0].url}
                width="100px"
                height="100px"
                alt="artist"
              ></img>
              Album: {object.name} by {object.artists[0].name}
              <Button onClick={() => handleSelection(object)}>Add Album</Button>
            </li>
          ))}
        </ul>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Album</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label htmlFor="album_name">Album Title</Label>
                  <Input
                    type="text"
                    id="album_name"
                    value={album.album_name}
                    name="album_name"
                    readOnly
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="album_artist">Artist</Label>
                  <Input
                    type="text"
                    id="album_artist"
                    value={album.album_artist}
                    name="album_artist"
                    readOnly
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="album_image">Image</Label>
                  <Input
                    type="text"
                    id="album_image"
                    value={album.album_image}
                    name="album_image"
                    readOnly
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="album_rating">Rating</Label>
                  <Input
                    type="number"
                    id="album_rating"
                    name="album_rating"
                    onChange={handleRatingChange}
                  ></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={constructNewAlbum}>+ Add</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AlbumForm;
