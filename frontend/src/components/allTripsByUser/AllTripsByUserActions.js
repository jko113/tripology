import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";

export const GET_ALL_TRIPS_BY_USER = "GET_ALL_TRIPS_BY_USER";

export const getAllTripsByUser = (userId) => {
    return (dispatch) => {
        axios({
            url: `${rootUrl}/api/allTripsByUser/${userId}`,
            method: 'get'
        }).then((result) => {
            dispatch({
                type: GET_ALL_TRIPS_BY_USER,
                payload: result.data,
            })
        })
    }
};