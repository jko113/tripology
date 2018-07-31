import React from "react";

class Authorization extends React.Component {

    render () {
        // console.log("auth props: ", this.props);
        if (this.props.user.authorizationMode === "signin") {
            return (
                <div>
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
                </div>
            );
        } else {
            return (
                <div>signup</div>
            );
        }
    }
    
}

export default Authorization;