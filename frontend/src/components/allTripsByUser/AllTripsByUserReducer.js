import { GET_ALL_TRIPS_BY_USER } from "./AllTripsByUserActions";
import {
    DELETE_TRIP,
} from "../trip/TripActions";

import {
    CREATE_NEW_TRIP,
} from "../newTrip/NewTripActions";

const initialState = {
    data: []
};

export const allTripsByUserReducer = (state = initialState, action) => {

    let dataCopy;
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_ALL_TRIPS_BY_USER:
            return Object.assign({}, state, {data: action.payload});
        case DELETE_TRIP:
            dataCopy = state.data.filter(i => i.trip_id !== action.tripId);
            return Object.assign({}, state, {
                data: dataCopy,
            });
        case CREATE_NEW_TRIP:
            dataCopy = state.data.map(i => i);
            dataCopy.push(action.payload);
            return Object.assign({}, state, {
                data: dataCopy,
            });
        default:
            return state;
    }
};