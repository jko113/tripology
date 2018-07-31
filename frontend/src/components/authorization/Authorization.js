import React from "react";

class Authorization extends React.Component {

    render () {
        // console.log("auth props: ", this.props);
        // not authenticated
        if (!this.props.user.authenticated) {

            if (this.props.user.authorizationMode === "signin") {
                return (
                    <div>
                        <h1>Sign In</h1>
                        <input
                            key="username"
                            value={this.props.user.username}
                            onChange={ (e) =>
                                this.props.updateUsername(e.target.value)
                            }
                        />
                        <input
                            key="password"
                            value={this.props.user.password}
                            onChange={ (e) =>
                                this.props.updatePassword(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                this.props.logIn(
                                    this.props.user.username,
                                    this.props.user.password
                                );
                            }}
                        >
                            Log In
                        </button>
                        <div>
                            {this.props.user.errorMessage}
                        </div>
                    </div>
                );
            } else if (this.props.user.authorizationMode === "signup") {
                return (
                    <div>
                        <h1>Signing Up</h1>
                        <input
                            key="username"
                            value={this.props.user.username}
                            onChange={ (e) =>
                                this.props.updateUsername(e.target.value)
                            }
                        />
                        <input
                            key="password"
                            value={this.props.user.password}
                            onChange={ (e) =>
                                this.props.updatePassword(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                this.props.createNewUser(
                                    this.props.user.username,
                                    this.props.user.password
                                );
                                // console.log("submitted create user request");
                            }}
                        >
                            Log In
                        </button>
                        <div>
                            {this.props.user.errorMessage}
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        }
        // authenticated
        else {
            return (
                <div>Logged in successfully.</div>
            );
        }
    }
    
}

export default Authorization;