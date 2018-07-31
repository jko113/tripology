import { GET_ALL_TRIPS_BY_USER } from "./AllTripsByUserActions";

const initialState = {
    data: []
};

export const allTripsByUserReducer = (state = initialState, action) => {

    // console.log("got to reducer");
    if (!action) {
        return state;
    }

    switch (action.type) {
        case GET_ALL_TRIPS_BY_USER:
            // console.log("action: ", action);
            return Object.assign({}, state, {data: action.payload});
        default:
            return state;
    }
};