import React from "react";
import { Link } from "react-router-dom";

export const SingleTrip = (props) => {
    const trip = props.trip;
    return (
        <Link
            className="app-trip app-flex"
            to={`/trip/${trip.trip_id}`}         
        >
            {trip.title}
        </Link>
    );
};