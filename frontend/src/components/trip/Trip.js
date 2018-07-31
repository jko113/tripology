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
        return (
            <div>
                <div>
                    {currentTrip.title}
                </div>
                <div>
                    {currentTrip.description}
                </div>
                <div>
                    Start Date: {this._formatDate(currentTrip.start_date)}
                </div>
                <div>
                    End Date: {this._formatDate(currentTrip.end_date)}
                </div>
                <div>
                    <Link to={`/tripdetails/${currentTrip.trip_id}`}>
                        See details..
                    </Link>
                </div>
            </div>
        );
    }

    _formatDate = (date) => {
        return (date ? date.toString().split("T")[0]: null);
    };
};

export default Trip;