import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
    getLocalDate,
    formatDate,
} from "../../shared/date/Date";

export const MAX = getLocalDate(new Date("2019-12-31"));
export const MIN = getLocalDate(new Date());

class NewActivity extends React.Component {

    componentDidMount() {
        if (!this.props.categories.data.length) {
            this.props.history.push(`/signin`);
        } else {
            this.props.setCategory(undefined, this.props.categories.data);
        }
    }

    displayDate = (date, mode) => {

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

    getCategories = () => {
        return (
            <select
                className="app-new-trip-title app-tiny-margin-top"
                onChange={(e) => {
                    this.props.setCategory(e.target.value, this.props.categories.data);
                }}
            >
                {this.props.categories.data.map(this.getCategory)}
            </select>
        );
    };

    getCategory = (cat) => {
        return (
            <option key={cat.category_id}>{cat.title}</option>
        );
    };

    getCategoryObject = (categoryString) => {
        const targetCategoryObject = this.props.categories.data.find(i => {
            return i.title === categoryString;
        });
        return targetCategoryObject;
    };

    render() {
        const authenticated = this.props.user.authenticated;
        const justCreatedActivity = this.props.newActivity.justCreatedActivity;
        const createNewActivity = this.props.createNewActivity;
        const newActivity = this.props.newActivity;
        const userInfo = this.props.user;
        const tripDetails = this.props.tripDetails;
        const currentTrip = this.props.currentTrip.data;
        const error = this.props.newActivity.errorMessage;
        const errorText = error ? error: "hidden";
        const errorClass = error ? "": "hidden";

        if (!Object.keys(currentTrip).length && tripDetails && tripDetails.data && tripDetails.data.length) {
            const tripId = this.props.tripDetails.data[0].trip_id;
            this.props.getOneTrip(tripId);
        }

        if (authenticated && !justCreatedActivity) {
            return (
                <div className="app-flex app-flex-column app-margin screen-height">
                    <div
                        className="app-flex-align-self-center h1 app-small-margin-bottom"
                    >
                        {currentTrip.title}
                    </div>
                    <div
                        className="h2 app-flex-align-self-center app-margin-bottom"
                    >
                        {currentTrip.start_date}&nbsp;to&nbsp;{currentTrip.end_date}
                    </div>
                    <div
                        className="app-flex app-flex-column app-new-trip-card full-width"
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
                                <input
                                    className="app-new-trip-title app-tiny-margin-top"
                                    value={this.displayCost(this.props.newActivity.cost)}
                                    onChange={(e) => {
                                        this.props.updateCost(e.target.value);
                                    }}
                                    placeholder="Cost"
                                    type="number"
                                />
                                <input
                                    className="app-new-trip-title app-tiny-margin-top"
                                    value={newActivity.location}
                                    onChange={(e) => {
                                        this.props.updateLocation(e.target.value);
                                    }}
                                    placeholder="Location"
                                    type="text"
                                />
                                {this.getCategories()}
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
                        
                        <div className="app-flex">
                            <div
                                className="link-item app-flex pointer app-bigger-margin-top app-margin-right"
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
                                        location: newActivity.location,
                                        categoryId: this.getCategoryObject(newActivity.category).category_id,
                                    });
                                }}
                            >
                                Submit
                            </div>
                            <Link
                                to={`/tripdetails/${currentTrip.trip_id}`}
                                className="link-item app-flex pointer app-bigger-margin-top"
                                // onClick={(e) => {
                                //     console.log(currentTrip);
                                // }}
                            >
                                Back
                            </Link>
                        </div>
                        <div
                            className={`app-margin-top app-margin-bottom ${errorClass}`}
                        >
                            {errorText}
                        </div>
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