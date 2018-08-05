import { connect } from "react-redux";
import NewActivity from "./NewActivity";
import { getOneTrip } from "../trip/TripActions";
import {
    createNewActivity,
    updateTitle,
    updateDescription,
    updateDate,
    updateCost,
    updateLocation,
} from "./NewActivityActions";

const mapStateToProps = (state) => {
    return {
        newActivity: state.newActivity,
        user: state.user,
        currentTrip: state.currentTrip,
        tripDetails: state.tripDetails,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewActivity: (activityDetails) => {
            dispatch(createNewActivity(activityDetails));
        },
        updateTitle: (typedValue) => {
            dispatch(updateTitle(typedValue));
        },
        updateDescription: (typedValue) => {
            dispatch(updateDescription(typedValue));
        },
        updateDate: (dateValue, mode) => {
            dispatch(updateDate(dateValue, mode));
        },
        updateCost: (typedValue) => {
            dispatch(updateCost(typedValue));
        },
        updateLocation: (typedValue) => {
            dispatch(updateLocation(typedValue));
        },
        getOneTrip: (id) => {
            dispatch(getOneTrip(id));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedNewActivity = componentConnector(NewActivity);