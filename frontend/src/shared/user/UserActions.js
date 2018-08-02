import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl"; 

export const CHANGE_AUTHORIZATION_MODE = "CHANGE_AUTHORIZATION_MODE";
export const SIGN_OUT = "SIGN_OUT";
export const GET_USER_ID = "GET_USER_ID";

export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOG_IN = "LOG_IN";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const CREATE_NEW_USER_FAILED = "CREATE_NEW_USER_FAILED";
// export const GOD_MODE = "GOD_MODE";

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
    // console.log("got to action");
    return async (dispatch) => {
        axios.post(`${rootUrl}/createnewuser`, {
            username,
            password,
        }).then(result => {
            // console.log("resultdata:",result.data);
            if (result.data.user_id) {
                // console.log("action: ", result)
                dispatch({
                    type: CREATE_NEW_USER,
                    userId: result.data.user_id,
                    isAuthenticated: true,
                    authorizationMode: "",
                    errorMessage: undefined,
                });
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
        axios.post(`${rootUrl}/signin`, {
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
                // dispatch({
                //     type: SIGN_OUT,
                //     isAuthenticated: false,
                //     userId: undefined,
                //     authorizationMode: "signin",
                //     errorMessage: "User credentials invalid."
                // });
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

// export const godMode = () => {
//     return {
//         type: GOD_MODE,
//     };
// };

export const signOut = () => {
    return {
        type: SIGN_OUT,
        // payload: mode,
    }
};

export const loginFailed = () => {
    return {
        type: LOG_IN_FAILED,
        // payload: mode,
    }
};

export const getUserId = (userId) => {
    return {
        type: GET_USER_ID,
        payload: userId,
    }
};