import React from "react";
// import { Link } from "react-router-dom";

class TripDetails extends React.Component {

    componentDidMount() {
        // console.log("trip details user props", this.props.user);
        this.props.getTripDetails(this.props.match.params.id);
    }

    render() {
        //console.log(this.props.currentTrip.data);
        const tripActivities = this.props.tripDetails.data;
        // console.log(tripActivities);
        const authenticated = this.props.user.authenticated;

        if (authenticated) {
            return (
                <div className="app-padding app-margin app-trip-card app-flex app-flex-column app-flex-start">
                    {tripActivities.map(activity => {
                        return (
                            <div
                                key={activity.activity_id}
                                className="app-small-margin-top"
                            >
                                <div
                                    className="h2 app-tiny-margin-bottom"
                                >
                                    {activity.title}
                                </div>
                                <div
                                    className="app-small-margin-bottom"
                                >{activity.description}</div>
                            </div>
                        );
                    })}
                </div>
            );
        } else return null;
    }
};

export default TripDetails;