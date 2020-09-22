import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import "./Login.css";
import getAccessToken from "../auth/SpotifyLogin";

const Register = (props) => {
	const email = useRef();
	const userName = useRef();
	const password = useRef();
    const verifyPassword = useRef();
    const displayName = useRef();
    const spotifyId = useRef();
    const profilePicture = useRef();
	const { register } = useSimpleAuth();

	const handleRegister = (e) => {
		e.preventDefault();

		const newUser = {
			username: userName.current.value,
			email: email.current.value,
            password: password.current.value,
		};

		register(newUser).then(() => {
            getAccessToken();
			// props.history.push({
			// 	pathname: "/",
			// });
		});
    };

    // const spotifyUserFetch = () => {
    //     return fetch("https://api.spotify.com/v1/me", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("SpotifyAccessToken")}`
    //         }
    //     }).then((response) => response.json());
    // };
    
    // const getSpotifyUser = (e) => {
    //     e.preventDefault();

    //     spotifyUserFetch().then((object) => {
    //         console.log(object)
    //         const spotifyUserToAdd = { ...userSpotify}
    //         spotifyUserToAdd["display_name"] = object.display_name;
    //         spotifyUserToAdd["spotify_id"] = object.id;
    //         spotifyUserToAdd["profile_picture"] = object.images[0].url 
    //         setUserSpotify(spotifyUserToAdd)
    //     })
    // }

    // const [userSpotify, setUserSpotify] = useState({
    //     display_name: "",
    //     spotify_id: "",
    //     profile_picture: ""
    // })

    // const handleSpotifyUser = (object) => {
    //     const spotifyUserToAdd = { ...userSpotify }
    //     spotifyUserToAdd["display_name"] =  
    // }

	return (
		<main style={{ textAlign: "center" }}>
			<form className="form--login" onSubmit={handleRegister}>
				<h1 className="h3 mb-3 font-weight-normal">Register</h1>
				<fieldset>
					<label htmlFor="userName"> Username </label>
					<input
						ref={userName}
						type="text"
						name="userName"
						className="form-control"
						placeholder="Username"
						required
						autoFocus
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="inputEmail"> Email address </label>
					<input
						ref={email}
						type="email"
						name="email"
						className="form-control"
						placeholder="Email address"
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="inputPassword"> Password </label>
					<input
						ref={password}
						type="password"
						name="password"
						className="form-control"
						placeholder="Password"
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="verifyPassword"> Verify Password </label>
					<input
						ref={verifyPassword}
						type="password"
						name="verifyPassword"
						className="form-control"
						placeholder="Verify password"
						required
					/>
				</fieldset>
                {/* <fieldset>
                    <button onClickCapture={getSpotifyUser}>Connect To Spotify</button>
                </fieldset>
                <fieldset>
                    <label htmlFor="display_name">Spotify Display Name</label>
                    <input
                        ref={displayName}
                        type="text"
                        name="display_name"
                        value={userSpotify.display_name}
                        required
                        readOnly
                    ></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="spotify_id">Spotify ID</label>
                    <input
                        ref={spotifyId}
                        type="number"
                        name="spotify_id"
                        value={userSpotify.spotify_id}
                        required
                        readOnly
                    ></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_picture">Spotify Profile Picture</label>
                    <input
                        ref={profilePicture}
                        type="text"
                        name="proifle_picture"
                        value={userSpotify.profile_picture}
                        required
                        readOnly
                    ></input>
                    <img src={userSpotify.profile_picture} width="100px" height="100px" alt="profile pic" />
                </fieldset> */}
				<fieldset>
					<button type="submit">Sign in</button>
				</fieldset>
			</form>
		</main>
	);
};
export default withRouter(Register);