import {
    GET_TRIP,
    DELETE_TRIP,
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
            return {
                data: action.payload,
            };
        case CREATE_NEW_TRIP:
            return {
                data: action.payload,
            };
        case DELETE_TRIP:
            return Object.assign({}, state, {
                data: {},
            });
        default:
            return state;
    }
}; 