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

    shangmian = (filteredArray) => {
        let buttonDisplay = this.checkIfArrayIsEmpty(filteredArray.slice()) ? "invisible": "";

        return (
            <div
                className="app-flex app-flex-column full-width"
            >
                <div className="app-small-margin-bottom app-flex full-width app-flex-space-between">
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
                <div
                    onClick={e => {
                        this.props.setGroupingMode();
                    }}
                    className={`link-item-bigger pointer app-flex app-margin ${buttonDisplay}`}
                    // className="link-item-bigger pointer app-flex app-margin"
                >{this.props.tripDetails.grouped ? "Order By Title": "Order By Group"}</div>
            </div>
        );
    };

    getBody = (filteredArray, groupedMode) => {
        let arrayIsEmpty = true;
        // console.log("filteredArr", filteredArray);
        if (groupedMode) {
            filteredArray.forEach(i => {
                if (i && i.activitiesArray.length) {
                    arrayIsEmpty = false;
                }
            });
        }
        // console.log("arrayIsEmpty",arrayIsEmpty, "filteredArr", filteredArray, "groupedMode", groupedMode);
        if (filteredArray && (!filteredArray.length || (groupedMode && arrayIsEmpty))) {        
            return <div className="app-small-margin-top">No trip activities scheduled for the specified date.</div>;
        } else {
            if (!groupedMode) {
                return (
                    <div
                        className="ungrouped-activities"
                    >
                        <div>{filteredArray.map(activity => {
                            return this.getTrip(activity);
                        })}</div>
                        <div
                            className="app-margin-top"
                        >
                            Total: ${this.getUngroupedCost(filteredArray)}
                        </div>
                    </div>
                ); 
            } else {
                return (
                    <div
                        className="grouped-activities"
                    >
                        {filteredArray.map(category => {
                        // no activities exist for this category
                            if (!category || !category.activitiesArray.length) {
                                return null;
                            }
                            // activities DO exist for this category
                            else {
                                return (
                                    <div key={category.categoryId}>
                                        <div
                                            className="full-width activity-group"
                                        >
                                            <div
                                                className="h1 green"
                                            >
                                                {category.categoryString}
                                            </div>
                                            <div>
                                                {category.activitiesArray.map(activity => {
                                                    return this.getTrip(activity);
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                        }})}
                        <div
                            className="app-margin-top"
                        >
                            Total: ${this.getGroupedCost(filteredArray)}
                        </div>
                    </div>
                ); 

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

    getTrip = (activity) => {
        return (
            <div
                key={activity.activity_id}
                className="app-single-activity app-small-margin-top app-flex app-flex-space-between full-width"
            >
                <div className="app-small-margin-bottom app-small-margin-right">
                    <div
                        className="h2 app-tiny-margin-bottom"
                    >
                        {activity.title}
                    </div>
                    <div
                        className=""
                    >{activity.location}</div>
                    <div
                        className=""
                    >{activity.description}</div>
                    <div
                        className=""
                    >${activity.cost.toFixed(2)}
                        <div
                            className={activity.start_date === activity.end_date ? "invisible": "inline"}
                        >&nbsp;(${(activity.cost / this.getTripDuration(activity)).toFixed(2)}/day)</div>
                    </div>
                    <div
                        className=""
                    >{activity.start_date}
                        <div
                            className={activity.start_date === activity.end_date ? "invisible": "inline"}
                        >&nbsp;to&nbsp;{activity.end_date}</div>
                    </div>
                    <div className="app-flex app-flex-start app-small-margin-top">
                        <div
                            className="pointer app-small-margin-right"
                            onClick={(e) => {
                                const confirmed = window.confirm(`Are you sure you want to delete the activity "${activity.title}"?`);
                                if (confirmed) {
                                    this.props.deleteActivity(activity.activity_id, this.props.tripDetails.data, this.props.tripDetails.groupedDetails, this.props.tripDetails.grouped);
                                }
                            }}
                        >
                            <i className="far fa-trash-alt icon-link-item"></i>
                        </div>
                        <Link
                            onClick={() => {
                                console.log("this.props", this.props, "a_id", activity.activity_id);
                            }}
                            to={`/home`}
                            className="pointer"
                        ><i className="far fa-edit icon-link-item"></i></Link>
                    </div>
                </div>
            </div>
        );
    };

    getTripDuration = (a) => {
        const oneDay = 1000*60*60*24;
        const startDate = new Date(a.start_date).getTime();
        const endDate = new Date(a.end_date).getTime();
        const duration = 1 + Math.round(Math.abs((startDate - endDate) / oneDay));
        return duration;
    };

    getUngroupedCost = (activitiesArray) => {
        let total = 0.0;

        activitiesArray.forEach(a => {
            const duration = this.getTripDuration(a);
            total += a.cost / duration;
        });

        return total.toFixed(2);
    };

    getGroupedCost = (groupedActivitiesArray) => {
        let total = 0.0;

        groupedActivitiesArray.forEach(categoryObject => {
            if (categoryObject) {
                categoryObject.activitiesArray.forEach(a => {
                    const duration = this.getTripDuration(a);
                    total += a.cost / duration;
                });
            }
        });

        return total.toFixed(2);
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

    checkIfArrayIsEmpty = (activitiesArray) => {
        const groupedMode = this.props.tripDetails.grouped;
        let emptiness = true;

        if (!groupedMode) {
            emptiness = false;
        } else {
            if (activitiesArray) {
                activitiesArray.forEach(i => {
                    // console.log("i, ",i);
                    if (i && i.activitiesArray && i.activitiesArray.length) {
                        emptiness = false;
                    }
                });
            }
        }
        // console.log("emptiness", emptiness, "activitiesArray", activitiesArray)
        return emptiness;
    };

    render() {
        const currentTrip = this.props.currentTrip.data;
        const authenticated = this.props.user.authenticated;
        
        if (authenticated) {
    
            const groupedMode = this.props.tripDetails.grouped;
            const categories = this.props.categories;

            let tripActivities;
            let filteredTripActivities;
            // let arrayIsEmpty = true;
            
            if (!groupedMode) {
                tripActivities = this.props.tripDetails.data;
                filteredTripActivities = this.filterTrips(tripActivities);
                // arrayIsEmpty = false;
            } else {
                tripActivities = this.props.tripDetails.groupedDetails;
                filteredTripActivities = this.filterGroupedTrips(tripActivities, categories);
                // if (filteredTripActivities) {
                //     filteredTripActivities.forEach(a => {
                //         arrayIsEmpty = a.activitiesArray.length === 0;
                //     });
                // }
            }

            // const arrayIsEmpty = this.checkIfArrayIsEmpty(filteredTripActivities);
            // if (filteredTripActivities) {
            //     console.log("filteredTripActivities", filteredTripActivities);
            //     arrayIsEmpty = this.checkIfArrayIsEmpty(filteredTripActivities.slice());
            // }

            // console.log("filteredTripActivities", filteredTripActivities, "tripActivities", tripActivities, "groupedMode",groupedMode, "arrayIsEmpty",arrayIsEmpty);
                    
            if (filteredTripActivities && tripActivities.length) {
                return (
                    <div className="app-flex app-flex-column">
                        {this.biaoti(currentTrip)}
                        <div className="app-padding app-margin app-flex app-flex-column app-flex-start">
                            {this.shangmian(filteredTripActivities)}
                            {this.getBody(
                                filteredTripActivities,
                                groupedMode)}
                            {this.xiamian()}
                        </div>
                    </div>
                );
                // no trips meet the date filtering criteria
            } else {
                return (
                    <div className="screen-height app-flex app-flex-column">
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