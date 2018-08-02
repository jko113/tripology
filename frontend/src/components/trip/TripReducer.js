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

import { GET_TRIP } from "./TripActions";
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
            return Object.assign({}, state, {data: action.payload});
        case CREATE_NEW_TRIP:
            return {
                data: action.payload,
            };
        default:
            return state;
    }
}; 