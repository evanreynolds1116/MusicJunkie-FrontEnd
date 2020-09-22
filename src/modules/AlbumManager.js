export default {
  fetchAlbums() {
    return fetch(`http://localhost:8000/albums`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("music_token")}`,
      },
    }).then((response) => response.json());
  },
  deleteAlbum(id) {
    return fetch(`http://localhost:8000/albums/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("music_token")}`,
      },
    });
  },
  editAlbum(editedAlbum) {
    return fetch(`http://localhost:8000/albums/${editedAlbum.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("music_token")}`,
      },
      body: JSON.stringify(editedAlbum),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },
};
