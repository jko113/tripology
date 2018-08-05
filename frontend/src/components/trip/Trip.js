import React from "react";
import { Link, Redirect } from "react-router-dom";

class Trip extends React.Component {

    componentDidMount() {
        const authenticated = this.props.user.authenticated;
        // console.log(this.props.match.params, "params");
        // console.log(this.props, "trip props hey");
        if (authenticated) {
            this.props.getOneTrip(this.props.match.params.id);
        }
        // else {
        //     console.log("got to unauth trip reload");
        //     return <Redirect to="/signin" />;
        // }
    }

    componentWillMount() {
        const justCreatedTrip = this.props.newTrip.justCreatedTrip;

        if (justCreatedTrip) {
            // console.log("just created and rendering Trip");
            this.props.resetJustCreatedTrip();
        }
    }

    render() {
        //console.log(this.props.currentTrip.data);
        // console.log(this.props, "current trip props");
        const currentTrip = this.props.currentTrip.data;
        const authenticated = this.props.user.authenticated;
        const userId = this.props.user.userId;
        // const justDeletedTrip = this.props.justDeletedTrip;

        // if (authenticated && Object.keys(currentTrip).length) {
        if (authenticated) {
            // console.log(currentTrip, "currentTrip");

            return (
                <div className="app-flex app-flex-column">
                    <div className="h1 app-margin-bottom">Trip Overview</div>
                    <div className="app-padding app-margin app-trip-card app-flex app-flex-column">
                        <div className="h1 app-margin-bottom">
                            {currentTrip.title}
                        </div>
                        <div className="h2 app-small-margin-bottom">
                            {currentTrip.description}
                        </div>
                        <div>
                            Start Date: {this._formatDate(currentTrip.start_date)}
                        </div>
                        <div>
                            End Date: {this._formatDate(currentTrip.end_date)}
                        </div>
                        <div className="app-flex">
                            <Link
                                to={`/tripdetails/${currentTrip.trip_id}`}
                                className="link-item contrast app-flex app-margin-top app-margin-right"
                            >
                                
                                More
                            </Link>
                            <Link
                                to={`/allTripsByUser/${userId}`}
                                className="link-item contrast app-flex app-margin-top"
                            >
                                
                                Back
                            </Link>
                        </div>
                        <div
                            className="pointer link-item contrast app-flex app-small-margin-top"
                            onClick={(e) => {
                                // console.log("props",this.props);
                                this.props.history.push(`/allTripsByUser/${this.props.user.userId}`)
                                this.props.deleteTrip(currentTrip.trip_id);
                            }}
                        >Delete</div>
                    </div>
                </div>
            );
        }
        // else if (justDeletedTrip) {
        //     console.log("authenticated but no currentTrip");
        //     // return <Redirect to={`/allTripsByUser/${userId}`} />
        // } 
        else {
            return <Redirect to="/signin" />;
        }
    }

    _formatDate = (date) => {
        return (date ? date.toString().split("T")[0]: null);
    };
};

export default Trip;