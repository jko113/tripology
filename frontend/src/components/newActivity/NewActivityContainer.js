import { connect } from "react-redux";
import NewActivity from "./NewActivity";
import { getOneTrip } from "../trip/TripActions";
import {
    createNewActivity,
    editActivity,
    updateTitle,
    updateDescription,
    updateDate,
    updateCost,
    updateLocation,
    setCategory,
} from "./NewActivityActions";

const mapStateToProps = (state) => {
    return {
        newActivity: state.newActivity,
        user: state.user,
        currentTrip: state.currentTrip,
        tripDetails: state.tripDetails,
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewActivity: (activityDetails) => {
            dispatch(createNewActivity(activityDetails));
        },
        editActivity: (activityDetails, userId) => {
            dispatch(editActivity(activityDetails, userId));
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
        setCategory: (cat, cats) => {
            dispatch(setCategory(cat, cats));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedNewActivity = componentConnector(NewActivity);