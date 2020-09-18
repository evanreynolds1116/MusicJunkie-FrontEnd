import React, { useState, useEffect } from "react";
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
  FormText,
  Table,
} from "reactstrap";

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
      // sorts albums by rating(highest rating to lowest rating)
      albumsFromAPI.sort(function (a, b) {
        return b.album_rating - a.album_rating;
      });
      setAlbums(albumsFromAPI);
    });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const deleteAlbum = (id) => {
    return fetch(`http://localhost:8000/albums/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("music_token")}`,
      },
    });
  };

  const handleDelete = (id) => {
    deleteAlbum(id).then(() => {
      getAlbums();
      props.history.push("/favorite-albums");
    });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const updateAlbum = (id) => {
    return fetch(`http://localhost:8000/albums/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("music_token")}`,
      },
      body: JSON.stringify(id),
    }).then((data) => data.json());
  };

  const handleUpdate = (id) => {
    updateAlbum(id).then(() => {
      getAlbums();
      props.history.push("/favorite-albums");
    });
  };

  const [album, setAlbum] = useState({
    id: "",
    album_name: "",
    album_artist: "",
    album_image: "",
    album_rating: "",
    user_id: "",
  });

  const handleSelection = (object) => {
    const albumToUpdate = { ...album };
    albumToUpdate["id"] = object.id;
    albumToUpdate["album_name"] = object.album_name;
    albumToUpdate["album_artist"] = object.album_artist;
    albumToUpdate["album_image"] = object.album_image;
    albumToUpdate["album_rating"] = object.album_rating;
    albumToUpdate["user_id"] = object.user_id;
    setAlbum(albumToUpdate);
    toggle();
  };

  const handleRatingChange = (evt) => {
    const stateToChange = { ...album };
    stateToChange[evt.target.id] = evt.target.value;
    setAlbum(stateToChange);
  };

  return (
    <>
      <div>
        <h1>Favorite Albums</h1>
        <Button
          color="primary"
          onClick={() => {
            props.history.push("/new-album");
          }}
        >
          Add New Album
        </Button>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Album Artwork</th>
              <th>Album</th>
              <th>Artist</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id}>
                <td>
                  <img
                    src={album.album_image}
                    width="100px"
                    height="100px"
                    alt="artist"
                  />
                </td>
                <td>{album.album_name}</td>
                <td>{album.album_artist}</td>
                <td>{album.album_rating}/10</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => handleSelection(album)}
                  >
                    Update Rating
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(album.id)}>
                    Delete
                  </Button>
                </td>
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
                          defaultValue={album.album_rating}
                          onChange={handleRatingChange}
                        ></Input>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => handleUpdate(album.id)}>
                      + Add
                    </Button>
                  </ModalFooter>
                </Modal>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div></div>
    </>
  );
};

export default FavoriteAlbumsList;
