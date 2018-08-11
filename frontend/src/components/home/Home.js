import React from "react";

const Home = (props) => {

    return (
        <div className="app-home app-flex app-flex-column">
            <div className="app-flex app-logo">
                Tripology
            </div>
            <div className="app-flex app-description">
                Where to next?
            </div>
            <div className="description1">
                Organize scattered information all in one place
            </div>
            <div className="description2">
                See a full-day's itinerary at a glance
            </div>
            <div className="description3">
                Keep close tabs on trip expenses
            </div>
        </div>
    );
};

export default Home;