import { connect } from "react-redux";
import TripDetails from "./TripDetails";
import { getTripDetails,
    deleteActivity,
    changeFilterDate,
    setGroupingMode,
} from "./TripDetailsActions";
import {
    populateActivityForm,
    populateFilterDate,
} from "../newActivity/NewActivityActions";

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
        getTripDetails: (id, categories, mode, tripDetails) => {
            dispatch(getTripDetails(id, categories, mode, tripDetails));
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
        populateActivityForm: (activityObject, categories) => {
            dispatch(populateActivityForm(activityObject, categories));
        },
        populateFilterDate: (filterDate) => {
            dispatch(populateFilterDate(filterDate));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedTripDetails = componentConnector(TripDetails);