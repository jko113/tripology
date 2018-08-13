# Tripology
## Synopsis
[Tripology](http://tripology.joshuakowens.com/) is a web application for managing travel information, allowing users to conveniently track trip expenses and daily itineraries by entering, editing, or deleting entries as needed.

## Technologies
* HTML/CSS
* JavaScript
* Node.js
* PostgreSQL
* Amazon Web Services
* React
* Redux
* Express
* React Redux
* react-router-dom
* NGINX
* axios
* pg-promise
* body-parser
* Simplecrypt

## Motivation
When planning for an upcoming trip, I realized how handy an easily accessible web tool would be for staying organized while travelling - rather than carrying around loads of documents or having to commit important appointments to memory, why not store the information securely online? This idea spawned Tripology, an app that combines the utility of a calendar and precision of a calculator with the pleasure and practicality of a simple, streamlined UI.

## Challenges
### Deployed full-stack app to AWS
It took a fair amount of trial and error together with online research to correctly configure the AWS EC2 instance for hosting both the front and back end at the same URL end point.

I utilized NGINX to route web traffic on the server. I found it necessary to separate backend (or API) calls from frontend files, because otherwise each call would be incorrectly routed to the proxy server handling backend requests. This is the general structure I settled on, where <> denotes properties unique to my configuration:

```
server {
    server_name <MY_DOMAIN>
    
    listen 80;
    listen [::]:80;
    
    root <FRONTEND_BUILD_DIRECTORY>;
    index index.html;
    
    location /api {
        proxy_pass http://localhost:<BACKEND_PORT>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

The key here was using the /api path to route all API requests to the backend server, but nothing else. Naturally, in order for this to work, the frontend had to send its API requests to an end point such as /api/createTrip.

### Getting the hang of Redux
Redux is a powerful tool, but also one that comes with a steep learning curve. This was especially challenging under the tight time constraints for this project. After acquainting myself with the basics through tutorials and online documentation, I endeavored to implement this application using Redux best practices.

The bulk of code is dedicated to functional component groups, such as NewTrip, NewActivity, TripDetails, and the like. Each of these components has its own directory. For most of them, the component folder contains four separate files, for consistency and ease of navigation. The four files are:

1. the root component: the user-facing content that is displayed on screen. This component is supplied with functions that it calls when needed but does not manage directly. Similarly, it has access to a part or parts state, but is not able to modify state directly -- any state change must be routed through an action.
1. the container: the container, in keeping with React-Redux architectural principles, links up a "dumb" component with a "smart" one. It provides the associated root component with the parts of state and the functions that it might need. 
1. the actions: actions are responsible for dispatching actions and form the heart of the internal mechanism of frontend state management. A single action may comprise one or more API calls, or it could be limited to frontend state changes only.
1. the reducer: the reducer grabs dispatched actions and handles them when appropriate. In Redux, dispatched actions are global, so only reducers that are specifically configured to listen out for a given action will be prompted to change state when that action is released.

The four-file component structure isn't a hard-and-fast rule, however. I also found it useful to incorporate a couple of supplemental "utility" components for sharing functionality and logic among multiple components. These include "UserActions" and "Date".

An interesting challenge posed by Redux is how best to implement state changes that involve several (or even all) parts of state that would not normally be interconnected. One example is the sign out action, which is effectively tasked with clearing the entire state. No doubt there are several ways to solve this problem, but the one I used is to wrap Redux's built-in `combineReducers()` function inside a function of my own that first asks the question "is the user signing out?". If the answers is yes, the state gets reset, and if it is no, the normal root reducer takes over from there.

Here's the code used to implement this approach:

```javascript
const rootReducer = (state, action) => {
    if (action.type === SIGN_OUT) {
        state = signoutReducer(state, action);
    }

    return combineReducers({
        // the various pieces of state and their corresponding reducers are defined here           
    });
};

const signoutReducer = (state, action) => {

    if (!action) {
        return state;
    }

    return {
        // here we reset the store to its initial, pristine state
    };
};
```

This root reducer is used when calling Redux's `createStore()` function to create the store, which in turn is passed to the Provider object (a gift from React-Redux) that wraps the entire application in App.js.

### Conditional Rendering
The most basic requirement of a secure app is to show private content to authorized users. In order to implement this architecturally, I enforced conditional rendering within private components. By adding user authentication details to the state and making that part of state available to the relevant components, it was possible for the components to confirm user authentication before rendering secure content.

Here is an example of how this worked in the Trip component:

```javascript
componentDidMount() {
    const authenticated = this.props.user.authenticated;
    if (authenticated) {
        this.props.getOneTrip(this.props.match.params.id);
    }
}
```

The component makes use of the `componentDidMount()` lifecycle method (see more about React's lifecycle methods [here](https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1)) to obtain information about a single trip from the backend at the correct time - that is, after the component mounts. The component is allowed to make an API call for the trip information only if the state asserts that the user is logged in successfully. If the user is not authenticated, the component also has built-in logic to redirect to the signin page:

```javascript
if (authenticated) {
    // render some compelling content
} else {
    return <Redirect to="/signin" />;
}
```

### Data Validation
There were several locations in the code base that called for solid data validation in order to ensure a quality user experience, primarily concerning dates and text input fields. In order to ensure users are able to create usernames with no more than 12 alphanumeric characters, the API layer checks the username for validity prior to firing off the createNewUser() database call. This was accomplished using a helper function called `validateUsername()`:

```javascript
function validateUsername(username) {
    return username.match(/^\w+$/);
}
```

The regular expression ensures that only letters, numbers or the underscore are allowed. Meanwhile, the frontend validates the username and password inputs at two levels. First, at the root component level in Authorization.js the input is configured to only allow a maximum of 12 characters using this onChange function:

```javascript
onChange={(e) =>
    this.props.updateUsername(e.target.value.slice(0,12))
}
```

As an added safeguard or alternative, the associated action in UserActions.js can check that the maximum number of characters has not been surpassed before making an API call:

```javascript
export const createNewUser = (username, password) => {
    const MAX = 12;
    return async (dispatch) => {

        // early return if invalid username/password combination
        if (username.length > MAX || password.length > MAX) {
            return dispatch({
                type: CREATE_NEW_USER_FAILED,
                errorMessage: `Username and password must be ${MAX} characters or less.`,
            });
        }
        
        // if the inputs are valid, proceed to make API call to the backend
        
    }
}
```

### Date-ing in JavaScript
After much headscratching and toil, I managed to properly control dates throughout the application by building my own date-handler function:

```javascript
export const getLocalDate = (date) => {
    let returnDate;
    let offset;
    if (!date) {
        offset = new Date().getTimezoneOffset();
    } else {
        offset = new Date(date).getTimezoneOffset();
    }
    
    const positiveOffset = offset >= 0;

    if (typeof date === "string") {
        returnDate = new Date(date);
    } else if (!date) {
        returnDate = new Date();
    } else if (typeof date === "number") {
        returnDate = new Date(date);
    } else {
        returnDate = new Date(date);
    }

    positiveOffset ?
        returnDate.setTime(returnDate.getTime() + offset*60*1000):
        returnDate.setTime(returnDate.getTime() - offset*60*1000);
        
    return returnDate;
};
```

So let's break this down a bit. The function takes a date parameter, which if not supplied (or null) defaults to today's date. IThe function also handles time measured in milliseconds since 01/01/1970; dates provided as JavaScript Date objects; as well as ISO 8601-formatted strings. 

The key to this working properly is the offset, which calculates the difference in minutes between the browser's timezone and UTC time. The offset can be positive or negative, based on proximity to Greenwich, England. I encountered a bug where Daylight Savings Time was not properly taken into account, which I resolved by forcing the offset to calculate based off the provided date rather than today's date.

After going to great lengths to make this work like I expected, I found [this](https://blog.lftechnology.com/date-ing-javascript-6203650b752c) excellent article about the Date object that, had I known about it ahead of time, could have saved me some time and vexation. Nevertheless, it was instructive and beneficial for me to do the leg work of better understanding the Date object's internals and how to go about creating a custom function to manipulate dates as needed.

## Lessons Learned
### Refactor for functionality and readability
I discovered several times when writing this application that certain blocks of code became ever more unintelligible. By that I mean difficult to tell at a glance what they were meant to accomplish. This was especially apparent in `render()` functions that had to take into account lots of different scenarios in order to display content correctly.

To remedy this, I went about refactoring code with the goal of transposing large functional chunks of code to separate functions. Take for example the NewTrip component, which calls the `getBody()` method to grab the JSX that is to be rendered. `getBody()`, sitting at a hefty ~100 lines of code, definitely gets in the weeds of hammering out the content it's supposed to display. It was eye-poppingly confusing to mentally sift through (or try to ignore) all that logic when skimming over the components `render()` function, and was quite a relief once I moved that chunk off-site to `getBody()`:

```javascript
render() {

    const authenticated = this.props.user.authenticated;
    const justCreatedTrip = this.props.newTrip.justCreatedTrip;
    
    if (authenticated && !justCreatedTrip) {

        return this.getBody();

    } else if (justCreatedTrip) {
    
        const tripId = this.props.currentTrip.data.trip_id;
        return <Redirect to={`/trip/${tripId}`} />;
        
    } else {
        return <Redirect to={`/`} />;
    }
} 
```

Now, with a mere 10 lines of code or so, a reviewer can tell at a glance what's supposed to be rendering in any given situation: either display the new trip form, or if a trip was just created, redirect to that trip's page, or if the user isn't logged in, redirect unauthenticated users to the signin page. All this can be readily ascertained without having to understand the internal mechanism of how the form is actually implemented.

I took a similar approach in several other areas of the code base, opting for delegation to specialized function over centrality of logic within a single `render()`.

### Passing data among components
An interesting thing I learned while creating this application is that it’s perfectly acceptable to allow interplay between different parts of state within a Redux application. In a couple of instances, I needed to pass a data object that isn't immediately available in the store from one component to another. To illustrate this, take the contrasting examples of NewTrip and NewActivity. In truth, these should be called NewOrEditTrip and NewOrEditActivity, but for readability I kept the naming simple.

I configured the store include a piece of state tracking `currentTrip`. This made it simple to populate the New/Edit Trip form with data from the `currentTrip` part of the store. This was easily achievable because there can only be a maximum of one currentTrip. For trip activities, however, there can be more than one activity per trip that displays on screen, so I made the design decision of dynamically passing in the data associated with any given activity to the Edit Activity form when the "edit activity" button is clicked.

So what this amounts to is a UI data flow like so:

1. on TripDetails screen, user clicks "new activity" or "edit activity"
1. if "new", the form blank
1. else if "edit", the button calls a function that was mapped to it by its corresponding container defined in TripDetailsContainer.js, passing in the associated activity as the function argument. The `populateActivityForm()` method is defined separately by the NewActivity component in NewActivityActions.js and is imported by the TripDetails container.

To make this work, the TripDetails component has to dispatch the POPULATE_ACTIVITY_FORM action, which the NewActivity component is listening out for. When it detects that this action was dispatched, it grabs the activity object that was passed into the dispatch function and uses it to populate the Edit Activity form with the activity object's data.

## Creator
Joshua Owens

## MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
