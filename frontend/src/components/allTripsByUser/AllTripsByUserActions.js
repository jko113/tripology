import axios from "axios";

export const GET_ALL_TRIPS_BY_USER = "GET_ALL_TRIPS_BY_USER";

export const getAllTripsByUser = (userId) => {
    return (dispatch) => {
        axios({
            url: `http://localhost:5000/allTripsByUser/${userId}`,
            method: 'get'
        }).then((result) => {
            dispatch({
                type: GET_ALL_TRIPS_BY_USER,
                payload: result.data,
            })
        })
    }
};