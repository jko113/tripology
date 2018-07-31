import React from "react";
import {Link} from "react-router-dom";

class AllTrips extends React.Component {
    componentDidMount() {
        this.props.getAllTrips();
    }

    render() {

        const allTrips = this.props.allTrips.data;

        return (
            <div>
            {allTrips.map((trip) => {
                return (
                    <Link
                        to={`/trip/${trip.trip_id}`}
                        key={trip.trip_id}
                    >
                        {trip.title}
                    </Link>
                );
            })}
            </div>
        );
    }
};

export default AllTrips;