import { combineReducers } from "redux";
import { allTripsReducer } from "./components/allTrips/AllTripsReducer";
import { TripReducer } from "./components/trip/TripReducer";
import { userReducer } from "./shared/user/UserReducer";
import { allTripsByUserReducer } from "./components/allTripsByUser/AllTripsByUserReducer";
// import SignOut from "./components/signin/SignInR";
import { TripDetailsReducer } from "./components/tripDetails/TripDetailsReducer";
// import { reducer as formReducer } from 'redux-form';
// import authReducer from "./components/signin/AuthReducer";
// import { AuthReducer } from "./components/authorization/AuthorizationReducer";

const rootReducer = combineReducers({
    allTrips: allTripsReducer,
    currentTrip: TripReducer,
    tripDetails: TripDetailsReducer,
    // form: formReducer,
    // auth: AuthReducer,
    allTripsByUser: allTripsByUserReducer,
    user: userReducer,
});

export default rootReducer;