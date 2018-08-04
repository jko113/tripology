/*
import { GET_ALL_TRIPS } from "./AllTripsActions";

const initialState = {
    data: [],
    isActive: true,
};

export const allTripsReducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_ALL_TRIPS:
            return Object.assign({}, state, {data: action.payload});
        case TOGGLE_IS_ACTIVE:
            return Object.assign({}, state, {isActive: !state.isActive})
        default:
            return state;
    }
};
*/

import {
    GET_TRIP,
    // JUST_CREATED_TRIP,
} from "./TripActions";
import { CREATE_NEW_TRIP } from "../../components/newTrip/NewTripActions";

const initialState = {
    data: {},
};

export const TripReducer = (
    state = initialState,
    action
) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_TRIP:
            // return Object.assign({}, state, {data: action.payload});
            // console.log(action);
            return {
                data: action.payload,
            };
        case CREATE_NEW_TRIP:
            return {
                data: action.payload,
            };
        // case JUST_CREATED_TRIP:
        //     console.log("got to the JUST_CREATED_TRIP reducer");
        //     console.log("state", state);
        //     return {
        //         ...state,
        //         justCreatedTrip: false,
        //     };
            // return state;
        default:
            return state;
    }
}; 