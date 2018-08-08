import {
    CREATE_NEW_ACTIVITY,
    UPDATE_ACTIVITY_TITLE,
    UPDATE_ACTIVITY_START_DATE,
    UPDATE_ACTIVITY_END_DATE,
    UPDATE_ACTIVITY_DESCRIPTION,
    UPDATE_ACTIVITY_COST,
    CREATE_NEW_ACTIVITY_FAILED,
    JUST_CREATED_ACTIVITY,
    UPDATE_ACTIVITY_LOCATION,
    SET_CATEGORY,
    // tripStartDate,
    // tripEndDate,
} from "./NewActivityActions";

import { GET_TRIP_DETAILS } from "../tripDetails/TripDetailsActions";
import { GET_TRIP } from "../trip/TripActions";

import { getLocalDate } from "../../shared/date/Date";

// import { JUST_CREATED_ACTIVITY } from "../../components/tripDetails/TripDetailsActions";

import {
    // MAX,
    MIN,
    formatDate,
} from "../../components/newTrip/NewTrip";

const initialState = {
    title: "",
    description: "",
    location: "",
    startDate: formatDate(getLocalDate(new Date(MIN.getTime() + 1000*24*60*60))),
    endDate: formatDate(getLocalDate(new Date(MIN.getTime() + 1000*24*60*60))),
    // startDate: tripStartDate,
    // endDate: tripEndDate,
    userHasInputStart: false,
    userHasInputEnd: false,
    userHasInputCost: false,
    justCreatedActivity: false,
    cost: "",
    category: "",
};

export const newActivityReducer = (
    state = initialState,
    action,
) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case CREATE_NEW_ACTIVITY:
            // return {
            //     // ...state, 
            //     // tripData: action.payload,
            //     errorMessage: undefined,
            // };
            return Object.assign({}, initialState, {
                // startDate: state.startDate,
                // endDate: state.endDate,
                errorMessage: undefined,
                justCreatedActivity: true,
                activityId: action.activityId,
                tripId: action.tripId,
            });
        case JUST_CREATED_ACTIVITY:
            return {
                ...state,
                justCreatedActivity: false,
                userHasInputCategory: false,
                userHasInputCost: false,
                userHasInputStart: false,
                userHasInputEnd: false,
            };
        case UPDATE_ACTIVITY_TITLE:
            return {
                ...state,
                title: action.payload,
                // errorMessage: undefined,
            };
        case UPDATE_ACTIVITY_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
                // errorMessage: undefined,
            };
        case UPDATE_ACTIVITY_START_DATE:
            return {
                ...state,
                startDate: action.payload,
                userHasInputStart: true,
            };
        case UPDATE_ACTIVITY_END_DATE:
            return {
                ...state,
                endDate: action.payload,
                userHasInputEnd: true,
            };
        case CREATE_NEW_ACTIVITY_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        case UPDATE_ACTIVITY_COST:
            return {
                ...state,
                cost: action.payload,
                userHasInputCost: true,
            };
        case UPDATE_ACTIVITY_LOCATION:
            return {
                ...state,
                location: action.payload,
            };
        case GET_TRIP_DETAILS:
            return {
                ...initialState,
                justCreatedActivity: false,
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        case GET_TRIP:
            return initialState;
        default:
            // return initialState;
            return state;
    }
};