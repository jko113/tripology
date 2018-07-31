import React, { Component } from 'react';
import { ConnectedAllTrips as AllTrips } from "./components/allTrips/AllTripsContainer"
import { ConnectedAllTripsByUser as AllTripsByUser } from "./components/allTripsByUser/AllTripsByUserContainer"
import { ConnectedTrip as Trip } from "./components/trip/TripContainer"
import { ConnectedTripDetails as TripDetails } from "./components/tripDetails/TripDetailsContainer"
// import Signin from "./components/signin/SignIn"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import NavBar from "./components/navbar/NavBar";
// import { ConnectedSignOut as SignOut } from "./components/signin/SignOut";
import { ConnectedHeader as Header} from "./components/header/HeaderContainer";
import { ConnectedAuthorization as Authorization } from './components/authorization/AuthorizationContainer';

class App extends Component {
  
  render() {

    return (
      <Router>
        <div>
          <Header />
          <hr />

          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/allTrips" component={AllTrips} />
          <Route path="/allTripsByUser/:id" component={AllTripsByUser} />
          <Route path="/trip/:id" component={Trip} />
          <Route path="/tripdetails/:id" component={TripDetails} />
          <Route path="/signup" component={Authorization} />
          <Route path="/signin" component={Authorization} />
          {/* <Route path="/signout" component={SignOut} /> */}

        </div>
      </Router>
    );
  }
}

export default App;
