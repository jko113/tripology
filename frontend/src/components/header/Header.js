import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {

    componentDidMount() {
        //console.log(this.props.match.params);
    }

    createLinks = () => {
        console.log("header props: ", this.props);
        if (!this.props.user.authenticated) {
            return (
                <div>
                    <li
                        onClick={() => {
                            console.log("onClick: ", this.props);
                            this.props.changeAuthorizationMode("signup")
                        }}
                    >
                        <Link
                            to={`/signup`}
                        >Sign Up
                        </Link>
                    </li>
                    <li
                        onClick={() =>
                            this.props.changeAuthorizationMode("signin")
                        }
                    >
                        <Link
                            to={`/signin`}
                        >Sign In
                        </Link>
                    </li>
                </div>
            );
        } else {
            return (
                <li
                    onClick={() => {
                        this.props.signOut();
                    }}
                >
                    <Link to={`/signout`}>Sign Out</Link>
                </li>
            );
        }
    };

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/allTrips">All Trips</Link>
                    </li>
                    <li>
                        <Link to={`/allTripsByUser/1`}>All Trips By User</Link>
                    </li>
                </ul>
                    {this.createLinks()}
                <ul>
                  
                </ul>
            </div>
        );
    }
};

export default Header;