// import axios from "axios";
// export const UPDATE_USERNAME = "UPDATE_USERNAME";
// export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
// export const LOG_IN = "LOG_IN";

// export const updateUsername = (typedValue) => {
//     return {
//         type: UPDATE_USERNAME,
//         payload: typedValue
//     };
// };

// export const updatePassword = (typedValue) => {
//     return {
//         type: UPDATE_PASSWORD,
//         payload: typedValue
//     };
// };

// export const logIn = (username, password) => {

//     // console.log("username", username, " password: ", password);
//     return async (dispatch) => {
//         axios.post(`http://localhost:5000/signin`, {
//             username,
//             password
//         }).then(result => {
//             if (result.data) {
//                 const userInfo = result.data;
//                 console.log(userInfo);
//                 dispatch({
//                     type: LOG_IN,
//                     isAuthenticated: true,
//                     userId: userInfo.user_id,
//                 });
//                 // console.log(result.data);
//             } else {
//                 dispatch({
//                     type: LOG_IN,
//                     isAuthenticated: false,
//                     userId: undefined,
//                 });
//             }
//         }).catch(error => {
//             console.error(error);
//         })
//     };

//     // return {
//     //     type: LOG_IN,
//     //     payload: true,
//     // };
// };