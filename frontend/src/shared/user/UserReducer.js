import {
    CHANGE_AUTHORIZATION_MODE,
    GET_USER_ID,
    SIGN_OUT,
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    LOG_IN
} from "./UserActions";

const initialState = {
    authorizationMode: "",
    username: "",
    password: "",
    authenticated: false,
};

export const userReducer = (
    state = initialState,
    action
) => {
    if (!action) {
        return state;
    }
    // console.log("state: ", state);
    // console.log("reducer action: ", action);
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case LOG_IN:
            console.log(action);
            return {
                ...state,
                authenticated: action.isAuthenticated,
                userId: action.userId,
            };
        case CHANGE_AUTHORIZATION_MODE:
            return Object.assign({}, state, {authorizationMode: action.payload});
        case GET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case SIGN_OUT:
            return {
                ...state,
                authenticated: false,
                userId: undefined,
            };
        default:
            return state;
    }
};