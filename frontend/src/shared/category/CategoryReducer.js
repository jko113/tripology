import {
    LOG_IN,
    CREATE_NEW_USER,
} from "../../shared/user/UserActions";

const initialState = {data: []};

export const categoryReducer = (
    state = initialState,
    action,
) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                data: action.categories,
            };
        case CREATE_NEW_USER:
            return {
                ...state,
                data: action.categories,
            };
        default:
            return state;
    }
};