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
  Table,
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
    album_rating: 0.0,
    album_id: "",
  });

  const handleSelection = (object) => {
    setSelectedAlbum(object);
    console.log(setSelectedAlbum(object));
    const albumToAdd = { ...album };
    albumToAdd["album_name"] = object.name;
    albumToAdd["album_artist"] = object.artists[0].name;
    albumToAdd["album_image"] = object.images[0].url;
    albumToAdd["album_id"] = object.id;
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
    setAlbum(stateToChange);
  };

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
      window.alert("Please fill out Title, Artist, Image, and Rating");
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
        });
    }
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div id="new-album-header-form-container">
        <div id="new-album-header">
          <h1>Add New Album</h1>
        </div>
        <div id="new-album-form-container">
          <Form id="new-album-form">
            <FormGroup>
              {/* <p>Search Spotify by Artist or Album Title</p> */}
              <Label htmlFor="search">
                Search Spotify by Artist or Album Title
              </Label>
              <Input
                type="search"
                id="search"
                onChange={handleFieldChange}
                name="search"
              ></Input>
              {/* <p>(if artist or album title is more than one word, you must wrap it in quotes)</p> */}
            </FormGroup>
          </Form>
          <Button color="success" size="md" onClick={getSearchedAlbums}>
            Search
          </Button>
        </div>
      </div>
      <div id="album-results-header">
        {albumResults.length > 0 ? (
          <div id="album-results-container">
            <div>
              <h1>Results</h1>
            </div>
            <Table id="album-results-table">
              <thead>
                <tr>
                  <th>Album Artwork</th>
                  <th>Album Name</th>
                  <th>Artist</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {albumResults.map((object) => (
                  <tr key={object.id}>
                    <td>
                      <img
                        src={object.images[0].url}
                        width="300px"
                        height="300px"
                        alt="artist"
                      ></img>
                    </td>
                    <td>{object.name}</td>
                    <td>{object.artists[0].name}</td>
                    <td>
                      <Button
                        color="success"
                        onClick={() => handleSelection(object)}
                      >
                        Add Album
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <Modal isOpen={modal} toggle={toggle} id="add-album-modal">
            <ModalHeader toggle={toggle} id="add-album-modal-header">
              Add Album
            </ModalHeader>
            <ModalBody id="add-album-modal-body">
              <Form id="album-form">
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
                  <Label htmlFor="album_id">Album ID</Label>
                  <Input
                    type="text"
                    id="album_id"
                    name="album_id"
                    value={album.album_id}
                    readOnly
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="album_rating">Rating (on a scale from 1-10)</Label>
                  <Input
                    type="number"
                    id="album_rating"
                    name="album_rating"
                    min="1"
                    max="10"
                    onChange={handleRatingChange}
                  ></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter id="add-album-modal-footer">
              <Button color="success" onClick={constructNewAlbum}>
                Add Album
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <footer></footer>
      </div>
    </>
  );
};

export default AlbumForm;
