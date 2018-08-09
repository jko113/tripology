import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
    getLocalDate,
} from "../../shared/date/Date";

class TripDetails extends React.Component {

    componentDidMount() {
        if (this.props.user.authenticated) {
            this.props.getTripDetails(this.props.match.params.id, this.props.categories, true);
        }
    }

    getAdder = (buttonText) => {
        return (
            <Link
                className="app-add-first"
                to="/newActivity"
            >{buttonText}</Link>
        );
    };

    biaoti = (currentTrip) => {
        return (
            <div
                className="app-flex app-flex-column"
            >
                <div
                    className="h1 app-small-margin-bottom"
                >{currentTrip.title}
                </div>
                <div
                    className="h2 app-small-margin-bottom"
                >{currentTrip.start_date}&nbsp;to&nbsp;{currentTrip.end_date}
                </div>
            </div>
        );
    };

    shangmian = () => {
        return (
            <div
                className="app-flex app-flex-column full-width"
            >
                <div className="app-small-margin-bottom app-flex full-width app-flex-space-between">
                    <div
                        className="hidden"
                    >Show All</div>
                    <div
                    >
                        Filter by date:&nbsp;&nbsp;
                        <input
                            type="date"
                            value={this.getTripDetailsDate()}
                            onChange={(e) => {
                                this.props.changeFilterDate(e.target.value);
                            }}
                        />
                    </div>
                    <div
                        className="pointer app-margin-left"
                        onClick={(e) => {
                            this.props.changeFilterDate("");
                        }}
                        >Show All
                    </div>
                </div>
                <label>Group by category
                    <input
                        checked={!!this.props.tripDetails.grouped}
                        onChange={e => {
                            this.props.setGroupingMode();
                        }}
                        type="checkbox"
                        className=""
                    />
                </label>
            </div>
        );
    };

    getBody = (filteredArray, fullArray, groupedMode) => {
        if (filteredArray && !filteredArray.length) {
            return <div className="app-small-margin-top">No trip activities scheduled for the specified date.</div>;
        } else {
            if (!groupedMode) {
                return filteredArray.map(activity => {
                    return this.getTrip(activity, fullArray);
                });
            } else {
                return filteredArray.map(category => {
                    // no activities exist for this category
                    if (!category || !category.activitiesArray.length) {
                        return null;
                    }
                    // activities DO exist for this category
                    else {
                        return (
                            <div
                                key={category.categoryId}
                                className="full-width"
                            >
                                <div
                                    className="app-flex-align-self-center h2"
                                >
                                    {category.categoryString}
                                </div>
                                <div
                                    // className="full-width"
                                >
                                    {category.activitiesArray.map(activity => {
                                        return this.getTrip(activity, fullArray, groupedMode);
                                    })}
                                </div>
                            </div>
                        );
                    }
                });
            }
        }
    };

    xiamian = () => {

        const userId = this.props.user.userId;

        return (
            <div className="app-flex app-flex-column app-flex-align-self-center">
                <div
                    className="app-margin-top app-small-margin-bottom"
                >
                    {this.getAdder("Add activity?")}
                </div>
                <Link
                    className="link-item contrast app-flex"
                    to={`/allTripsByUser/${userId}`}
                >Back</Link>
            </div>
        );
    };

    getTrip = (activity, tripActivities) => {
        return (
            <div
                key={activity.activity_id}
                className="app-small-margin-top app-flex app-flex-space-between full-width"
            >
                <div className="app-small-margin-bottom app-small-margin-right">
                    <div
                        className="h2 app-tiny-margin-bottom"
                    >
                        {activity.title}
                    </div>
                    <div
                        className=""
                    >{activity.description}</div>
                    <div
                        className=""
                    >{activity.location}</div>
                    <div
                        className=""
                    >${activity.cost}</div>
                    <div
                        className=""
                    >{activity.start_date}</div>
                    <div
                        className=""
                    >{activity.end_date}</div>
                </div>
                <div
                    className="link-item contrast app-flex pointer"
                    onClick={(e) => {
                        const confirmed = window.confirm(`Are you sure you want to delete the activity "${activity.title}"?`);
                        if (confirmed) {
                            this.props.deleteActivity(activity.activity_id, this.props.tripDetails.data, this.props.tripDetails.groupedDetails, this.props.tripDetails.grouped);
                        }
                    }}
                >
                    Delete
                </div>
            </div>
        );
    };

