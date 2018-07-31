import React from "react";
import {Link} from "react-router-dom";

class AllTripsByUser extends React.Component {
    componentDidMount() {
        const tripProps = this.props;
        // console.log("all trip props: ", this.props);
        // console.log(tripProps.match.params);
        this.props.getAllTripsByUser(tripProps.match.params.id);
    }

    render() {
        console.log("all trips props", this.props);
        const authenticated = this.props.user.authenticated;

        if (authenticated) {
            const allTripsByUser = this.props.allTripsByUser.data;
    
            return (
                <div>
                {allTripsByUser.map((trip) => {
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
        } else {
            return null;
        }
    }
};

export default AllTripsByUser;