import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {

    getAuthorizationModeButton = (mode) => {
        let formattedMode = "";

        switch (mode) {
            case "signin":
                formattedMode = "Sign In";
                break;
            case "signup":
                formattedMode = "Sign Up";
                break;
            default:
                return null;
        }

        return (
            <div>
                <Link
                    className="header-link-item app-flex app-small-margin"
                    onClick={() => {
                        this.props.changeAuthorizationMode(mode, false);
                    }}
                    to={`/${mode}`}
                >{formattedMode}
                </Link>
            </div>
        );
    };

    getUnauthenticatedUserLinks = () => {

        return (
            <div className="app-flex">
                {this.getAuthorizationModeButton("signin")}
                {this.getAuthorizationModeButton("signup")}
            </div>);
    };

    getAuthenticatedUserLinks = () => {
        const username = this.props.user.username;
        const MAX_CHARACTER_LENGTH = 11;
        const tripsButtonText = username.length > MAX_CHARACTER_LENGTH ? "My Trips" : username + "'s Trips";

        return (
            <div className="app-flex">
                <div>
                    <Link
                        className="header-link-item app-flex app-small-margin"
                        to={`/allTripsByUser/${this.props.user.userId}`}>{tripsButtonText}
                    </Link>
                </div>
                <div>
                    <Link
                        className="header-link-item app-flex app-small-margin"
                        onClick={() => {
                            this.props.signOut();
                        }}
                        to={`/`}
                    >Sign Out</Link>
                </div>
            </div>
        );
    };

    createLinks = () => {
        if (!this.props.user.authenticated) {
            return this.getUnauthenticatedUserLinks();
        } else {
            return this.getAuthenticatedUserLinks();
        }
    };

    render() {

        const newTrip = this.props.user.authenticated ? "": "hidden";
        const loggedIn = this.props.user.authenticated ? true: false;

        return (
            <div className="app-header app-flex full-width app-flex-space-between">
                <div className="app-flex">
                    <div>
                        <Link
                            className="pointer header-link-item app-flex app-small-margin"
                            onClick={ () => {
                                this.props.changeAuthorizationMode("", loggedIn);
                            }}
                            to="/"
                        >Home</Link>
                    </div>
                    <div>
                        <Link
                            className={`link-item app-flex ${newTrip}`}
                            to="/newTrip">New Trip
                        </Link>
                    </div>
                </div>
                {this.createLinks()}
            </div>
        );
    }
};

export default Header;