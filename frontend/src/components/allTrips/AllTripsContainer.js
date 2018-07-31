import { connect } from "react-redux";
import AllTrips from "./AllTrips";
import { getAllTrips } from "./AllTripsActions";

const mapStateToProps = (state) => {
    return {
        allTrips: state.allTrips,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTrips: () => {
            dispatch(getAllTrips());
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedAllTrips = componentConnector(AllTrips);