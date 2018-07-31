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
export const GET_TRIP = "GET_TRIP";

export const getOneTrip = (id) => {
    return (dispatch) => {
        // console.log(id);
        axios({
            url: `http://localhost:5000/trip/${id}`,
            method: "get"
        }).then(result => {
            dispatch({
                type: GET_TRIP,
                payload: result.data,
            })
        })
    }
};