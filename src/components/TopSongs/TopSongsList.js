import React, { useState, useEffect } from "react";
import TopSongsFetch from "./TopSongsFetch";

const TopSongsList = (props) => {
  const [shortTermSongs, setShortTermSongs] = useState([]);
  const [mediumTermSongs, setMediumTermSongs] = useState([]);
  const [longTermSongs, setLongTermSongs] = useState([]);

  const getSongs = () => {
    TopSongsFetch.shortTerm().then((object) => {
      console.log(object);
      const allSongs = object.items;
      setShortTermSongs(allSongs);
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
        <h2>4 Weeks</h2>
        <p>
          {shortTermSongs.map((object) => (
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
        </p>
      </div>
      <div>
        <h2>6 months</h2>
        <p>
          {mediumTermSongs.map((object) => (
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
        </p>
      </div>
      <div>
        <h2>2-3 years</h2>
        <p>
          {longTermSongs.map((object) => (
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
        </p>
      </div>
    </>
  );
};

export default TopSongsList;
