import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl"; 

export const GET_TRIP = "GET_TRIP";

export const getOneTrip = (id) => {
    return (dispatch) => {
        // console.log(id);
        axios({
            url: `${rootUrl}/trip/${id}`,
            method: "get"
        }).then(result => {
            dispatch({
                type: GET_TRIP,
                payload: result.data,
            })
        })
    }
};