import { connect } from "react-redux";
import Trip from "./Trip";
import {
    getOneTrip,
    resetJustCreatedTrip,
    deleteTrip,
} from "./TripActions";

const mapStateToProps = (state) => {
    return {
        currentTrip: state.currentTrip,
        user: state.user,
        newTrip: state.newTrip,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOneTrip: (id) => {
            dispatch(getOneTrip(id));
        },
        resetJustCreatedTrip: () => {
            dispatch(resetJustCreatedTrip());
        },
        deleteTrip: (tripId) => {
            dispatch(deleteTrip(tripId));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTrip = componentConnector(Trip);