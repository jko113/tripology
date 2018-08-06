import {
    GET_TRIP_DETAILS,
    DELETE_ACTIVITY,
    // CHANGE_VISIBILITY_FILTER,
    CHANGE_FILTER_DATE,
} from "./TripDetailsActions";

const initialState = {
    data: [],
    visibilityFilter: "SHOW_ALL",
    filterDate: "",
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
            return Object.assign({}, state, {
                data: action.payload
            });
        case DELETE_ACTIVITY:
            return {
                ...state,
                data: action.payload,
            };
        // case CHANGE_VISIBILITY_FILTER:
        //     return {
        //         ...state,
        //         visibilityFilter: action.payload,
        //     };
        case CHANGE_FILTER_DATE:
            return {
                ...state,
                filterDate: action.payload,
            };
        default:
            return state;
    }
}; 