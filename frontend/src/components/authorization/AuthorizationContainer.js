import { connect } from "react-redux";
import Authorization from "./Authorization";
import { updateUsername, updatePassword, logIn } from "../../shared/user/UserActions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        // form: state.form,
        // auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    // console.log("calling mapDispatchtoprops");
    return {
        updateUsername: (typedValue) => {
            // console.log("updating username typedVal: ", typedValue);
            dispatch(updateUsername(typedValue));
        },
        updatePassword: (typedValue) => {
            dispatch(updatePassword(typedValue));
        },
        logIn: (username, password) => {
            dispatch(logIn(username, password));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedAuthorization = componentConnector(Authorization);