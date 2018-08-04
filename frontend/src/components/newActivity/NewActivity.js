import React from "react";
import { Redirect } from "react-router-dom";
import { getLocalDate } from "../../shared/date/Date";

export const MAX = getLocalDate(new Date("2019-12-31"));
export const MIN = getLocalDate(new Date());
export const formatDate = (date) => {
    return [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
    ].join('-');
};

class NewActivity extends React.Component {

    // innerFormatDate = formatDate;

    displayDate = (date, mode) => {
        // console.log(date, "date");

        if (
            (!this.props.newActivity.userHasInputStart && mode === "start") ||
            (!this.props.newActivity.userHasInputEnd && mode === "end")
        ) {
            return formatDate(getLocalDate(new Date(MIN.getTime() + 1000*24*60*60)));
        } else {
            return date;
        }
    };

    displayCost = (cost) => {
        if (!this.props.newActivity.userHasInputCost) {
            return "";
        } else {
            return cost;
        }
    };

    render() {
        const authenticated = this.props.user.authenticated;
        const justCreatedActivity = this.props.newActivity.justCreatedActivity;
        const createNewActivity = this.props.createNewActivity;
        const newActivity = this.props.newActivity;
        const userInfo = this.props.user;
        const currentTrip = this.props.currentTrip.data;
        const error = this.props.newActivity.errorMessage;
        const errorText = error ? error: "hidden";
        const errorClass = error ? "": "hidden";
        // const userHasInputStart = this.props.newTrip.userHasInputStart;
        // const userHasInputEnd = this.props.newTrip.userHasInputEnd;
        // const userHasInput = this.props.newActivity.userHasInput;

        // console.log(this.props, "NewTrip component props")
        // console.log("currentTrip", Object.keys(currentTrip).length)

        if (!Object.keys(currentTrip).length) {
            return <Redirect to="/" />
        }

        if (authenticated && !justCreatedActivity) {
            return (
                <div
                    className="app-flex app-flex-column app-new-trip-card app-margin"
                    // className="app-flex"
                    // onClick={() => {
                    //     console.log(this.props);
                    // }}
                >
                    <div className="app-margin-bottom app-padding-top h2">
                        Add New Activity
                    </div>
                    <div
                        className="app-flex app-flex-wrap app-flex-start"
                    >
                        <div
                            className="app-flex app-flex-column app-margin-right"
                        >
                            <input
                                key="title"
                                className="app-new-trip-title"
                                value={newActivity.title}
                                placeholder="Title"
                                onChange={(e) => {
                                    this.props.updateTitle(e.target.value);
                                }}
                            />
                            <textarea
                                key="description"
                                className="app-new-trip-description app-tiny-margin-top"
                                value={newActivity.description}
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
                                    this.displayDate(this.props.newActivity.startDate, "start")
                                }
                                type="date"
                                onChange={(e) => {
                                    this.props.updateDate(e.target.value, "start");
                                }}
                            />
                            <input
                                key="end-date"
                                className="app-tiny-margin-top"
                                value={
                                    this.displayDate(this.props.newActivity.endDate, "end")
                                }
                                type="date"
                                onChange={(e) => {
                                    this.props.updateDate(e.target.value, "end");
                                }}
                            />
                        </div>
                    </div>
                    
                    <div
                        className="cost"
                    >
                        <input
                            value={this.displayCost(this.props.newActivity.cost)}
                            onChange={(e) => {
                                this.props.updateCost(e.target.value);
                            }}
                            placeholder="Cost"
                            type="number"
                        />
                    </div>
                    
                    <div
                        className="link-item app-flex pointer app-bigger-margin-top"
                        onClick={() => {
                            // console.log("attempted to submit new activity", newActivity)
                            createNewActivity({
                                title: newActivity.title,
                                description: newActivity.description,
                                startDate: newActivity.startDate,
                                endDate: newActivity.endDate,
                                userInfo: userInfo,
                                currentTrip: currentTrip,
                                cost: newActivity.cost,
                            });
                        }}
                    >
                        Submit
                    </div>
                    <div
                        className={`app-margin-top app-margin-bottom ${errorClass}`}
                    >
                        {errorText}
                    </div>
                </div>
            );
        } else if (justCreatedActivity) {
            const tripId = this.props.currentTrip.data.trip_id;
            return <Redirect to={`/tripdetails/${tripId}`} />
            // console.log(this.props, "just created activity"); return null;
        } else {return null;}
    } 
}

export default NewActivity;