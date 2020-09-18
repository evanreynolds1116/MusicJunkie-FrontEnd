import React, { useState, useEffect } from "react";
import TopArtistsFetch from "./TopArtistsFetch";
import { Button, Table } from "reactstrap";

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
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shortTermArtists.map((object) => (
              <tr key={object.id}>
                <td>
                  <img
                    src={object.images[0].url}
                    width="100px"
                    height="100px"
                    alt="artist"
                  />
                </td>
                <td>{object.name}</td>
                <td>
                  {/* <Button color="primary" href={object.external_urls.spotify}>Listen</Button> */}
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
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
              <th>#</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mediumTermArtists.map((object) => (
              <tr key={object.id}>
                <td>
                  <img
                    src={object.images[0].url}
                    width="100px"
                    height="100px"
                    alt="artist"
                  />
                </td>
                <td>{object.name}</td>
                <td>
                  {/* <Button color="primary" href={object.external_urls.spotify}>Listen</Button> */}
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
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
              <th>#</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {longTermArtists.map((object) => (
              <tr key={object.id}>
                <td>
                  <img
                    src={object.images[0].url}
                    width="100px"
                    height="100px"
                    alt="artist"
                  />
                </td>
                <td>{object.name}</td>
                <td>
                  {/* <Button color="primary" href={object.external_urls.spotify}>Listen</Button> */}
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${object.id}`}
                    width="300"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
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

export default TopArtistsList;
