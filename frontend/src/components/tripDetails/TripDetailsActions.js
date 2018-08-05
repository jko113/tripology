import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl"; 

export const GET_TRIP_DETAILS = "GET_TRIP_DETAILS";
// export const JUST_CREATED_ACTIVITY = "JUST_CREATED_ACTIVITY" ;
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";

export const getTripDetails = (id) => {
    return (dispatch) => {
        axios({
            url: `${rootUrl}/api/tripdetails/${id}`,
            method: "get"
        }).then(result => {
            // console.log(result, "result");

            if (result.status === 200 && result.data && result.data.length) {

                result.data.forEach((activity) => {
                    activity.start_date = activity.start_date.split("T")[0];
                    activity.end_date = activity.end_date.split("T")[0];
                });

                dispatch({
                    type: GET_TRIP_DETAILS,
                    payload: result.data,
                }) 
            } else {
                // console.log("unable to fetch trip details");
            }
        }).catch(error => console.error);
    };
};

export const deleteActivity = (activityId, activitiesArray) => {
    return async (dispatch) => {
        axios.post(`${rootUrl}/api/deleteActivity`, {
            activityId: activityId,
        }).then(result => {
            // console.log("deleted activity", result);
            // console.log("tripDetails", activitiesArray);
            dispatch({
                type: DELETE_ACTIVITY,
                payload: activitiesArray.filter(a => a.activity_id !== activityId)
            }).then(e => {
                console.log("e is", e);
            })
            // return getTripDetails(userId)
            //     .then(result => {
            //         console.log(result);
            //     }).catch(error => {
            //         console.error(error)
            //     });
        }).catch(error => console.error);
    };
};

// export const justCreatedActivity = () => {
//     return (dispatch) => dispatch({
//         type: JUST_CREATED_ACTIVITY,
//     });
// };