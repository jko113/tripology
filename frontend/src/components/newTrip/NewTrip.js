import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
    getLocalDate,
    formatDate,
} from "../../shared/date/Date";

export const MAX = getLocalDate(new Date("2019-12-31"));
export const MIN = getLocalDate(new Date());

class NewTrip extends React.Component {

    componentWillMount() {
        const authenticated = this.props.user.authenticated;

        if (authenticated) {
            const inEditMode = this.props.match.path === "/editTrip";
            const justPopulatedEditTripForm = this.props.newTrip.justPopulatedEditTripForm;
    
            if (inEditMode && !justPopulatedEditTripForm) {
                this.props.populateEditTripForm(this.props.currentTrip);
            }
        }
    }

    displayDate = (numDays, date, mode) => {

        // if editing the trip form, we assume valid trip dates already exist
        // otherwise, we populate the date fields with a default value based on the present date
        if ( !this.props.match.path === "/editTrip" &&
            ((!this.props.newTrip.userHasInputStart && mode === "start") ||
            (!this.props.newTrip.userHasInputEnd && mode === "end"))
        ) {
            return formatDate(getLocalDate(new Date(MIN.getTime() + 1000*24*60*60*numDays)));
        } else {
            return date;
        }
    };

    getBody = () => {
        const createNewTrip = this.props.createNewTrip;
        const editTrip = this.props.editTrip;
        const newTrip = this.props.newTrip;
        const userInfo = this.props.user;
        const error = this.props.newTrip.errorMessage;
        const errorText = error ? error: "hidden";
        const errorClass = error ? "": "hidden";
        const inEditMode = this.props.match.path === "/editTrip";
        const headerMessage = inEditMode ? "Edit Trip": "Add New Trip";
        const correctFunction = inEditMode ? editTrip: createNewTrip;
        const tripId = inEditMode ? this.props.currentTrip.data.trip_id: undefined;
        const correctCancelPath = inEditMode ? `/trip/${tripId}`: `/`;

        return (
            <div
                className="screen-height app-flex app-flex-column app-new-trip-card"
            >
                <div className="app-margin-bottom app-padding-top h1">{headerMessage}</div>
                <div
                    className="app-flex app-flex-wrap app-flex-start"
                >
                    <div
                        className="app-flex app-flex-column app-margin-right"
                    >
                        <input
                            key="title"
                            className="app-new-trip-title"
                            value={newTrip.title}
                            placeholder="Title"
                            onChange={(e) => {
                                this.props.updateTitle(e.target.value);
                            }}
                        />
                        <textarea
                            key="description"
                            className="app-new-trip-description app-tiny-margin-top"
                            value={newTrip.description}
                            placeholder="Description"
                            onChange={(e) => {
                                this.props.updateDescription(e.target.value);
                            }}
                        />
                    </div>
                    <div className="app-flex app-flex-column">
                        <input
                            key="start-date"
                            value={
                                this.displayDate(1, this.props.newTrip.startDate, "start")
                            }
                            type="date"
                            onChange={(e) => {
                                this.props.updateDate(e.target.value, "start");
                            }}
                        />
                        <input
                            className="app-tiny-margin-top"
                            key="end-date"
                            value={
                                this.displayDate(2, this.props.newTrip.endDate, "end")
                            }
                            type="date"
                            onChange={(e) => {
                                this.props.updateDate(e.target.value, "end");
                            }}
                        />
                    </div>
                </div>
                <div
                    className="app-flex"
                >
                    <div
                        className="link-item app-flex pointer app-bigger-margin-top app-margin-right"
                        onClick={() => {
                            correctFunction({
                                title: newTrip.title,
                                description: newTrip.description,
                                startDate: newTrip.startDate,
                                endDate: newTrip.endDate,
                                userInfo: userInfo,
                                tripId: tripId,
                            });
                        }}
                    >
                        Submit
                    </div>
                    <Link
                        className="link-item app-flex app-bigger-margin-top"
                        to={correctCancelPath}
                    >Cancel</Link>
                </div>
                <div
                    className={`app-margin-top app-margin-bottom ${errorClass}`}
                >
                    {errorText}
                </div>
            </div>
        );
    };

    render() {

        const authenticated = this.props.user.authenticated;
        const justCreatedTrip = this.props.newTrip.justCreatedTrip;

        if (authenticated && !justCreatedTrip) {

            return this.getBody();

        } else if (justCreatedTrip) {
            const tripId = this.props.currentTrip.data.trip_id;
            return <Redirect to={`/trip/${tripId}`} />;
        } else {return <Redirect to={`/`} />;}
    } 
}

export default NewTrip;