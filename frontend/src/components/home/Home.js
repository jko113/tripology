import React from "react";
import { Redirect } from "react-router-dom";

const Home = (props) => {

    const userProps = props.userData;

    // console.log("home props,", userProps);
    if (
        (userProps && userProps.match && userProps.match.path === "/signout")
    ) {
        // console.log("got to signout redirect");
        return <Redirect to="/" />;
    }

    /* redirect to allTripsByUser from signin route */

    // else if (userProps && userProps.match && userProps.match.path === "/signin") {
    //     // console.log("redirecting to alltripsbyuser", userProps);
    //     const userId = userProps.user.userId;
    //     return <Redirect to={`/allTripsByUser/${userId}`} />;
    // }

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