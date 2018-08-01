import React from "react";

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
                            className="app-small-margin app-small-padding"
                            key="username"
                            placeholder="username"
                            value={this.props.user.username}
                            onChange={ (e) =>
                                this.props.updateUsername(e.target.value)
                            }
                        />
                        <input
                            className="app-small-margin app-small-padding"
                            key="password"
                            placeholder="password"
                            value={this.props.user.password}
                            onChange={ (e) =>
                                this.props.updatePassword(e.target.value)}
                        />
                    </div>
                    <div
                        className="link-item app-flex app-small-margin-top"
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
        // console.log("render auth:", this.props);
        // console.log("path:", path);
        
        // not authenticated
        if (!this.props.user.authenticated) {
            if (authMode) {
                return (
                    <div className="">
                        {this.getAuthInputFields(authMode)}
                    </div>
                );
            } else if (path.toLowerCase() === "/signup" || path.toLowerCase() === "/signin") {
                return (
                    <div className="">
                        {this.getAuthInputFields(path.slice(1).toLowerCase())}
                    </div>
                );
            } else {
                // return null;
                return <div className="app-flex app-flex-center">Please sign in or create an account.</div>;
            }
        }
        
        // authenticated
        else {
            return null;
            // return (
            //     <div>Logged in successfully.</div>
            // );
        }
    }
    
}

export default Authorization;