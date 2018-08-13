import {
    CHANGE_AUTHORIZATION_MODE,
    GET_USER_ID,
    SIGN_OUT,
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    LOG_IN,
    CREATE_NEW_USER,
    CREATE_NEW_USER_FAILED,
    LOG_IN_FAILED,
} from "./UserActions";

import { initialState } from "../../shared/initialState/InitialState"; 

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
                password: "",
                errorMessage: undefined,
                authorizationMode: "",
            };
        case LOG_IN_FAILED:
            return Object.assign({}, state, {
                errorMessage: action.errorMessage,
                authenticated: action.isAuthenticated || false,
                userId: undefined,
                authorizationMode: action.authorizationMode,
            });
        case CHANGE_AUTHORIZATION_MODE:
            return Object.assign({}, state, {
                authorizationMode: action.payload,
                errorMessage: undefined,
                password: action.auth ? state.password: "",
                username: action.auth ? state.username: "",
            });
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
                password: "",
                errorMessage: action.errorMessage,
                authorizationMode: action.authorizationMode,
                categories: action.categores,
            };
        case CREATE_NEW_USER_FAILED:
            return {
                ...state,
                authenticated: false,
                userId: undefined,
                username: "",
                password: "",
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
};