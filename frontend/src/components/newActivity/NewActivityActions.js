import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";
import {
    getLocalDate,
    formatDate,
} from "../../shared/date/Date";

export const CREATE_NEW_ACTIVITY = "CREATE_NEW_ACTIVITY";
export const UPDATE_ACTIVITY_TITLE = "UPDATE_ACTIVITY_TITLE";
export const UPDATE_ACTIVITY_DESCRIPTION = "UPDATE_ACTIVITY_DESCRIPTION";
export const UPDATE_ACTIVITY_START_DATE = "UPDATE_ACTIVITY_START_DATE";
export const UPDATE_ACTIVITY_COST = "UPDATE_ACTIVITY_COST";
export const UPDATE_ACTIVITY_END_DATE = "UPDATE_ACTIVITY_END_DATE";
export const UPDATE_ACTIVITY_LOCATION = "UPDATE_ACTIVITY_LOCATION";
export const CREATE_NEW_ACTIVITY_FAILED = "CREATE_NEW_ACTIVITY_FAILED";
export const JUST_CREATED_ACTIVITY = "JUST_CREATED_ACTIVITY";
export const SET_CATEGORY = "SET_CATEGORY";

const MAX = getLocalDate(new Date("2019-12-31"));
const MIN = getLocalDate(new Date());


export const createNewActivity = (activityDetails) => {
    
    const startDate = getLocalDate(new Date(activityDetails.startDate));
    const endDate = getLocalDate(new Date(activityDetails.endDate));
    const tripStartDate = getLocalDate(new Date(activityDetails.currentTrip.start_date));
    const tripEndDate = getLocalDate(new Date(activityDetails.currentTrip.end_date));
    const tripId = activityDetails.currentTrip.trip_id;

    // check if activity form contains valid information
    // if not, display error
    if (
        !activityDetails.title ||
        !activityDetails.description ||
        !activityDetails.startDate ||
        !activityDetails.endDate ||
        !activityDetails.cost ||
        !activityDetails.location
    ) {
        return {
            type: CREATE_NEW_ACTIVITY_FAILED,
            // errorMessage: "Please enter title and description.",
            errorMessage: "Please enter all fields.",
        };
    }

    else if (
        (startDate < tripStartDate) ||
        (endDate > tripEndDate)
    ) {
        return {
            type: CREATE_NEW_ACTIVITY_FAILED,
            errorMessage: `Trip activity dates (${formatDate(startDate)} and ${formatDate(endDate)}) must be within trip dates of ${formatDate(tripStartDate)} and ${formatDate(tripEndDate)}.`
        };
    }
    
    else if (startDate < MIN || endDate < MIN) {
        // console.log("startDate < min", MIN, startDate);
        return {
            type: CREATE_NEW_ACTIVITY_FAILED,
            errorMessage: "Activity dates must be in the future."
        };
    } else if (startDate > MAX || endDate > MAX) {
        return {
            type: CREATE_NEW_ACTIVITY_FAILED,
            errorMessage: "Activity dates must be before 01/01/2020."
        };
    } else if (startDate > endDate) {
        return {
            type: CREATE_NEW_ACTIVITY_FAILED,
            errorMessage: "Start date must come before end date.",
        };
    }

    // if trip info form is filled out, make the API call
    return async (dispatch) => {
        axios.post(`${rootUrl}/api/newActivity`, {
            activityDetails,
        }).then(result => {
            const activityId = result.data.activity_id;
            if (activityId) {
                dispatch({
                    type: CREATE_NEW_ACTIVITY,
                    payload: result.data,
                    activityId: activityId,
                    tripId: tripId,
                });
            } else {
                dispatch({
                    type: CREATE_NEW_ACTIVITY_FAILED,
                    payload: result.error,
                });
            }
        }).catch(error => console.error)
    };
};

export const updateTitle = (typedValue) => {
    return {
        type: UPDATE_ACTIVITY_TITLE,
        payload: typedValue,
    };
};

export const updateDescription = (typedValue) => {
    return {
        type: UPDATE_ACTIVITY_DESCRIPTION,
        payload: typedValue,
    };
};

export const updateLocation = (typedValue) => {
    return {
        type: UPDATE_ACTIVITY_LOCATION,
        payload: typedValue,
    };
};

export const updateDate = (dateValue, mode) => {
    if (mode === "start") {
        return {
            type: UPDATE_ACTIVITY_START_DATE,
            payload: dateValue,
            userHasInputStart: true,
        };
    } else if (mode === "end") {
        return {
            type: UPDATE_ACTIVITY_END_DATE,
            payload: dateValue,
            userHasInputEnd: true,
        };
    } else return null;
};

export const updateCost = (typedValue) => {
    return {
        type: UPDATE_ACTIVITY_COST,
        payload: typedValue,
    };
};

export const setCategory = (cat, cats) => {
    return {
        type: SET_CATEGORY,
        payload: cat || cats[0].title,
    };
};