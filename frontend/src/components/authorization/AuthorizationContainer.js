import { connect } from "react-redux";
import Authorization from "./Authorization";
import { updateUsername, updatePassword, logIn, createNewUser } from "../../shared/user/UserActions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUsername: (typedValue) => {
            dispatch(updateUsername(typedValue));
        },
        updatePassword: (typedValue) => {
            dispatch(updatePassword(typedValue));
        },
        logIn: (username, password) => {
            dispatch(logIn(username, password));
        },
        createNewUser: (username, password) => {
            dispatch(createNewUser(username, password));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedAuthorization = componentConnector(Authorization);