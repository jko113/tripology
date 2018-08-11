import React, { Component } from 'react';
import { ConnectedAllTripsByUser as AllTripsByUser } from "./components/allTripsByUser/AllTripsByUserContainer"
import { ConnectedTrip as Trip } from "./components/trip/TripContainer"
import { ConnectedNewTrip as NewTrip } from "./components/newTrip/NewTripContainer";
import { ConnectedNewActivity as NewActivity } from "./components/newActivity/NewActivityContainer";
import { ConnectedTripDetails as TripDetails } from "./components/tripDetails/TripDetailsContainer"
import { HashRouter as Router, Route } from "react-router-dom";
import { ConnectedHeader as Header} from "./components/header/HeaderContainer";
import { ConnectedAuthorization as Authorization } from './components/authorization/AuthorizationContainer';
import Home from "./components/home/Home";

class App extends Component {
  
  render() {

    return (
      <Router>
        <div className="app-flex app-flex-column">
          <Header />

          <div className="full-width screen-height app-body">
            <Route path="/allTripsByUser/:id" component={AllTripsByUser} />
            <Route path="/trip/:id" component={Trip} />
            <Route path="/tripdetails/:id" component={TripDetails} />
            <Route path="/signup" component={Authorization} />
            <Route path="/signin" component={Authorization} />
            <Route path="/" exact={true} component={Home} />
            <Route path="/newTrip" component={NewTrip}/>
            <Route path="/editTrip" component={NewTrip}/>
            <Route path="/newActivity" component={NewActivity}/>
            <Route path="/editActivity/:id" component={NewActivity}/>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
