import React from "react";
import { Button } from "reactstrap"
import getAccessToken from "../auth/SpotifyLogin";

const SpotifyConnect = (props) => {

    const connect = () => {
        getAccessToken();
        props.history.push({ pathname: "/home"})
    }

    return (
        <div>
            <Button onClick={() => connect()}>Connect Spotify Account</Button>
        </div>
    )
}

export default SpotifyConnect