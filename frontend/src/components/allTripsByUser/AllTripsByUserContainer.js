import { connect } from "react-redux";
import AllTripsByUser from "./AllTripsByUser";
import { getAllTripsByUser } from "./AllTripsByUserActions";

const mapStateToProps = (state) => {
    return {
        allTripsByUser: state.allTripsByUser,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTripsByUser: (userId) => {
            dispatch(getAllTripsByUser(userId));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedAllTripsByUser = componentConnector(AllTripsByUser);