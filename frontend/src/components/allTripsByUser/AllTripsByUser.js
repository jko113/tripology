import React from "react";
import { SingleTrip } from "../../shared/trip/SingleTrip";
import { Redirect, Link } from "react-router-dom";

class AllTripsByUser extends React.Component {
    componentDidMount() {
        const props = this.props;
        const tripProps = props.allTripsByUser.data;
        const authenticated = props.user.authenticated;

        if (authenticated && !tripProps.length) {
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
                <div>
                    No trips yet.&nbsp;
                    <div className="inline">
                        <Link
                            className="app-add-first"
                            to="/newTrip"
                        >Add one?</Link>
                    </div>
                </div>
            );
        }
    };

    render() {
        const authenticated = this.props.user.authenticated;

        if (authenticated) {
            const allTripsByUser = this.props.allTripsByUser.data;
            const userName = this.props.user.username;
            return (
                <div className="app-flex app-flex-column">
                    <div className="h1 app-margin-bottom">{userName}'s Trips</div>
                    {this.getTrips(allTripsByUser)}
                </div>
            );
        } else {
            return <Redirect to="/signin"></Redirect>;
        }
    }
};

export default AllTripsByUser;