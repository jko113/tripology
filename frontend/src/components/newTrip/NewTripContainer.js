import { connect } from "react-redux";
import NewTrip from "./NewTrip";
import {
    createNewTrip,
    updateTitle,
    updateDescription,
    updateDate,
} from "./NewTripActions";

const mapStateToProps = (state) => {
    return {
        newTrip: state.newTrip,
        user: state.user,
        currentTrip: state.currentTrip,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTrip: (tripDetails) => {
            dispatch(createNewTrip(tripDetails));
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

export const ConnectedNewTrip = componentConnector(NewTrip);