import React from "react";
import { SingleTrip } from "../../shared/trip/SingleTrip";
import { Redirect, Link } from "react-router-dom";

class AllTripsByUser extends React.Component {
    componentDidMount() {
        const props = this.props;
        const tripProps = props.allTripsByUser.data;
        const authenticated = props.user.authenticated;
        // console.log("all trip props: ", props);
        // console.log(tripProps.match.params);
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
            // console.log("no trips array - add one?");
            // return "No trips yet. Add one?"
            // return <div>No trips yet. Add one?</div>
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
        // console.log("all trips props", this.props);
        const authenticated = this.props.user.authenticated;
        // const godMode = this.props.user.godMode;

        if (/*godMode ||*/ authenticated) {
            const allTripsByUser = this.props.allTripsByUser.data;
            const userName = this.props.user.username;
            // console.log(this.props, "all trips props");
            // console.log(tripsButtonText, "tripsButtonText");
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