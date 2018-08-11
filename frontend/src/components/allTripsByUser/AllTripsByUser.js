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
                <div className="app-flex app-flex-column">
                    <div className="h2 green">No trips yet!</div>
                    <div className="app-flex app-margin-top">
                        <Link
                            className="link-item app-flex app-margin-right"
                            to="/newTrip"
                        >Add</Link>
                        <Link
                            className="link-item-ghost app-flex"
                            to="/"
                        >Back</Link>
                    </div>
                </div>
            );
        }
    };

    render() {
        const authenticated = this.props.user.authenticated;

        if (authenticated) {
            const allTripsByUser = this.props.allTripsByUser.data;
            const height = allTripsByUser.length ? "": "screen-height-all-trips"
            const userName = this.props.user.username;
            return (
                <div className={`app-flex app-flex-column ${height}`}>
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