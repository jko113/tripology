import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";
import history from '../../history';

export const CHANGE_AUTHORIZATION_MODE = "CHANGE_AUTHORIZATION_MODE";
export const SIGN_OUT = "SIGN_OUT";
export const GET_USER_ID = "GET_USER_ID";

export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOG_IN = "LOG_IN";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const CREATE_NEW_USER_FAILED = "CREATE_NEW_USER_FAILED";

export const updateUsername = (typedValue) => {
    return {
        type: UPDATE_USERNAME,
        payload: typedValue
    };
};

export const updatePassword = (typedValue) => {
    return {
        type: UPDATE_PASSWORD,
        payload: typedValue
    };
};

export const createNewUser = (username, password) => {

    return async (dispatch) => {

        // early return if invalid username/password combination
        if (username.length > 12) {
            return dispatch({
                type: CREATE_NEW_USER_FAILED,
                errorMessage: "Username must be 12 characters or less.",
            });
        }

        axios.post(`${rootUrl}/api/createnewuser`, {
            username,
            password,
        }).then(result => {
            if (result.data.user_id) {
                dispatch({
                    type: CREATE_NEW_USER,
                    userId: result.data.user_id,
                    isAuthenticated: true,
                    authorizationMode: "",
                    errorMessage: undefined,
                    categories: result.data.categories,
                });
                history.push('/');
            } else {
                dispatch({
                    type: CREATE_NEW_USER_FAILED,
                    errorMessage: "Username contains non-alphanumeric characters or is already taken."
                });
            }
        }).catch(error => {
            console.error(error);
        })
    };
};

export const logIn = (username, password) => {

    return async (dispatch) => {
        axios.post(`${rootUrl}/api/signin`, {
            username,
            password
        }).then(result => {
            if (result && result.data.userInfo && result.data.userInfo.exists) {
                const userInfo = result.data.userInfo;
                dispatch({
                    type: LOG_IN,
                    isAuthenticated: true,
                    userId: userInfo.user_id,
                    categories: result.data.categories,
                });
                history.push('/');
            } else {
                dispatch({
                    type: LOG_IN_FAILED,
                    isAuthenticated: false,
                    userId: undefined,
                    authorizationMode: "signin",
                    errorMessage: "User credentials invalid."
                });
            }
        }).catch(error => {
            console.error(error);
        })
    };
};

export const changeAuthorizationMode = (mode, auth) => {
    return {
        type: CHANGE_AUTHORIZATION_MODE,
        payload: mode,
        auth: auth,
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
};

export const loginFailed = () => {
    return {
        type: LOG_IN_FAILED,
    }
};

export const getUserId = (userId) => {
    return {
        type: GET_USER_ID,
        payload: userId,
    }
};