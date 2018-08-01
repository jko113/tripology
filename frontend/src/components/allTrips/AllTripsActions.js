import axios from "axios";
import { rootUrl } from "../../shared/URL/rootUrl";

export const GET_ALL_TRIPS = "GET_ALL_TRIPS";

export const getAllTrips = () => {
    return (dispatch) => {
        axios({
            url: `${rootUrl}/allTrips`,
            // url: `http://localhost:5001/allTrips`,
            method: 'get'
        }).then((result) => {
            dispatch({
                type: GET_ALL_TRIPS,
                payload: result.data,
            })
        })
    }
};