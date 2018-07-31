import React from "react";
// import { Link } from "react-router-dom";

class TripDetails extends React.Component {

    componentDidMount() {
        console.log("trip details props", this.props);
        this.props.getTripDetails(this.props.match.params.id);
    }

    render() {
        //console.log(this.props.currentTrip.data);
        const tripActivities = this.props.tripDetails.data;
        // console.log(tripActivities);
        return (
            <div>
                {tripActivities.map(activity => {
                    return (
                        <div key={activity.activity_id}>
                            <div className="activity-title">{activity.title}</div>
                            <div>{activity.description}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default TripDetails;