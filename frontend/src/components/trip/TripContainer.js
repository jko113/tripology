import { connect } from "react-redux";
import Trip from "./Trip";
import {
    getOneTrip,
    resetJustCreatedTrip,
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
            // console.log("dispatched 'just created trip' method");
            dispatch(resetJustCreatedTrip());
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTrip = componentConnector(Trip);