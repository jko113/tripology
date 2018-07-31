import { connect } from "react-redux";
import Header from "./Header";
import { changeAuthorizationMode, signOut } from "../../shared/user/UserActions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
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
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedHeader = componentConnector(Header);