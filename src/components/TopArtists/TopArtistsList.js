import React, { useState, useEffect } from "react";
import TopArtistsFetch from "./TopArtistsFetch";

const TopArtistsList = (props) => {
  const [shortTermArtists, setShortTermArtists] = useState([]);
  const [mediumTermArtists, setMediumTermArtists] = useState([]);
  const [longTermArtists, setLongTermArtists] = useState([]);

  const getArtists = () => {
    TopArtistsFetch.shortTerm().then((object) => {
      const allArtists = object.items;
      setShortTermArtists(allArtists);
    });
    TopArtistsFetch.mediumTerm().then((object) => {
      const allArtists = object.items;
      setMediumTermArtists(allArtists);
    });
    TopArtistsFetch.longTerm().then((object) => {
      const allArtists = object.items;
      setLongTermArtists(allArtists);
    });
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <>
      <div>
        <h1>Top Artists</h1>
      </div>
      <div>
        <h2>4 Weeks</h2>
        <p>
          {shortTermArtists.map((object) => (
            <li key={object.id}>
              <img
                src={object.images[0].url}
                width="100px"
                height="100px"
                alt="artist"
              ></img>
              {object.name}
              <a href={object.external_urls.spotify}>Listen Here</a>
            </li>
          ))}
        </p>
      </div>
      <div>
        <h2>6 months</h2>
        <p>
          {mediumTermArtists.map((object) => (
            <li key={object.id}>
              <img
                src={object.images[0].url}
                width="100px"
                height="100px"
                alt="artist"
              ></img>
              {object.name}
              <a href={object.external_urls.spotify}>Listen Here</a>
            </li>
          ))}
        </p>
      </div>
      <div>
        <h2>2-3 years</h2>
        <p>
          {longTermArtists.map((object) => (
            <li key={object.id}>
              <img
                src={object.images[0].url}
                width="100px"
                height="100px"
                alt="artist"
              ></img>
              {object.name}
              <a href={object.external_urls.spotify}>Listen Here</a>
            </li>
          ))}
        </p>
      </div>
    </>
  );
};

export default TopArtistsList;
