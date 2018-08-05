import { connect } from "react-redux";
import TripDetails from "./TripDetails";
import { getTripDetails,
    deleteActivity,
    // justCreatedActivity,
} from "./TripDetailsActions";

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
        // justCreatedActivity: () => {
        //     dispatch(justCreatedActivity());
        // },
        deleteActivity: (activityId, activitiesArray) => {
            dispatch(deleteActivity(activityId, activitiesArray));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTripDetails = componentConnector(TripDetails);