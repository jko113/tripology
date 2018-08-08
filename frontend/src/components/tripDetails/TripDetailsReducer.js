import {
    GET_TRIP_DETAILS,
    DELETE_ACTIVITY,
    CHANGE_FILTER_DATE,
    SET_GROUPING_MODE,
} from "./TripDetailsActions";

const initialState = {
    data: [],
    filterDate: "",
    groupedDetails: [],
    grouped: false,
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
                filterDate: "",
                data: action.payload,
                groupedDetails: action.groupedDetails,
                grouped: action.mode,
            });
        case DELETE_ACTIVITY:
            return {
                ...state,
                data: action.payload,
                groupedDetails: action.groupedDetails,
            };
        case CHANGE_FILTER_DATE:
            return {
                ...state,
                filterDate: action.payload,
            };
        case SET_GROUPING_MODE:
            return {
                ...state,
                grouped: !state.grouped,
            };
        default:
            return state;
    }
}; 