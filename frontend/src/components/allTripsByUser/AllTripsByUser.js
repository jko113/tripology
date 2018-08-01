import React from "react";
import { SingleTrip } from "../../shared/trip/SingleTrip";

class AllTripsByUser extends React.Component {
    componentDidMount() {
        const props = this.props;
        const tripProps = props.allTripsByUser.data;
        // console.log("all trip props: ", props);
        // console.log(tripProps.match.params);
        if (!tripProps.length) {
            props.getAllTripsByUser(props.match.params.id);
        }
    }

    getTrips = (tripsArray) => {
        if (tripsArray.length) {
            return tripsArray.map((trip) => {
                return <SingleTrip key={trip.trip_id} trip={trip} />
            })
        } else {
            return (
                <div>No trips yet. Add one?</div>
            );
        }
    };

    render() {
        // console.log("all trips props", this.props);
        const authenticated = this.props.user.authenticated;
        const godMode = this.props.user.godMode;

        if (godMode || authenticated) {
            const allTripsByUser = this.props.allTripsByUser.data;
    
            return (
                <div className="app-flex">
                    {this.getTrips(allTripsByUser)}
                </div>
            );
        } else {
            return null;
        }
    }
};

export default AllTripsByUser;