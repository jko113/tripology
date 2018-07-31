// import {
//     UPDATE_USERNAME,
//     UPDATE_PASSWORD,
//     LOG_IN
// } from "./AuthorizationActions";

// const initialState = {
//     username: "",
//     password: "",
//     authenticated: false,
//     // userId: -1,
// };

// export const AuthReducer = (
//     state = initialState,
//     action
// ) => {
//     if (!action) {
//         return state;
//     }
//     // console.log("state: ", state);
//     // console.log("reducer action: ", action);
//     switch (action.type) {
//         case UPDATE_USERNAME:
//             return {
//                 ...state,
//                 username: action.payload,
//             };
//         case UPDATE_PASSWORD:
//             return {
//                 ...state,
//                 password: action.payload,
//             };
//         case LOG_IN:
//             console.log(action);
//             return {
//                 ...state,
//                 authenticated: action.isAuthenticated,
//                 userId: action.userId,
//             };
//         default:
//             return state;
//     }
// };