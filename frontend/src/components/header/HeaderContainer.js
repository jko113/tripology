import { connect } from "react-redux";
import Header from "./Header";
import {
    changeAuthorizationMode,
    signOut,
    loginFailed,
} from "../../shared/user/UserActions";

import { createNewTrip, } from "../../components/newTrip/NewTripActions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAuthorizationMode: (mode, auth) => {
            dispatch(changeAuthorizationMode(mode, auth));
        },
        signOut: () => {
            dispatch(signOut());
        },
        loginFailed: () => {
            dispatch(loginFailed());
        },
        createNewTrip: (tripDetails) => {
            dispatch(createNewTrip(tripDetails));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedHeader = componentConnector(Header);