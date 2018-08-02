import { connect } from "react-redux";
import Header from "./Header";
import {
    changeAuthorizationMode,
    signOut,
    loginFailed,
    /*godMode, */
} from "../../shared/user/UserActions";

import { createNewTrip, } from "../../components/newTrip/NewTripActions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        // currentTrip: state.currentTrip,
        // allTripsByUser: state.allTripsByUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAuthorizationMode: (mode) => {
            dispatch(changeAuthorizationMode(mode));
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
        // godMode: () => {
        //     dispatch(godMode());
        // },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedHeader = componentConnector(Header);