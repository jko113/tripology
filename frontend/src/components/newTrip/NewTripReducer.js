import {
    CREATE_NEW_TRIP,
    UPDATE_TITLE,
    UPDATE_START_DATE,
    UPDATE_END_DATE,
    UPDATE_DESCRIPTION,
    CREATE_NEW_TRIP_FAILED,
} from "./NewTripActions";

import {
    MAX,
    MIN,
    formatDate,
} from "./NewTrip";

const initialState = {
    title: "",
    description: "",
    startDate: formatDate(new Date(MIN.getTime() + 1000*24*60*60)),
    endDate: formatDate(new Date(MIN.getTime() + 1000*24*60*60*2)),
    // startDate: "",
    // endDate: "",
    userHasInputStart: false,
    userHasInputEnd: false,
};

export const newTripReducer = (
    state = initialState,
    action,
) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case CREATE_NEW_TRIP:
            // return {
            //     // ...state,
            //     // tripData: action.payload,
            //     errorMessage: undefined,
            // };
            return Object.assign({}, initialState, {
                // startDate: state.startDate,
                // endDate: state.endDate,
                errorMessage: undefined,
            });
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.payload,
                // errorMessage: undefined,
            };
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
                // errorMessage: undefined,
            };
        case UPDATE_START_DATE:
            return {
                ...state,
                startDate: action.payload,
                userHasInputStart: true,
            };
        case UPDATE_END_DATE:
            return {
                ...state,
                endDate: action.payload,
                userHasInputEnd: true,
            };
        case CREATE_NEW_TRIP_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
};