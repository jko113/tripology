import { connect } from "react-redux";
import NewActivity from "./NewActivity";
import {
    createNewActivity,
    updateTitle,
    updateDescription,
    updateDate,
} from "./NewActivityActions";

const mapStateToProps = (state) => {
    return {
        newActivity: state.newActivity,
        user: state.user,
        currentTrip: state.currentTrip,
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
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedNewActivity = componentConnector(NewActivity);