    getFilterDate = () => {
        return this.props.tripDetails.filterDate;
    };

    getTripStartDate = () => {
        return this.props.currentTrip.data.start_date;
    };

    getTripEndDate = () => {
        return this.props.currentTrip.data.end_date;
    };

    getTripDetailsDate = () => {
        const filterDate = this.getFilterDate();
        return (filterDate) ? filterDate: "";
    };

    checkInTheZone = (a, b, c) => {
        // console.log("comparing a", a, "b", b, "c", c);
        return (
            a >= b &&
            a <= c
        ) ? true: false;
    };

    filterTrips = (activitiesArray) => {

        if (!this.getFilterDate()) {
            return activitiesArray;
        }

        const filterDate = getLocalDate(new Date(this.getFilterDate()));
        const returnArray = [];
        
        activitiesArray.forEach(a => {
            const activityStartDate = getLocalDate(new Date(a.start_date)); 
            const activityEndDate = getLocalDate(new Date(a.end_date));

            if (this.checkInTheZone(filterDate, activityStartDate, activityEndDate)) {
                returnArray.push(a);
            }
        });

        return returnArray.length !== 0 ?
            returnArray:
            [];
    };

    filterGroupedTrips = (groupedActivitiesArray, categories) => {

        if (!groupedActivitiesArray || Object.keys(groupedActivitiesArray).length === 0) {
            return;
        }

        const filterDate = this.getFilterDate();

        const subheadings = groupedActivitiesArray.map((a, index) => {
            if (!a) return null;

            const currentCategoryString = categories.data.find(cat => cat.category_id === index).title;
            const subItems = a.filter(i => {
                const activityStartDate = getLocalDate(new Date(i.start_date)); 
                const activityEndDate = getLocalDate(new Date(i.end_date));
                return (!filterDate) ? true: this.checkInTheZone(getLocalDate(new Date(filterDate)), activityStartDate, activityEndDate);
            });
            // console.log("subitems =", subItems);
            return ({
                categoryString: currentCategoryString,
                categoryId: index,
                activitiesArray: subItems,
            });
        });
        return subheadings;
    };

    render() {
        const currentTrip = this.props.currentTrip.data;
        const authenticated = this.props.user.authenticated;
        
        if (authenticated) {
    
            const groupedMode = this.props.tripDetails.grouped;
            const categories = this.props.categories;

            let tripActivities;
            let filteredTripActivities;
            let arrayIsEmpty = true;

            if (!groupedMode) {
                tripActivities = this.props.tripDetails.data;
                filteredTripActivities = this.filterTrips(tripActivities);
                arrayIsEmpty = false;
            } else {
                tripActivities = this.props.tripDetails.groupedDetails;
                filteredTripActivities = this.filterGroupedTrips(tripActivities, categories);
                tripActivities.forEach(i => {
                    if (i) {
                        arrayIsEmpty = false;
                    }
                });
            }

            if (filteredTripActivities && tripActivities.length && !arrayIsEmpty) {
                return (
                    <div className="app-flex app-flex-column">
                        {this.biaoti(currentTrip)}
                        <div className="app-padding app-margin app-trip-card app-flex app-flex-column app-flex-start">
                            {this.shangmian()}
                            {this.getBody(
                                filteredTripActivities,
                                tripActivities,
                                groupedMode)}
                            {this.xiamian()}
                        </div>
                    </div>
                );
                // no trips meet the date filtering criteria
            } else {
                return (
                    <div className="app-flex app-flex-column">
                        <div className="app-flex">
                            No trip activities for {currentTrip.title} yet.&nbsp;
                            <div className="inline">
                                {this.getAdder("Add one?")}
                            </div>
                        </div>
                        <Link
                            className="link-item app-flex app-margin-top"
                            to={`/trip/${currentTrip.trip_id}`}
                        >
                            Back
                        </Link>
                    </div>
                );
            }
    

            }
        // user is not authenticated
        else
        {
            return <Redirect to="/signin" />
        }
    }
};

export default TripDetails;