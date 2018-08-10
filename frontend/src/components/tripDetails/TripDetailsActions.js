import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl"; 

export const GET_TRIP_DETAILS = "GET_TRIP_DETAILS";
// export const JUST_CREATED_ACTIVITY = "JUST_CREATED_ACTIVITY" ;
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
// export const CHANGE_VISIBILITY_FILTER = "CHANGE_VISIBILITY_FILTER";
export const CHANGE_FILTER_DATE = "CHANGE_FILTER_DATE";
export const SET_GROUPING_MODE = "SET_GROUPING_MODE";

export const getTripDetails = (id, categories, mode) => {
    return (dispatch) => {
        axios({
            url: `${rootUrl}/api/tripdetails/${id}`,
            method: "get"
        }).then(result => {
            // console.log(result, "result");

            if (result.status === 200 && result.data && result.data.length) {

                const groupedDetailsArray = [];
                result.data.forEach((activity) => {

                    activity.start_date = activity.start_date.split("T")[0];
                    activity.end_date = activity.end_date.split("T")[0];
                    const currentCategoryId = activity.category_id;
                    // const currentCategoryString = categories.data.find(cat => cat.category_id === currentCategoryId).title;

                    if (groupedDetailsArray[currentCategoryId]) {
                        groupedDetailsArray[currentCategoryId].push(activity);
                    } else {
                        groupedDetailsArray[currentCategoryId] = [activity];
                    }
                });

                result.data.sort((a, b) => {
                    const titleA = a.title.toUpperCase();
                    const titleB = b.title.toUpperCase();

                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });

                dispatch({
                    type: GET_TRIP_DETAILS,
                    payload: result.data,
                    groupedDetails: groupedDetailsArray,
                    mode: mode,
                }) 
            } else {
                // console.log("unable to fetch trip details");
                return null;
            }
        }).catch(error => console.error);
    };
};

export const deleteActivity = (activityId, activitiesArray, groupedActivitiesArray, groupedMode) => {
    return async (dispatch) => {
        axios.post(`${rootUrl}/api/deleteActivity`, {
            activityId: activityId,
        }).then(result => {
            
            const newGroupedActivitiesArray = groupedActivitiesArray.map(a => {
                if (!a) return null;

                const filteredArray = a.filter(i => {
                    return i.activity_id !== activityId;
                });

                return filteredArray.length !== 0 ? filteredArray: null;
            });
            dispatch({
                type: DELETE_ACTIVITY,
                payload: activitiesArray.filter(a => a.activity_id !== activityId),
                groupedDetails: newGroupedActivitiesArray,
            }).then(e => {
                console.log("e is", e);
            }).catch(e => console.error);
        }).catch(error => console.error);
    };
};

export const changeFilterDate = (enteredValue) => {
    return {
        type: CHANGE_FILTER_DATE,
        payload: enteredValue,
    };
};

export const setGroupingMode = () => {
    return {
        type: SET_GROUPING_MODE,
    };
};