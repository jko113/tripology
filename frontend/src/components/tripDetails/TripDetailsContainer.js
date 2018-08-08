import { connect } from "react-redux";
import TripDetails from "./TripDetails";
import { getTripDetails,
    deleteActivity,
    changeFilterDate,
    setGroupingMode,
} from "./TripDetailsActions";

const mapStateToProps = (state) => {
    return {
        tripDetails: state.tripDetails,
        user: state.user,
        currentTrip: state.currentTrip,
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTripDetails: (id, categories, mode) => {
            dispatch(getTripDetails(id, categories, mode));
        },
        deleteActivity: (activityId, activitiesArray, groupedActivitiesArray, groupedMode) => {
            dispatch(deleteActivity(activityId, activitiesArray, groupedActivitiesArray, groupedMode));
        },
        changeFilterDate: (typedValue) => {
            dispatch(changeFilterDate(typedValue));
        },
        setGroupingMode: () => {
            dispatch(setGroupingMode());
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTripDetails = componentConnector(TripDetails);