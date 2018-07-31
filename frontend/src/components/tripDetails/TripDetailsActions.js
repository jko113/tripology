/*
import axios from "axios";

export const GET_ALL_TRIPS = "GET_ALL_TRIPS";

export const getAllTrips = () => {
    return (dispatch) => {
        axios({
            url: 'http://localhost:5000/allTrips',
            method: 'get'
        }).then((result) => {
            dispatch({
                type: GET_ALL_TRIPS,
                payload: result.data,
            })
        })
    }
};
*/

import axios from "axios";
export const GET_TRIP_DETAILS = "GET_TRIP_DETAILS";

export const getTripDetails = (id) => {
    return (dispatch) => {
        axios({
            url: `http://localhost:5000/tripdetails/${id}`,
            method: "get"
        }).then(result => {
            dispatch({
                type: GET_TRIP_DETAILS,
                payload: result.data,
            })
        })
    }
};