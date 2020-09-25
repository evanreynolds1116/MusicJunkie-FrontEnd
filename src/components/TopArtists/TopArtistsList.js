import React, { useState, useEffect } from "react";
import TopArtistsFetch from "./TopArtistsFetch";
import { Table } from "reactstrap";

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
      <div id="top-artists-header">
        <h1>Top Artists</h1>
      </div>
      <div id="top-artists-short">
        <div id="top-artists-short-header">
          <h2 class="top-artist-timeframe-header">4 Weeks</h2>
        </div>
        <div class="top-artists-object">
          <div class="top-artists-object">
            {shortTermArtists.map((object) => (
              <div class="top-artists-details">
                <h4 class="artist-name">{object.name}</h4>
                <img
                  src={object.images[0].url}
                  width="440px"
                  height="440px"
                  alt="artist"
                />
                <iframe
                  src={`https://open.spotify.com/embed/artist/${object.id}`}
                  width="440"
                  height="460"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title="Spotify"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        {/* <Table id="top-artists-table-short">
          <thead>
            <tr>
              <th>Artist Image</th>
              <th></th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {shortTermArtists.map((object) => (
              <tr key={object.id}>
                <td>
                  <img
                    src={object.images[0].url}
                    width="380px"
                    height="380px"
                    alt="artist"
                  />
                </td>
                <td>
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
                </td>
                <td>{object.name}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
      <div id="top-artists-medium">
        <div id="top-artists-medium-header">
          <h2 class="top-artist-timeframe-header">6 Months</h2>
        </div>
        <div class="top-artists-object">
          <div class="top-artists-object">
            {mediumTermArtists.map((object) => (
              <div class="top-artists-details">
                <h4 class="artist-name">{object.name}</h4>
                <img
                  src={object.images[0].url}
                  width="440px"
                  height="440px"
                  alt="artist"
                />
                <iframe
                  src={`https://open.spotify.com/embed/artist/${object.id}`}
                  width="440"
                  height="460"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title="Spotify"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        {/* <Table id="top-artists-table-medium">
          <thead>
            <tr>
              <th>Artist Image</th>
              <th></th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {mediumTermArtists.map((object) => (
              <tr key={object.id}>
                <td>
                  <img
                    src={object.images[0].url}
                    width="380px"
                    height="380px"
                    alt="artist"
                  />
                </td>
                <td>
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
                </td>
                <td>{object.name}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
      <div id="top-artists-long">
        <div id="top-artists-long-header">
          <h2 class="top-artist-timeframe-header">2-3 Years</h2>
        </div>
        <div class="top-artists-object">
          <div class="top-artists-object">
            {longTermArtists.map((object) => (
              <div class="top-artists-details">
                <h4 class="artist-name">{object.name}</h4>
                <img
                  src={object.images[0].url}
                  width="440px"
                  height="440px"
                  alt="artist"
                />
                <iframe
                  src={`https://open.spotify.com/embed/artist/${object.id}`}
                  width="440"
                  height="460"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title="Spotify"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        {/* <Table id="top-artists-table-long">
          <thead>
            <tr>
              <th>Artist Image</th>
              <th></th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {longTermArtists.map((object) => (
              <tr key={object.id}>
                <td>
                  <img
                    src={object.images[0].url}
                    width="380px"
                    height="380px"
                    alt="artist"
                  />
                </td>
                <td>
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify"
                   ></iframe>
                </td>
                <td>{object.name}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      </div>
    </>
  );
};

export default TopArtistsList;
