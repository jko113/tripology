import { combineReducers } from "redux";
// import { allTripsReducer } from "./components/allTrips/AllTripsReducer";
import { newTripReducer, initialState as initialNewTripState } from "./components/newTrip/NewTripReducer";
import { newActivityReducer } from "./components/newActivity/NewActivityReducer";
import { TripReducer } from "./components/trip/TripReducer";
import { userReducer } from "./shared/user/UserReducer";
import { allTripsByUserReducer } from "./components/allTripsByUser/AllTripsByUserReducer";
import { TripDetailsReducer } from "./components/tripDetails/TripDetailsReducer";
import { SIGN_OUT } from "./shared/user/UserActions";
import { initialState } from "./shared/initialState/InitialState";
import { categoryReducer } from "./shared/category/CategoryReducer";

const rootReducer = (state, action) => {
    if (action.type === SIGN_OUT) {
        state = signoutReducer(state, action);
    }

    return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
    // allTrips: allTripsReducer,
    newTrip: newTripReducer,
    newActivity: newActivityReducer,
    currentTrip: TripReducer,
    tripDetails: TripDetailsReducer,
    allTripsByUser: allTripsByUserReducer,
    user: userReducer,
    categories: categoryReducer,           
});

const signoutReducer = (state, action) => {

    if (!action) {
        return state;
    }

    return {
        ...state,
        // allTrips: {data: []},
        currentTrip: {data: {}},
        tripDetails: {data: []},
        allTripsByUser: {data: []},
        newTrip: initialNewTripState,
        user: initialState,
        newActivity: {},
        categories: {data: []},
    };
};

// const rootReducer = combineReducers({
//     allTrips: allTripsReducer,
//     currentTrip: TripReducer,
//     tripDetails: TripDetailsReducer,
//     allTripsByUser: allTripsByUserReducer,
//     user: userReducer,
// });

export default rootReducer;