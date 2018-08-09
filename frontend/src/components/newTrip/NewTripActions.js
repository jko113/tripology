import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";
// import MAX from "./NewTrip";
// import MIN from "./NewTrip";
import { getLocalDate } from "../../shared/date/Date";

export const CREATE_NEW_TRIP = "CREATE_NEW_TRIP";
export const EDIT_TRIP = "EDIT_TRIP";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_START_DATE = "UPDATE_START_DATE";
export const UPDATE_END_DATE = "UPDATE_END_DATE";
export const CREATE_NEW_TRIP_FAILED = "CREATE_NEW_TRIP_FAILED";
export const EDIT_TRIP_FAILED = "EDIT_TRIP_FAILED";
export const POPULATE_EDIT_TRIP_FORM = "POPULATE_EDIT_TRIP_FORM";

const MAX = getLocalDate(new Date("2019-12-31"));
const MIN = getLocalDate(new Date());

export const createNewTrip = (tripDetails) => {

    // check if trip form contains valid information
    // if not, display error
    if (!tripDetails.title || !tripDetails.description || !tripDetails.startDate || !tripDetails.endDate) {
        return {
            type: CREATE_NEW_TRIP_FAILED,
            // errorMessage: "Please enter title and description.",
            errorMessage: "Please enter all fields.",
        };
    }

    const startDate = getLocalDate(new Date(tripDetails.startDate));
    const endDate = getLocalDate(new Date(tripDetails.endDate));

    if (startDate < MIN || endDate < MIN) {
        return {
            type: CREATE_NEW_TRIP_FAILED,
            errorMessage: "Trip dates must be in the future."
        };
    } else if (startDate > MAX || endDate > MAX) {
        return {
            type: CREATE_NEW_TRIP_FAILED,
            errorMessage: "Trip dates must be before 01/01/2020."
        };
    } else if (startDate > endDate) {
        return {
            type: CREATE_NEW_TRIP_FAILED,
            errorMessage: "Start date must come before end date.",
        };
    }

    // if trip info form is filled out, make the API call
    return async (dispatch) => {
        axios.post(`${rootUrl}/api/newTrip`, {
            tripDetails,
        }).then(result => {
            dispatch({
                type: CREATE_NEW_TRIP,
                payload: result.data,
            });
        }).catch(error => console.error)
    };
};

export const editTrip = (tripDetails) => {
    // check if trip form contains valid information
    // if not, display error
    if (!tripDetails.title || !tripDetails.description || !tripDetails.startDate || !tripDetails.endDate) {
        return {
            type: EDIT_TRIP_FAILED,
            errorMessage: "Please enter all fields.",
        };
    }

    const startDate = getLocalDate(new Date(tripDetails.startDate));
    const endDate = getLocalDate(new Date(tripDetails.endDate));

    if (startDate < MIN || endDate < MIN) {
        return {
            type: EDIT_TRIP_FAILED,
            errorMessage: "Trip dates must be in the future."
        };
    } else if (startDate > MAX || endDate > MAX) {
        return {
            type: EDIT_TRIP_FAILED,
            errorMessage: "Trip dates must be before 01/01/2020."
        };
    } else if (startDate > endDate) {
        return {
            type: EDIT_TRIP_FAILED,
            errorMessage: "Start date must come before end date.",
        };
    }

    // if trip info form is filled out, make the API call
    return async (dispatch) => {
        axios.post(`${rootUrl}/api/editTrip`, {
            tripDetails,
        }).then(result => {
            dispatch({
                type: EDIT_TRIP,
                payload: result.data,
            });
        }).catch(error => console.error)
    };
};



export const updateTitle = (typedValue) => {
    return {
        type: UPDATE_TITLE,
        payload: typedValue,
    };
};

export const updateDescription = (typedValue) => {
    return {
        type: UPDATE_DESCRIPTION,
        payload: typedValue,
    };
};

export const updateDate = (dateValue, mode) => {
    if (mode === "start") {
        return {
            type: UPDATE_START_DATE,
            payload: dateValue,
            userHasInputStart: true,
        };
    } else if (mode === "end") {
        return {
            type: UPDATE_END_DATE,
            payload: dateValue,
            userHasInputEnd: true,
        };
    } else return null;
};

export const populateEditTripForm = (currentTrip) => {
    return {
        type: POPULATE_EDIT_TRIP_FORM,
        payload: currentTrip,
    };
};