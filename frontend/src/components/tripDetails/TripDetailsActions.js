import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl"; 

export const GET_TRIP_DETAILS = "GET_TRIP_DETAILS";

export const getTripDetails = (id) => {
    return (dispatch) => {
        axios({
            url: `${rootUrl}/api/tripdetails/${id}`,
            method: "get"
        }).then(result => {
            dispatch({
                type: GET_TRIP_DETAILS,
                payload: result.data,
            })
        })
    }
};