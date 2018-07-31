import { combineReducers } from "redux";
import { allTripsReducer } from "./components/allTrips/AllTripsReducer";
import { TripReducer } from "./components/trip/TripReducer";
import { userReducer } from "./shared/user/UserReducer";
import { allTripsByUserReducer } from "./components/allTripsByUser/AllTripsByUserReducer";
import { TripDetailsReducer } from "./components/tripDetails/TripDetailsReducer";

const rootReducer = combineReducers({
    allTrips: allTripsReducer,
    currentTrip: TripReducer,
    tripDetails: TripDetailsReducer,
    allTripsByUser: allTripsByUserReducer,
    user: userReducer,
});

export default rootReducer;