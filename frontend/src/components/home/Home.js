import React from "react";
import { Redirect } from "react-router-dom";

const Home = (props) => {

    const userProps = props.userData;

    if (
        (userProps && userProps.match && userProps.match.path === "/signout")
    ) {
        return <Redirect to="/" />;
    }

    // clicked 'Home' button
    return (
        <div className="app-home app-flex app-flex-column">
            <div className="app-flex app-logo">
                Tripology
            </div>
            <div className="app-flex app-description">
                Where to next?
            </div>
        </div>
    );
};

export default Home;