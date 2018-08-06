import { connect } from "react-redux";
import TripDetails from "./TripDetails";
import { getTripDetails,
    deleteActivity,
    // changeVisibilityFilter,
    changeFilterDate,
    // justCreatedActivity,
} from "./TripDetailsActions";

const mapStateToProps = (state) => {
    return {
        tripDetails: state.tripDetails,
        user: state.user,
        currentTrip: state.currentTrip,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTripDetails: (id) => {
            dispatch(getTripDetails(id));
        },
        // justCreatedActivity: () => {
        //     dispatch(justCreatedActivity());
        // },
        deleteActivity: (activityId, activitiesArray) => {
            dispatch(deleteActivity(activityId, activitiesArray));
        },
        // changeVisibilityFilter: (mode) => {
        //     dispatch(changeVisibilityFilter(mode));
        // },
        changeFilterDate: (typedValue) => {
            dispatch(changeFilterDate(typedValue));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTripDetails = componentConnector(TripDetails);