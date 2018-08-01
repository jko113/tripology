import { connect } from "react-redux";
import TripDetails from "./TripDetails";
import { getTripDetails } from "./TripDetailsActions";

const mapStateToProps = (state) => {
    return {
        tripDetails: state.tripDetails,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTripDetails: (id) => {
            dispatch(getTripDetails(id));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTripDetails = componentConnector(TripDetails);