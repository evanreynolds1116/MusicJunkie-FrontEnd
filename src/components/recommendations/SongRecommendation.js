import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import RecommendationManager from "../../modules/RecommendationManager";

const SongRecommendation = (props) => {
//   const [searchedArtist, setSearchedArtist] = useState([]);
//   const [artistResults, setArtistResults] = useState([]);

  // handles artist that is typed into the search bar
//   const handleFieldChangeArtist = (evt) => {
//     const stateToChange = { ...searchedArtist };
//     stateToChange[evt.target.id] = evt.target.value;
//     setSearchedArtist(stateToChange);
//   };

  // searches Spotify API for artist that was typed into the search bar and opens modal with results
//   const getSearchedArtists = () => {
//     RecommendationManager.searchArtists(searchedArtist.searchArtists).then(
//       (artistsFromAPI) => {
//         const allArtists = artistsFromAPI.artists;
//         const finalResults = allArtists.items;
//         setArtistResults(finalResults);
//         toggleArtist();
//       }
//     );
//   };

//   const [artist, setArtist] = useState([]);
  // grabs selected artist from search results and saves the name and id for later use in song recommendation fetch
//   const grabArtist = (object) => {
//     const newArtist = artist.concat({ name: object.name, id: object.id });
//     setArtist(newArtist);
//   };

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
//   const [modalArtist, setModalArtist] = useState(false);
  const [modalSong, setModalSong] = useState(false);

//   const toggleArtist = () => setModalArtist(!modalArtist);
  const toggleSong = () => setModalSong(!modalSong);
  //

  const [recommendationResults, setRecommendationResults] = useState([]);
  const recommendationSearch = () => {
    const ids = song.map((object) => object.id);
    const joinedIds = ids.join("%2C");
    RecommendationManager.getRecommendationResults(joinedIds).then((object) => {
      const allResults = object.tracks;
      setRecommendationResults(allResults);
      // set selected songs array to blank
      setSong([]);
    });
  };

  // function to remove song from list being used for recommendations
  const removeRecommendation = (object) => {
    let exclude = object;
    let updated = song.filter((e) => e !== exclude);
    setSong(updated);
  };

  return (
    <>
      <div>
        <h1>Get Music Recommendations</h1>
      </div>
      <div>
        <Form>
          {/* <FormGroup>
            <Label htmlFor="searchArtists">
              Get song recommendations from Spotify based on artist(s)
            </Label>
            <Input
              type="search"
              id="searchArtists"
              name="searchArtists"
              onChange={handleFieldChangeArtist}
            ></Input>
            <Button onClick={getSearchedArtists}>Search</Button>
            <Modal isOpen={modalArtist} toggle={toggleArtist}>
              <ModalHeader toggle={toggleArtist}>Results for: {searchedArtist.searchArtists}</ModalHeader>
              <ModalBody>
                {artistResults.map((artist) => (
                    <li key={artist.id}>
                        <img
                            src={artist.images[0].url}
                            width="100px"
                            height="100px"
                            alt="artist"
                        />
                        {artist.name}
                        <Button onClick={() => grabArtist(artist)}>Select Artist</Button>
                    </li>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggleArtist}>
                  Do Something
                </Button>{" "}
                <Button color="secondary" onClick={toggleArtist}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup> */}
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
              {/* <ModalFooter>
                <Button color="primary" onClick={toggleSong}>
                  Do Something
                </Button>{" "}
                <Button color="secondary" onClick={toggleSong}>
                  Cancel
                </Button>
              </ModalFooter> */}
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
        {/* {song.length > 0 ? (
          <>
            <ul>
              {artist.map((object) => (
                <li key={object.id}>
                  Artist used for recommendations: {object.name}
                </li>
              ))}
              <li>
                Song used for recommendations:
                {song.map((object) => (
                  <>
                    <p key={object.id}>
                      {object.name} by {object.artist}
                    </p>
                    <Button size="sm" onClick={() => removeRecommendation(object)}>
                      Remove
                    </Button>
                  </>
                ))}
              </li>
            </ul>
            <Button onClick={recommendationSearch}>
              Get Song Recommendations
            </Button>
          </>
        ) : (
          <p></p>
        )} */}
      </div>
      <div>
        {recommendationResults.length > 0 ? (
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
        ) : (
          <p></p>
        )}

        {/* <ul>
          {recommendationResults.map((object) => (
            <li key={object.id}>
              <img
                src={object.album.images[0].url}
                width="100px"
                height="100px"
                alt="album"
              />
              {object.name} by {object.artists[0].name}
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export default SongRecommendation;
