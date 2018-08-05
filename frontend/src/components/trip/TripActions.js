import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";
// import { formatDate } from "../newActivity/NewActivityActions";

export const GET_TRIP = "GET_TRIP";
export const JUST_CREATED_TRIP = "JUST_CREATED_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";

export const getOneTrip = (id) => {
    return (dispatch) => {
        // console.log(id);
        axios({
            url: `${rootUrl}/api/trip/${id}`,
            method: "get"
        }).then(result => {
            const returnData = result.data;
            returnData.start_date = returnData.start_date.split("T")[0];
            returnData.end_date = returnData.end_date.split("T")[0];
            // console.log(returnData, "returnData");

            dispatch({
                type: GET_TRIP,
                payload: returnData,
            })
        }).catch(error => console.error)
    }
};

export const deleteTrip = (tripId) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/api/deleteTrip`, {
            tripId,
        }).then(result => {
            // console.log(result);
            dispatch({
                type: DELETE_TRIP,
            });
        }).catch(error => console.error);

    };
};

export const resetJustCreatedTrip = () => {
    return {
        type: JUST_CREATED_TRIP,
    };
};