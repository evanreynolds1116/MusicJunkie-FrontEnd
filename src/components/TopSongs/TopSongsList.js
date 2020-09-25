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
      <div id="top-songs-header">
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
      <div id="top-songs-short">
        <div id="top-songs-short-header">
          <h2 class="top-songs-timeframe">4 Weeks</h2>
        </div>
        <div id="container-top-tracks">
          {shortTermSongs.map((object) => (
            <div id="container-top-songs">
              <iframe
                src={`https://open.spotify.com/embed/track/${object.id}`}
                width="240"
                height="320"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="Spotify"
              ></iframe>
            </div>
          ))}
        </div>
        {/* <Table id="top-songs-table-short">
          <thead>
            <tr>
              <th></th>
              <th>Song</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {shortTermSongs.map((object) => (
              <tr key={object.id}>
                <td>
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
                <td>{object.name}</td>
                <td>{object.artists[0].name}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
      <div id="top-songs-medium">
        <div id="top-songs-medium-header">
          <h2 class="top-songs-timeframe">6 Months</h2>
        </div>
        <div id="container-top-tracks">
          {mediumTermSongs.map((object) => (
            <div id="container-top-songs">
              <iframe
                src={`https://open.spotify.com/embed/track/${object.id}`}
                width="240"
                height="320"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="Spotify"
              ></iframe>
            </div>
          ))}
        </div>
        {/* <Table id="top-songs-table-medium">
          <thead>
            <tr>
              <th></th>
              <th>Song</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {mediumTermSongs.map((object) => (
              <tr key={object.id}>
                <td>
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
                <td>{object.name}</td>
                <td>{object.artists[0].name}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
      <div id="top-songs-long">
        <div id="top-songs-long-header">
          <h2 class="top-songs-timeframe">2-3 Years</h2>
        </div>
        <div id="container-top-tracks">
          {longTermSongs.map((object) => (
            <div id="container-top-songs">
              <iframe
                src={`https://open.spotify.com/embed/track/${object.id}`}
                width="240"
                height="320"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="Spotify"
              ></iframe>
            </div>
          ))}
        </div>
        {/* <Table id="top-songs-table-long">
          <thead>
            <tr>
              <th></th>
              <th>Song</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {longTermSongs.map((object) => (
              <tr key={object.id}>
                <td>
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
                <td>{object.name}</td>
                <td>{object.artists[0].name}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
    </>
  );
};

export default TopSongsList;
