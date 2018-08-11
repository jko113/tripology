import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";

export const GET_TRIP = "GET_TRIP";
export const JUST_CREATED_TRIP = "JUST_CREATED_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";

export const getOneTrip = (id) => {
    return (dispatch) => {
        axios({
            url: `${rootUrl}/api/trip/${id}`,
            method: "get"
        }).then(result => {
            const returnData = result.data;
            returnData.start_date = returnData.start_date.split("T")[0];
            returnData.end_date = returnData.end_date.split("T")[0];

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
            dispatch({
                type: DELETE_TRIP,
                tripId: tripId,
            })
        }).catch(error => console.error);

    };
};

export const resetJustCreatedTrip = () => {
    return {
        type: JUST_CREATED_TRIP,
    };
};