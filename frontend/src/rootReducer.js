import { combineReducers } from "redux";
import { allTripsReducer } from "./components/allTrips/AllTripsReducer";
import { TripReducer } from "./components/trip/TripReducer";
import { userReducer } from "./shared/user/UserReducer";
import { allTripsByUserReducer } from "./components/allTripsByUser/AllTripsByUserReducer";
import { TripDetailsReducer } from "./components/tripDetails/TripDetailsReducer";
import { SIGN_OUT } from "./shared/user/UserActions";
import { initialState } from "./shared/initialState/InitialState";

const rootReducer = (state, action) => {
    if (action.type === SIGN_OUT) {
        return signoutReducer(state, action);
    }

    return combineReducers({
        allTrips: allTripsReducer,
        currentTrip: TripReducer,
        tripDetails: TripDetailsReducer,
        allTripsByUser: allTripsByUserReducer,
        user: userReducer,           
    })(state, action);
};

const signoutReducer = (state, action) => {

    if (!action) {
        return state;
    }

    return {
        ...state,
        allTrips: {data: []},
        currentTrip: {data: []},
        tripDetails: {data: []},
        allTripsByUser: {data: []},
        user: initialState,
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