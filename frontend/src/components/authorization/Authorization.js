import React from "react";
import Home from "../home/Home";

class Authorization extends React.Component {

    getAuthInputFields = (mode) => {

        let formattedMode = "";
        let correctFunction = "";
        let correctMessage = "";

        switch (mode) {
            case "signin":
                formattedMode = "Sign In";
                correctFunction = this.props.logIn;
                correctMessage = "Log In";
                break;
            case "signup":
                formattedMode = "Sign Up";
                correctFunction = this.props.createNewUser;
                correctMessage = "Submit";
                break;
            default:
                return null;
        }

        return (
                <div className="app-flex app-flex-column">
                    <div className="h1">{formattedMode}</div>
                    <div className="app-flex">
                        <input
                            type="text"
                            className="app-small-margin app-small-padding"
                            key="username"
                            placeholder="username"
                            value={this.props.user.username}
                            onChange={ (e) =>
                                this.props.updateUsername(e.target.value.slice(0,12))
                            }
                        />
                        <input
                            type="password"
                            className="app-small-margin app-small-padding"
                            key="password"
                            placeholder="password"
                            value={this.props.user.password}
                            onChange={ (e) =>
                                this.props.updatePassword(e.target.value.slice(0,12))}
                        />
                    </div>
                    <div
                        className="link-item app-flex app-small-margin-top pointer"
                        onClick={() => {
                            correctFunction(
                                this.props.user.username,
                                this.props.user.password
                            );
                        }}
                    >
                        {correctMessage}
                    </div>
                    <div className="error app-margin-top">
                        {this.props.user.errorMessage}
                    </div>
                </div>
        );
    };

    render () {

        const authMode = this.props.user.authorizationMode;
        const path = this.props.match.path;
        
        // not authenticated
        if (!this.props.user.authenticated) {
            if (authMode) {
                return (
                    <div className="screen-height app-flex">
                        {this.getAuthInputFields(authMode)}
                    </div>
                );
            } else if (path.toLowerCase() === "/signup" || path.toLowerCase() === "/signin") {
                return (
                    <div className="screen-height app-flex">
                        {this.getAuthInputFields(path.slice(1).toLowerCase())}
                    </div>
                );
            } else {
                return <div className="screen-height app-flex app-flex-center">Please sign in or create an account.</div>;
            }
        }
        
        // authenticated
        else {
            return <Home userData={this.props} />;
        }
    }
    
}

export default Authorization;