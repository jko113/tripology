import {
    CREATE_NEW_TRIP,
    EDIT_TRIP,
    UPDATE_TITLE,
    UPDATE_START_DATE,
    UPDATE_END_DATE,
    UPDATE_DESCRIPTION,
    CREATE_NEW_TRIP_FAILED,
    EDIT_TRIP_FAILED,
    POPULATE_EDIT_TRIP_FORM,
} from "./NewTripActions";

import { JUST_CREATED_TRIP } from "../../components/trip/TripActions";
// import { getLocalDate } from "../../shared/date/Date";

import {
    // MAX,
    MIN,
} from "./NewTrip";

import {
    formatDate,
} from "../../shared/date/Date";

export const initialState = {
    title: "",
    description: "",
    startDate: formatDate(new Date(MIN.getTime() + 1000*24*60*60)),
    endDate: formatDate(new Date(MIN.getTime() + 1000*24*60*60*2)),
    // startDate: "",
    // endDate: "",
    userHasInputStart: false,
    userHasInputEnd: false,
    justCreatedTrip: false,
    justPopulatedEditTripForm: false,
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
            return Object.assign({}, initialState, {
                errorMessage: undefined,
                justCreatedTrip: true,
                justPopulatedEditTripForm: false,
            });
        case EDIT_TRIP:
            return Object.assign({}, initialState, {
                errorMessage: undefined,
                justCreatedTrip: true,
                justPopulatedEditTripForm: false,
            });
        case JUST_CREATED_TRIP:
            return {
                ...state,
                justCreatedTrip: false,
            };
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
        case EDIT_TRIP_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        case POPULATE_EDIT_TRIP_FORM:
            // console.log(action, "action");
            const target = action.payload.data;
            // return state;
            const returnObj = {
                title: target.title,
                description: target.description,
                justPopulatedEditTripForm: true,
                startDate: target.start_date,
                endDate: target.end_date,
                userHasInputStart: false,
                userHasInputEnd: false,
                justCreatedTrip: false,
            };
            return returnObj;
        default:
            return state;
    }
};