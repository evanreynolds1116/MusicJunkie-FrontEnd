import React, { useState, useEffect } from "react";
import TopSongsFetch from "./TopSongsFetch";
import { Table } from "reactstrap";

const TopSongsList = (props) => {
  const [shortTermSongs, setShortTermSongs] = useState([]);
  const [mediumTermSongs, setMediumTermSongs] = useState([]);
  const [longTermSongs, setLongTermSongs] = useState([]);

  const getSongs = () => {
    TopSongsFetch.shortTerm().then((object) => {
      const allSongs = object.items;
      setShortTermSongs(allSongs);
      console.log(allSongs);
      //   const songURIS = allSongs.map(object => object.uri)
    //   const songURIS = allSongs[0].external_urls.spotify;
    //   console.log(songURIS);
    //   setPlaySong({ uri: songURIS });
    });
    TopSongsFetch.mediumTerm().then((object) => {
      const allSongs = object.items;
      setMediumTermSongs(allSongs);
    });
    TopSongsFetch.longTerm().then((object) => {
      const allSongs = object.items;
      setLongTermSongs(allSongs);
    });
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <div>
        <h1>Top Songs</h1>
      </div>
      <div>
        {/* {playSong != "" ? (
          <iframe
            src={playSong.uri}
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        ) : (
          <p></p>
        )} */}
      </div>
      <div>
        <h2>4 Weeks</h2>
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
            {shortTermSongs.map((object) => (
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
                <td>
                  {/* <Button color="primary" onClick={() => test(object.uri)}>Listen</Button> */}
                  <iframe
                    src={`https://open.spotify.com/embed/track/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <h2>6 months</h2>
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
            {mediumTermSongs.map((object) => (
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
                <td>
                  {/* <Button color="primary" onClick={() => test(object.uri)}>Listen</Button> */}
                  <iframe
                    src={`https://open.spotify.com/embed/track/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
          <h2>2-3 years</h2>
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
            {longTermSongs.map((object) => (
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
                <td>
                  {/* <Button color="primary" onClick={() => test(object.uri)}>Listen</Button> */}
                  <iframe
                    src={`https://open.spotify.com/embed/track/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TopSongsList;
