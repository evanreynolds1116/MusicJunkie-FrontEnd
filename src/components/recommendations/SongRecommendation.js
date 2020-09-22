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
  Table,
} from "reactstrap";
import RecommendationManager from "../../modules/RecommendationManager";
import HomeManager from "../../modules/HomeManager";

const SongRecommendation = (props) => {
  const [searchedSong, setSearchedSong] = useState([]);
  const [songResults, setSongResults] = useState([]);

  // handles song that is typed into the search bar
  const handleFieldChangeSong = (evt) => {
    const stateToChange = { ...searchedSong };
    stateToChange[evt.target.id] = evt.target.value;
    setSearchedSong(stateToChange);
  };

  // searches Spotify API for song that was typed into the search bar and opens modal with results
  const getSearchedSongs = () => {
    RecommendationManager.searchSongs(searchedSong.searchSongs).then(
      (songsFromAPI) => {
        const allSongs = songsFromAPI.tracks;
        const finalResults = allSongs.items;
        setSongResults(finalResults);
        toggleSong();
      }
    );
  };

  const [song, setSong] = useState([]);
  // grabs selected song from search results and saves the name, id, and artist name for later use in song recommendation fetch
  const grabSong = (object) => {
    const newSong = song.concat({
      name: object.name,
      id: object.id,
      artist: object.artists[0].name,
      artwork: object.album.images[0].url,
    });
    setSong(newSong);
    toggleSong();
  };

  // modal stuff
  const [modalSong, setModalSong] = useState(false);
  const toggleSong = () => setModalSong(!modalSong);
  //

  const [recommendationResults, setRecommendationResults] = useState([]);
  const [playlistURIS, setPlaylistURIS] = useState([]);

  const recommendationSearch = () => {
    const ids = song.map((object) => object.id);
    const joinedIds = ids.join("%2C");
    RecommendationManager.getRecommendationResults(joinedIds).then((object) => {
      const allResults = object.tracks;
    //   console.log(allResults.map((song) => song.uri))
      setRecommendationResults(allResults);
      // set selected songs array to blank
      setSong([]);
      // grab all song uri's and assign them to playlistURIS to be added to a created playlist
      const allURIS = allResults.map((song) => song.uri)
      setPlaylistURIS(allURIS)
      setCreatedPlaylist([])
    });
  };

  // function to remove song from list being used for recommendations
  const removeRecommendation = (object) => {
    let exclude = object;
    let updated = song.filter((e) => e !== exclude);
    setSong(updated);
  };

  // grabbing spotify user info so we can use ID to create a playlist
  const [spotifyUser, setSpotifyUser] = useState([]);
  const grabSpotifyUser = () => {
    HomeManager.getSpotifyUser().then((user) => {
      setSpotifyUser(user);
    });
  };

  useEffect(() => {
    grabSpotifyUser();
  }, []);

  // modal stuff for creating playlist
  const [modalPlaylist, setModalPlaylist] = useState(false);
  const togglePlaylist = () => setModalPlaylist(!modalPlaylist);

  const [modalPlaylistSongs, setModalPlaylistSongs] = useState(false);
  const togglePlaylistSongs = () => setModalPlaylistSongs(!modalPlaylistSongs);
  

  
  const [newPlaylist, setNewPlaylist] = useState({
      "name": "",
      "description": "",
      public: true
  })

  const handleFieldChange = (evt) => {
      const stateToChange = { ...newPlaylist };
      stateToChange[evt.target.id] = evt.target.value;
      setNewPlaylist(stateToChange)
  }

  const [newPlaylistId, setNewPlaylistId] = useState([])

  const createNewPlaylist = () => {
      RecommendationManager.createPlaylist(spotifyUser.id, newPlaylist, setNewPlaylistId);
      togglePlaylist();
      togglePlaylistSongs();

    //   RecommendationManager.addItemsToPlaylist(newPlaylistId.id, playlistURIS);
    //   .then((playlist) => setNewPlaylistId(playlist))
    //   console.log(playlist)
  }

  const songsToPlaylist = () => {
    RecommendationManager.addItemsToPlaylist(newPlaylistId.id, playlistURIS, setCreatedPlaylist);
    togglePlaylistSongs();
    setRecommendationResults([])
  }

  const [createdPlaylist, setCreatedPlaylist] = useState([])

  const removeSongForPlaylist = (object) => {
    let exclude = object;
    let updated = recommendationResults.filter((e) => e !== exclude);
    setRecommendationResults(updated);
    const updatedURIS = updated.map((track) => track.uri)
    setPlaylistURIS(updatedURIS)
  };


  console.log(recommendationResults)

  return (
    <>
      <div>
        <h1>Get Music Recommendations</h1>
      </div>
      <div>
        <Form>
          <FormGroup>
            <Label htmlFor="searchSongs">
              Get song recommendations from Spotify based on song(s)
            </Label>
            {song.length < 5 ? (
              <div>
                <Input
                  type="search"
                  id="searchSongs"
                  name="searcSongs"
                  onChange={handleFieldChangeSong}
                ></Input>
                <Button color="primary" onClick={getSearchedSongs}>
                  Search
                </Button>
              </div>
            ) : (
              <p>Max songs reached</p>
            )}
            <Modal isOpen={modalSong} toggle={toggleSong}>
              <ModalHeader toggle={toggleSong}>
                Results for: {searchedSong.searchSongs}
              </ModalHeader>
              <ModalBody>
                <Table>
                  <thead>
                    <tr>
                      <th>Album</th>
                      <th>Song</th>
                      <th>Artist</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {songResults.map((song) => (
                      <tr key={song.id}>
                        <td>
                          <img
                            src={song.album.images[0].url}
                            width="100px"
                            height="100px"
                            alt="artist"
                          />
                        </td>
                        <td>{song.name}</td>
                        <td>{song.artists[0].name}</td>
                        <td>
                          <Button
                            size="sm"
                            color="primary"
                            onClick={() => grabSong(song)}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ModalBody>
            </Modal>
          </FormGroup>
        </Form>
      </div>
      <div>
        {song.length > 0 ? (
          <>
            <h4>Songs used for recommendation</h4>
            <Table>
              <thead>
                <tr>
                  <th>Album</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {song.map((object) => (
                  <tr key={object.id}>
                    <td>
                      <img
                        src={object.artwork}
                        height="100px"
                        width="100px"
                        alt="album"
                      />
                    </td>
                    <td>{object.name}</td>
                    <td>{object.artist}</td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => removeRecommendation(object)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={recommendationSearch} color="primary">
              Get Song Recommendations
            </Button>
          </>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        {recommendationResults.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Album</th>
                  <th>Song</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody>
                {recommendationResults.map((object) => (
                  <tr key={object.id}>
                    <td>
                      <img
                        src={object.album.images[0].url}
                        width="100px"
                        height="100px"
                        alt="album"
                      />
                    </td>
                    <td>{object.name}</td>
                    <td>{object.artists[0].name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={togglePlaylist}>Create playlist</Button>
            <Modal isOpen={modalPlaylist} toggle={togglePlaylist}>
              <ModalHeader toggle={togglePlaylist}>Modal title</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label htmlFor="name">Playlist Name</Label>
                    <Input type="text" name="name" id="name" onChange={handleFieldChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">
                      Playlist Description
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      onChange={handleFieldChange}
                    />
                  </FormGroup>
                </Form>
                {/* <Table>
                  <thead>
                    <tr>
                      <th>Album</th>
                      <th>Song</th>
                      <th>Artist</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendationResults.map((object) => (
                      <tr key={object.id}>
                        <td>
                          <img
                            src={object.album.images[0].url}
                            width="100px"
                            height="100px"
                            alt="album"
                          />
                        </td>
                        <td>{object.name}</td>
                        <td>{object.artists[0].name}</td>
                        <td><Button color="danger" size="sm">X</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table> */}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => createNewPlaylist()}>
                  Create Playlist
                </Button>{" "}
                <Button color="secondary" onClick={togglePlaylist}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={modalPlaylistSongs} toggle={togglePlaylistSongs}>
              <ModalHeader toggle={togglePlaylistSongs}>Modal title</ModalHeader>
              <ModalBody>
                <Table>
                  <thead>
                    <tr>
                      {/* <th>Album</th> */}
                      <th>Song</th>
                      <th>Artist</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendationResults.map((object) => (
                      <tr key={object.id}>
                        {/* <td>
                          <img
                            src={object.album.images[0].url}
                            width="100px"
                            height="100px"
                            alt="album"
                          />
                        </td> */}
                        <td>{object.name}</td>
                        <td>{object.artists[0].name}</td>
                        <td><Button color="danger" size="sm" onClick={() => removeSongForPlaylist(object)}>X</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => songsToPlaylist()}>
                  Create Playlist
                </Button>{" "}
                <Button color="secondary" onClick={togglePlaylistSongs}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        ) : (
          <p></p>
        )}
      </div>
      <div>
          {createdPlaylist.snapshot_id !== undefined ? (
            <iframe
                    src={`https://open.spotify.com/embed/playlist/${newPlaylistId.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
          ) : (
              <p></p>
          )}
      </div>
    </>
  );
};

export default SongRecommendation;
