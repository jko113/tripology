import React from "react";
import { SingleTrip } from "../../shared/trip/SingleTrip";

class AllTrips extends React.Component {
    componentDidMount() {
        this.props.getAllTrips();
    }

    render() {
        
        const allTrips = this.props.allTrips.data;

        return (
            <div className="app-flex app-flex-column">
                {allTrips.map((trip) => {
                    return <SingleTrip key={trip.trip_id} trip={trip} />
                })}
            </div>
        );
    }
};

export default AllTrips;