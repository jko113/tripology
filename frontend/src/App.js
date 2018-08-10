import React, { Component } from 'react';
// import { ConnectedAllTrips as AllTrips } from "./components/allTrips/AllTripsContainer"
import { ConnectedAllTripsByUser as AllTripsByUser } from "./components/allTripsByUser/AllTripsByUserContainer"
import { ConnectedTrip as Trip } from "./components/trip/TripContainer"
import { ConnectedNewTrip as NewTrip } from "./components/newTrip/NewTripContainer";
import { ConnectedNewActivity as NewActivity } from "./components/newActivity/NewActivityContainer";
import { ConnectedTripDetails as TripDetails } from "./components/tripDetails/TripDetailsContainer"
// import Signin from "./components/signin/SignIn"
import { HashRouter as Router, Route } from "react-router-dom";
// import NavBar from "./components/navbar/NavBar";
// import { ConnectedSignOut as SignOut } from "./components/signin/SignOut";
import { ConnectedHeader as Header} from "./components/header/HeaderContainer";
import { ConnectedAuthorization as Authorization } from './components/authorization/AuthorizationContainer';
// import { SignUp } from "./components/SignUp/SignUp";
// import { SignIn } from "./components/SignIn/SignIn";
import Home from "./components/home/Home";

class App extends Component {
  
  render() {

    return (
      <Router>
        <div className="app-flex app-flex-column">
          <Header />

          {/* <div className="app-flex full-width full-height app-body"> */}
          <div className="full-width full-height app-body">
            {/* <Route path="/allTrips" component={AllTrips} /> */}
            <Route path="/allTripsByUser/:id" component={AllTripsByUser} />
            <Route path="/trip/:id" component={Trip} />
            <Route path="/tripdetails/:id" component={TripDetails} />
            <Route path="/signup" component={Authorization} />
            <Route path="/signin" component={Authorization} />
            <Route path="/" exact={true} component={Home} />
            <Route path="/signout" component={Home}/>
            <Route path="/newTrip" component={NewTrip}/>
            <Route path="/editTrip" component={NewTrip}/>
            <Route path="/newActivity" component={NewActivity}/>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
