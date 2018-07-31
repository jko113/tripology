import axios from "axios";

export const CHANGE_AUTHORIZATION_MODE = "CHANGE_AUTHORIZATION_MODE";
export const SIGN_OUT = "SIGN_OUT";
export const GET_USER_ID = "GET_USER_ID";

export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOG_IN = "LOG_IN";
export const CREATE_NEW_USER = "CREATE_NEW_USER";

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
        axios.post(`http://localhost:5000/createnewuser`, {
            username,
            password,
        }).then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        })
    };
};

export const logIn = (username, password) => {

    return async (dispatch) => {
        axios.post(`http://localhost:5000/signin`, {
            username,
            password
        }).then(result => {
            if (result.data) {
                const userInfo = result.data;
                dispatch({
                    type: LOG_IN,
                    isAuthenticated: true,
                    userId: userInfo.user_id,
                });
            } else {
                // dispatch({
                //     type: LOG_IN,
                //     isAuthenticated: false,
                //     userId: undefined,
                // });
                dispatch({
                    type: SIGN_OUT,
                    isAuthenticated: false,
                    userId: undefined,
                    authorizationMode: "signin",
                    errorMessage: "Not an authorized user."
                });
            }
        }).catch(error => {
            console.error(error);
        })
    };

    // return {
    //     type: LOG_IN,
    //     payload: true,
    // };
};

export const changeAuthorizationMode = (mode) => {
    return {
        type: CHANGE_AUTHORIZATION_MODE,
        payload: mode,
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
        // payload: mode,
    }
};

export const getUserId = (userId) => {
    return {
        type: GET_USER_ID,
        payload: userId,
    }
};