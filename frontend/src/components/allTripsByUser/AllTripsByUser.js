import React from "react";
import {Link} from "react-router-dom";

class AllTripsByUser extends React.Component {
    componentDidMount() {
        console.log("all trips props: ", this.props);
        this.props.getAllTripsByUser(1);
    }

    render() {
        // console.log(this.props);
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
    }
};

export default AllTripsByUser;