import React from "react";
import { Link, Redirect } from "react-router-dom";

class Trip extends React.Component {

    componentWillMount() {
        const justCreatedTrip = this.props.newTrip.justCreatedTrip;

        if (justCreatedTrip) {
            this.props.resetJustCreatedTrip();
        }
    }

    componentDidMount() {
        const authenticated = this.props.user.authenticated;

        if (authenticated) {
            this.props.getOneTrip(this.props.match.params.id);
        }
    }

    render() {

        const currentTrip = this.props.currentTrip.data;
        const authenticated = this.props.user.authenticated;
        const userId = this.props.user.userId;

        if (authenticated) {

            return (
                <div className="screen-height-trip app-flex app-flex-column">
                    <div className="app-padding app-margin app-flex app-flex-column">
                        <div className="h1 app-trip-item app-margin-bottom">
                            {currentTrip.title}
                        </div>
                        <div className="h2 app-trip-item app-small-margin-bottom">
                            {currentTrip.description}
                        </div>
                        <div
                            className="app-trip-item"
                        >
                            {this._formatDate(currentTrip.start_date)}&nbsp;to&nbsp;{this._formatDate(currentTrip.end_date)}
                        </div>
                        <div
                            className={currentTrip.tripCost ? "app-small-margin-top app-trip-item": "invisible"}
                        >
                            Total Expenses: ${currentTrip.tripCost ? currentTrip.tripCost.toFixed(2): null}
                        </div>
                        <div className="app-flex">
                            <Link
                                to={`/tripdetails/${currentTrip.trip_id}`}
                                className="link-item app-flex app-margin-top"
                            >
                                
                                More
                            </Link>
                        </div>
                        <div
                            className="app-flex"
                        >
                            <Link
                                to={`/allTripsByUser/${userId}`}
                                className="app-big-margin-right app-small-margin-top"
                            >
                                
                                <i className="far fa-arrow-alt-circle-left icon-link-item"></i>
                            </Link>
                            <div
                                className="pointer app-big-margin-right app-small-margin-top"
                                onClick={(e) => {
                                    const confirmed = window.confirm(`Are you sure you with to delete the trip "${currentTrip.title}" and all its associated activities?`);
                                    if (confirmed) {
                                        this.props.history.push(`/allTripsByUser/${this.props.user.userId}`)
                                        this.props.deleteTrip(currentTrip.trip_id);
                                    }
                                }}
                            ><i className="far fa-trash-alt icon-link-item"></i></div>
                            <Link
                                to={`/editTrip`}
                                className="app-small-margin-top"
                            ><i className="far fa-edit icon-link-item"></i></Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Redirect to="/signin" />;
        }
    }

    _formatDate = (date) => {
        return (date ? date.toString().split("T")[0]: null);
    };
};

export default Trip;