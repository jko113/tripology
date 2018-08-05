import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {

    componentDidMount() {
        //console.log(this.props.match.params);
    }

    getAuthorizationModeButton = (mode) => {
        // console.log(mode, "mode")
        let formattedMode = "";
        // console.log(formattedMode, "formattedMode")

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
            // <div
            
            // >
                <Link
                    className="link-item-bigger app-flex app-small-margin"
                    onClick={() => {
                        this.props.changeAuthorizationMode(mode, false);
                    }}
                    to={`/${mode}`}
                >{formattedMode}
                </Link>
            // </div>
        );
    };

    getUnauthenticatedUserLinks = () => {

        /**** THIS ALLOWS FOR TOGGLING OF BUTTONS */

        // const authMode = this.props.user.authorizationMode;

        // if (authMode === "signin") {
        //     return this.getAuthorizationModeButton("signup");
        // } else if (authMode === "signup") {
        //     return this.getAuthorizationModeButton("signin");
        // } else {
        //     return (
        //     <div className="app-flex">
        //         {this.getAuthorizationModeButton("signin")}
        //         {this.getAuthorizationModeButton("signup")}
        //     </div>);
        // }

        /**** THIS LEAVES BOTH BUTTONS DISPLAYING WHILE UNAUTHENTICATED */

        return (
            <div className="app-flex app-margin-top">
                {this.getAuthorizationModeButton("signin")}
                {this.getAuthorizationModeButton("signup")}
            </div>);
    };

    getAuthenticatedUserLinks = () => {
        const username = this.props.user.username;
        const MAX_CHARACTER_LENGTH = 11;
        const tripsButtonText = username.length > MAX_CHARACTER_LENGTH ? "My Trips" : username + "'s Trips";
        // console.log(username.length);

        return (
            <div className="app-flex app-margin-top">
                {/* <div className="link-item-bigger app-flex app-small-margin"> */}
                <div>
                    <Link
                        className="link-item-bigger app-flex app-small-margin"
                        to={`/allTripsByUser/${this.props.user.userId}`}>{tripsButtonText}
                    </Link>
                    {/* <Link to={`/allTripsByUser/${this.props.user.userId}`}>My Trips</Link> */}
                </div>
                <div>
                    <Link
                        className="link-item-bigger app-flex app-small-margin"
                        onClick={() => {
                            this.props.signOut();
                        }}
                        to={`/signout`}
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
            // <div className="app-flex">
            <div className="app-header app-flex app-flex-column full-width app-margin-top">
                <div className="app-flex app-flex-space-between full-width app-small-margin-bottom app-small-padding-sides">
                    <div>
                        <Link
                            className="pointer link-item app-flex"
                            onClick={ () => {
                                // const authMode = this.props.user.authorizationMode;
                                // if (authMode) {
                                    this.props.changeAuthorizationMode("", loggedIn);
                                // }
                            }}
                            to="/"
                            // className="pointer"
                            // onClick={ () => {
                            //     this.props.changeAuthorizationMode("");
                            // }}
                        >Home</Link>
                    </div>
                    <div
                        
                        // onClick={() => {
                        //     this.props.createNewTrip({});
                        // }}
                    >
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