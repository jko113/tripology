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
    // console.log("got to reducer");
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_ALL_TRIPS_BY_USER:
            // console.log("action: ", action);
            return Object.assign({}, state, {data: action.payload});
        case DELETE_TRIP:
            console.log(state.data, "data");
            console.log(action);
            dataCopy = state.data.filter(i => i.trip_id !== action.tripId);
            // dataCopy.f
            return Object.assign({}, state, {
                data: dataCopy,
            });
        case CREATE_NEW_TRIP:
            dataCopy = state.data.map(i => i);
            dataCopy.push(action.payload);
            // console.log(action, "action createnewtrip");
            return Object.assign({}, state, {
                data: dataCopy,
            });
        default:
            return state;
    }
};