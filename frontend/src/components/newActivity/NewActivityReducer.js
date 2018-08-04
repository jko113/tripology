import {
    CREATE_NEW_ACTIVITY,
    UPDATE_ACTIVITY_TITLE,
    UPDATE_ACTIVITY_START_DATE,
    UPDATE_ACTIVITY_END_DATE,
    UPDATE_ACTIVITY_DESCRIPTION,
    CREATE_NEW_ACTIVITY_FAILED,
    JUST_CREATED_ACTIVITY,
} from "./NewActivityActions";

// import { JUST_CREATED_ACTIVITY } from "../../components/tripDetails/TripDetailsActions";

import {
    // MAX,
    MIN,
    formatDate,
} from "../../components/newTrip/NewTrip";

const initialState = {
    title: "",
    description: "",
    startDate: formatDate(new Date(MIN.getTime() + 1000*24*60*60)),
    endDate: formatDate(new Date(MIN.getTime() + 1000*24*60*60)),
    // startDate: "",
    // endDate: "",
    userHasInputStart: false,
    userHasInputEnd: false,
    justCreatedActivity: false,
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
            });
        case JUST_CREATED_ACTIVITY:
            return {
                ...state,
                justCreatedActivity: false,
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
        default:
            return {
                ...state,
                justCreatedActivity: false,
            };
    }
};