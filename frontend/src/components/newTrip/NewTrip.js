import React from "react";

export const MAX = new Date("2019-12-31");
export const MIN = new Date();
export const formatDate = (date) => {
    return [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
    ].join('-');
};

class NewTrip extends React.Component {

    // innerFormatDate = formatDate;

    displayDate = (numDays, date, mode) => {
        // console.log(this.props.newTrip);

        if (
            (!this.props.newTrip.userHasInputStart && mode === "start") ||
            (!this.props.newTrip.userHasInputEnd && mode === "end")
        ) {
            return formatDate(new Date(MIN.getTime() + 1000*24*60*60*numDays));
        } else {
            return date;
        }
    };

    render() {
        const createNewTrip = this.props.createNewTrip;
        const newTrip = this.props.newTrip;
        const userInfo = this.props.user;
        const error = this.props.newTrip.errorMessage;
        const errorText = error ? error: "hidden";
        const errorClass = error ? "": "hidden";
        // const userHasInputStart = this.props.newTrip.userHasInputStart;
        // const userHasInputEnd = this.props.newTrip.userHasInputEnd;

        // console.log(userHasInput)

        return (
            <div
                className="app-flex app-flex-column app-new-trip-card app-margin"
                // className="app-flex"
                // onClick={() => {
                //     console.log(this.props);
                // }}
            >
                <div className="app-margin-bottom app-padding-top">This is a new trip form.</div>
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
                    className="link-item app-flex pointer app-bigger-margin-top"
                    onClick={() => {
                        createNewTrip({
                            title: newTrip.title,
                            description: newTrip.description,
                            startDate: newTrip.startDate,
                            endDate: newTrip.endDate,
                            userInfo: userInfo,
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
    }
}

export default NewTrip;