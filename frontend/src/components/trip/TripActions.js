import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl"; 

export const GET_TRIP = "GET_TRIP";
export const JUST_CREATED_TRIP = "JUST_CREATED_TRIP";

export const getOneTrip = (id) => {
    return (dispatch) => {
        // console.log(id);
        axios({
            url: `${rootUrl}/api/trip/${id}`,
            method: "get"
        }).then(result => {
            dispatch({
                type: GET_TRIP,
                payload: result.data,
            })
        })
    }
};

export const resetJustCreatedTrip = () => {
    return {
        type: JUST_CREATED_TRIP,
    };
};