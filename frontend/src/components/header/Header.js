import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {

    componentDidMount() {
        //console.log(this.props.match.params);
    }

    checkIfSigningIn = () => {
        // console.log(this.props.user.authorizationMode !== "signin");
        if (this.props.user.authorizationMode !== "signin") {
            return (
                <li
                    onClick={() => {
                        // console.log("onClick: ", this.props);
                        this.props.changeAuthorizationMode("signin")
                    }}
                >
                    <Link
                        to={`/signin`}
                    >Sign In
                    </Link>
                </li>
            );
        } else return null;
    };

    checkIfSigningUp = () => {
        if (this.props.user.authorizationMode !== "signup") {
            return (
                <li
                    onClick={() =>
                        this.props.changeAuthorizationMode("signup")
                    }
                >
                    <Link
                        to={`/signup`}
                    >Sign Up (To Do)
                    </Link>
                </li>
            );
        } else return null;
    };

    createLinks = () => {
        if (!this.props.user.authenticated) {
            return (
                <div>
                    {this.checkIfSigningIn()}
                    {this.checkIfSigningUp()}
                </div>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to={`/allTripsByUser/${this.props.user.userId}`}>Your Trips</Link>
                    </li>
                    <li
                        onClick={() => {
                            this.props.signOut();
                        }}
                    >
                        <Link to={`/signout`}>Sign Out</Link>
                    </li>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <ul>
                    <li
                        onClick={ () => {
                            const authMode = this.props.user.authorizationMode;
                            if (authMode) {
                                this.props.changeAuthorizationMode("");
                            }
                        }}
                    >
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/allTrips">All Trips (God Mode)</Link>
                    </li>
                </ul>
                
                <ul>
                    {this.createLinks()}
                </ul>
            </div>
        );
    }
};

export default Header;