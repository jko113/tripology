import React from "react";
import { Link, Redirect } from "react-router-dom";

class TripDetails extends React.Component {

    componentDidMount() {
        // console.log("trip details user props", this.props);
        if (this.props.user.authenticated) {
            this.props.getTripDetails(this.props.match.params.id);
        }
        // this.props.justCreatedActivity();
    }

    getAdder = (buttonText) => {
        return (
            <Link
                className="app-add-first"
                to="/newActivity"
            >{buttonText}</Link>
        );
    };

    getTrip = (activity, tripActivities) => {
        return (
            <div
                key={activity.activity_id}
                className="app-small-margin-top app-flex app-flex-space-between full-width"
            >
                <div className="app-small-margin-bottom">
                    <div
                        className="h2 app-tiny-margin-bottom"
                    >
                        {activity.title}
                    </div>
                    <div
                        className=""
                    >{activity.description}</div>
                    <div
                        className=""
                    >{activity.location}</div>
                    <div
                        className=""
                    >${activity.cost}</div>
                    <div
                        className=""
                    >{activity.start_date}</div>
                    <div
                        className=""
                    >{activity.end_date}</div>
                </div>
                <div
                    className="link-item contrast app-flex pointer"
                    onClick={(e) => {
                        this.props.deleteActivity(activity.activity_id, tripActivities);
                    }}
                >
                    Delete
                </div>
            </div>
        );
    };

    render() {
        const tripActivities = this.props.tripDetails.data;
        const authenticated = this.props.user.authenticated;
        const userId = this.props.user.userId;

        if (authenticated) {
            if (tripActivities && tripActivities.length) {
                return (
                    <div className="app-padding app-margin app-trip-card app-flex app-flex-column app-flex-start">
                        {tripActivities.map(activity => {
                            // console.log(activity, "activity");
                            return this.getTrip(activity, tripActivities);
                        })}
                        <div className="app-flex app-flex-column app-flex-align-self-center">
                            <div
                                className="app-margin-top app-small-margin-bottom"
                            >
                                {this.getAdder("Add another?")}
                            </div>
                            <Link
                                className="link-item contrast app-flex"
                                to={`/allTripsByUser/${userId}`}
                            >Back</Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="app-flex app-flex-column">
                        <div className="app-flex">
                            No trips activities yet.&nbsp;
                            <div className="inline">
                                {this.getAdder("Add one?")}
                            </div>
                        </div>
                        <Link
                            className="link-item app-flex app-margin-top"
                            to={`/trip/${this.props.currentTrip.data.trip_id}`}
                            // onClick={e => {
                            //     console.log(this.props, "activiy props");
                            // }}
                        >
                            Back
                        </Link>
                    </div>
                );
            }
        } else
        {
            return <Redirect to="/signin" />
        }
    }
};

export default TripDetails;