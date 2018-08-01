import { connect } from "react-redux";
import Trip from "./Trip";
import { getOneTrip } from "./TripActions";

const mapStateToProps = (state) => {
    return {
        currentTrip: state.currentTrip,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOneTrip: (id) => {
            dispatch(getOneTrip(id));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTrip = componentConnector(Trip);