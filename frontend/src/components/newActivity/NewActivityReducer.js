import {
    CREATE_NEW_ACTIVITY,
    UPDATE_ACTIVITY_TITLE,
    UPDATE_ACTIVITY_START_DATE,
    UPDATE_ACTIVITY_END_DATE,
    UPDATE_ACTIVITY_DESCRIPTION,
    UPDATE_ACTIVITY_COST,
    CREATE_NEW_ACTIVITY_FAILED,
    EDIT_ACTIVITY_FAILED,
    JUST_CREATED_ACTIVITY,
    UPDATE_ACTIVITY_LOCATION,
    SET_CATEGORY,
    POPULATE_ACTIVITY_FORM,
} from "./NewActivityActions";

import { GET_TRIP_DETAILS } from "../tripDetails/TripDetailsActions";
import { GET_TRIP } from "../trip/TripActions";

// import {
//     getLocalDate,
//     formatDate,
// } from "../../shared/date/Date";

// import {
//     MIN,
// } from "../../components/newTrip/NewTrip";

const initialState = {
    title: "",
    description: "",
    location: "",
    // startDate: formatDate(getLocalDate(new Date(MIN.getTime() + 1000*24*60*60))),
    // endDate: formatDate(getLocalDate(new Date(MIN.getTime() + 1000*24*60*60))),
    userHasInputStart: false,
    userHasInputEnd: false,
    userHasInputCost: false,
    justCreatedActivity: false,
    cost: "",
    category: "",
    justPopulatedActivityForm: false,
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
            return Object.assign({}, initialState, {
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
            };
        case UPDATE_ACTIVITY_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
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
        case EDIT_ACTIVITY_FAILED:
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
                justPopulatedActivityForm: false,
                startDate: action.tripDetails.start_date,
                endDate: action.tripDetails.start_date,
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        case GET_TRIP:
            return initialState;
        case POPULATE_ACTIVITY_FORM:
            const {
                title,
                description,
                location,
                cost,
                activity_id,
                trip_id,
                start_date,
                end_date,
                contact_id,
                category_id,
            } = action.payload;

            return {
                ...state,
                title: title,
                description: description,
                location: location ? location: undefined,
                category: category_id,
                startDate: start_date,
                endDate: end_date,
                cost: cost,
                contactId: contact_id,
                activityId: activity_id,
                tripId: trip_id,
                justPopulatedActivityForm: true,
            };
        default:
            return state;
    }
};