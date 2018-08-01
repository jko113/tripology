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
            <div
                className="link-item app-flex app-small-margin"
                onClick={() => {
                    this.props.changeAuthorizationMode(mode)
                }}
            >
                <Link
                    to={`/${mode}`}
                >{formattedMode}
                </Link>
            </div>
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
        return (
            <div className="app-flex app-margin-top">
                <div className="link-item app-flex app-small-margin">
                    <Link to={`/allTripsByUser/${this.props.user.userId}`}>{this.props.user.username}'s Trips</Link>
                </div>
                <div
                    className="link-item app-flex app-small-margin"
                    onClick={() => {
                        this.props.signOut();
                    }}
                >
                    <Link to={`/signout`}>Sign Out</Link>
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
        return (
            // <div className="app-flex">
            <div className="app-header app-flex app-flex-column full-width app-margin-top">
                <div className="app-flex app-flex-space-between full-width app-small-margin-bottom app-small-padding-sides">
                    <div
                        className="link-item app-flex"
                        onClick={ () => {
                            // const authMode = this.props.user.authorizationMode;
                            // if (authMode) {
                                this.props.changeAuthorizationMode("");
                            // }
                        }}
                    >
                        <Link
                            to="/"
                            // onClick={ () => {
                            //     this.props.changeAuthorizationMode("");
                            // }}
                        >Home</Link>
                    </div>
                    <div
                        className="link-item app-flex"
                        onClick={() => {
                            this.props.godMode();
                        }}
                    >
                        <Link to="/allTrips">God Mode</Link>
                    </div>
                </div>
                
                {/* <div> */}
                {this.createLinks()}
                {/* </div> */}
            </div>
        );
    }
};

export default Header;