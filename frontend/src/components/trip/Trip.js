import React from "react";
import { Link } from "react-router-dom";

class Trip extends React.Component {

    componentDidMount() {
        //console.log(this.props.match.params);
        this.props.getOneTrip(this.props.match.params.id);
    }

    render() {
        //console.log(this.props.currentTrip.data);
        const currentTrip = this.props.currentTrip.data;
        const authenticated = this.props.user.authenticated;
        // const godMode = this.props.user.godMode;

        if (/*godMode ||*/ authenticated) {
            return (
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
                    <div className="link-item contrast app-flex app-margin-top">
                        <Link
                            to={`/tripdetails/${currentTrip.trip_id}`}
                            className="contrast"
                        >
                            
                            More
                        </Link>
                    </div>
                </div>
            );
        } else return null;
    }

    _formatDate = (date) => {
        return (date ? date.toString().split("T")[0]: null);
    };
};

export default Trip;