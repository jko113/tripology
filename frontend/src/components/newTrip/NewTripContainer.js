import { connect } from "react-redux";
import NewTrip from "./NewTrip";
import {
    createNewTrip,
    editTrip,
    updateTitle,
    updateDescription,
    updateDate,
    populateEditTripForm,
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
        editTrip: (tripDetails) => {
            dispatch(editTrip(tripDetails));
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
        populateEditTripForm: (currentTrip) => {
            dispatch(populateEditTripForm(currentTrip));
        },
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export const ConnectedNewTrip = componentConnector(NewTrip);