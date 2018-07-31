import {
    CHANGE_AUTHORIZATION_MODE,
    GET_USER_ID,
    SIGN_OUT,
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    LOG_IN,
    CREATE_NEW_USER,
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
            return {
                ...state,
                authenticated: action.isAuthenticated,
                userId: action.userId,
                username: "",
                password: "",
                errorMessage: undefined,
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
                username: "",
                password: "",
                authorizationMode: action.authorizationMode,
                errorMessage: action.errorMessage,
            };
        case CREATE_NEW_USER:
            return {
                ...state,
                authenticated: action.isAuthenticated,
                userId: action.userId,
                username: "",
                password: "",
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
};