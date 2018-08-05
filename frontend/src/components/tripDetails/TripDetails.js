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

    render() {
        //console.log(this.props.currentTrip.data);
        const tripActivities = this.props.tripDetails.data;
        // console.log(tripActivities, "tripActivities")       ;
        const authenticated = this.props.user.authenticated;
        // const godMode = this.props.user.godMode;

        if (/*godMode ||*/ authenticated) {
            if (tripActivities && tripActivities.length) {
                return (
                    <div className="app-padding app-margin app-trip-card app-flex app-flex-column app-flex-start">
                        {tripActivities.map(activity => {
                            return (
                                <div
                                    key={activity.activity_id}
                                    className="app-small-margin-top app-flex app-flex-space-between full-width"
                                >
                                    <div className="">
                                        <div
                                            className="h2 app-tiny-margin-bottom"
                                        >
                                            {activity.title}
                                        </div>
                                        <div
                                            className="app-small-margin-bottom"
                                        >{activity.description}</div>
                                    </div>
                                    <div
                                        className="link-item contrast app-flex pointer"
                                        onClick={(e) => {
                                            // console.log(activity.activity_id);
                                            this.props.deleteActivity(activity.activity_id, tripActivities);
                                        }}
                                    >
                                        Delete
                                    </div>
                                </div>
                            );
                        })}
                        <div
                            className="app-flex-align-self-center app-margin-top app-margin-bottom"
                        >
                            {this.getAdder("Add another?")}
                        </div>
                    </div>
                );
            } else {
                return (
                    // <div>
                    //     No trip activities yet.   Add one?
                    // </div>
                    <div className="app-flex">
                        No trips activities yet.&nbsp;
                        <div className="inline">
                            {this.getAdder("Add one?")}
                        </div>
                    </div>
                );
            }
        } else
        {
            return <Redirect to="/signin" />
        }
        //  return null;
    }
};

export default TripDetails;