import { GET_ALL_TRIPS } from "./AllTripsActions";

const initialState = {
    data: []
};

export const allTripsReducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_ALL_TRIPS:
            return Object.assign({}, state, {data: action.payload});
        default:
            return state;
    }
};