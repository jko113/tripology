import { GET_TRIP_DETAILS } from "./TripDetailsActions";

const initialState = {
    data: [],
};

export const TripDetailsReducer = (
    state = initialState,
    action
) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_TRIP_DETAILS:
            return Object.assign({}, state, {data: action.payload});
        default:
            return state;
    }
}; 