import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
    getLocalDate,
} from "../../shared/date/Date";

export const MAX = getLocalDate(new Date("2019-12-31"));
export const MIN = getLocalDate(new Date());

class NewActivity extends React.Component {
    
    displayCost = (cost) => {
        if (!this.props.newActivity.userHasInputCost && !this.props.newActivity.justPopulatedActivityForm) {
            return "";
        } else {
            return cost;
        }
    };

    getCategories = () => {
        return (
            <select
                className="app-new-trip-title app-tiny-margin-top"
                value={this.props.newActivity.category}
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

    getActivityForm = (inEditMode) => {

        const createNewActivity = this.props.createNewActivity;
        const editActivity = this.props.editActivity;
        const newActivity = this.props.newActivity;
        const userInfo = this.props.user;
        const userId = userInfo.userId;
        const currentTrip = this.props.currentTrip.data;
        const error = this.props.newActivity.errorMessage;
        const errorText = error ? error: "hidden";
        const errorClass = error ? "": "hidden";
        const correctFunction = inEditMode ? editActivity: createNewActivity;

        return (
            <div
                className="app-flex app-flex-column app-new-trip-card full-width"
            >
                <div className="app-margin-bottom app-padding-top h2">
                    {inEditMode ? "Edit Activity": "Add New Activity"}
                </div>
                <div
                    className="app-flex app-flex-wrap app-flex-start"
                >
                    <div
                        className="app-flex app-flex-column app-margin-right"
                    >
                        <input
                            required
                            autoComplete="off"
                            key="title"
                            className="app-new-trip-title"
                            value={newActivity.title}
                            placeholder="Title"
                            onChange={(e) => {
                                this.props.updateTitle(e.target.value.slice(0,30));
                            }}
                        />
                        <textarea
                            autoComplete="off"
                            key="description"
                            className="app-new-trip-description app-tiny-margin-top"
                            value={newActivity.description}
                            placeholder="Description"
                            onChange={(e) => {
                                this.props.updateDescription(e.target.value.slice(0,150));
                            }}
                        />
                        <input
                            required
                            autoComplete="off"
                            className="app-new-trip-title app-tiny-margin-top"
                            value={this.displayCost(this.props.newActivity.cost)}
                            onChange={(e) => {
                                this.props.updateCost(e.target.value);
                            }}
                            placeholder="Cost"
                            type="number"
                        />
                        <input
                            autoComplete="off"
                            className="app-new-trip-title app-tiny-margin-top"
                            value={newActivity.location}
                            onChange={(e) => {
                                this.props.updateLocation(e.target.value.slice(0,50));
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
                                this.props.newActivity.startDate
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
                                this.props.newActivity.endDate
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
                            const missive = {
                                title: newActivity.title,
                                description: newActivity.description ? newActivity.description: undefined,
                                startDate: newActivity.startDate,
                                endDate: newActivity.endDate,
                                userInfo: userInfo,
                                currentTrip: currentTrip,
                                cost: newActivity.cost,
                                location: newActivity.location ? newActivity.location: undefined,
                                categoryId: this.getCategoryObject(newActivity.category).category_id,
                                activityId: newActivity.activityId ? newActivity.activityId: undefined,
                            };
                            
                            correctFunction(missive, userId);
                        }}
                    >
                        Submit
                    </div>
                    <Link
                        to={`/tripdetails/${currentTrip.trip_id}`}
                        className="link-item-ghost app-flex pointer app-bigger-margin-top"
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
        );
    };

    render() {

        const authenticated = this.props.user.authenticated;
        const justCreatedActivity = this.props.newActivity.justCreatedActivity;
        const tripDetails = this.props.tripDetails;
        const currentTrip = this.props.currentTrip.data;

        if (!Object.keys(currentTrip).length && tripDetails && tripDetails.data && tripDetails.data.length) {
            const tripId = this.props.tripDetails.data[0].trip_id;
            this.props.getOneTrip(tripId);
        }

        if (authenticated && !justCreatedActivity) {
            const inEditMode = this.props.match.params.id ? true: false;

            return (
                <div className="app-flex app-flex-column app-margin screen-height">
                    <div
                        className="app-flex app-flex-column"
                    >
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
                    </div>
                    {this.getActivityForm(inEditMode)}
                </div>
            );
        } else if (justCreatedActivity) {
            const tripId = this.props.currentTrip.data.trip_id;
            return <Redirect to={`/tripdetails/${tripId}`} />
        } else {return <Redirect to="/" />}
    } 
}

export default NewActivity;