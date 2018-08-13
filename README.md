# Tripology
## Synopsis
[Tripology](http://tripology.joshuakowens.com/) is a web application for managing travel information, allowing users to conveniently track trip expenses and daily itineraries by entering, editing, or deleting entries as needed.

## Technologies
HTML/CSS
JavaScript
Node.js
PostgreSQL
React
Redux
Express
React-Redux
React-Router-DOM
Axios
pg-promise
Body-parser
Simplecrypt

## Creator
Joshua Owens

## Motivation
When planning for an upcoming trip, I realized how handy an easily accessible web tool would be for staying organized while travelling - rather than carrying around loads of documents or having to commit important appointments to memory, why not store the information securely online? This idea spawned Tripology, an app that combines the utility of a calendar and practicality of a calculator with the pleasure of using a simple, streamlined UI.

## Challenges
### Deployed full-stack app to AWS
It took a fair amount of trial and error and online research to correctly configure the AWS EC2 instance for hosting both the front and back end at the same URL end point.

I utilized NGINX to route web traffic on the server. I found that it was necessary to separate backend (or API) calls from frontend files, because otherwise each call would be incorrectly routed to the proxy server handling backend requests. This is the general structure I settled on, where <> denotes properties unique to my configuration:

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

The key here was using the /api path to route API requests to the backend server, but nothing else. Naturally, in order for this to work, the frontend had to send all API requests to an end point such as /api/createTrip.

### Getting the hang of Redux
Redux is a powerful tool, but also one that comes with a steep learning curve. This was especially challenging under the tight time constraints for this project. After acquainting myself with the basics through tutorials and online documentation, I endeavored to implement this application using Redux best practices.

Specifically, the bulk of code is dedicated to functional component groups, such as NewTrip, NewActivity, TripDetails, and the like. Each of these components has its own directory. For the majority, each component folder contains four separate files, for consistency and ease of navigation. The four files are:

1. the root component: the user-facing content that is displayed on screen. This component is supplied with functions that it calls when needed but does not manage directly. Similarly, it has access to a part or parts state, but is not able to modify state directly -- any state change must be routed through an action.
1. the container: the container, in keeping with React-Redux architectural principles, links up a "dumb" component with a "smart" one. It provides the associated root component with the parts of state and the functions that it might need. 
1. the actions: actions are responsible for dispatching actions and form the heart of the internal mechanism of frontend state management. A single action may comprise one or more API calls, or it could be limited to frontend state changes only.
1. the reducer: the reducer grabs dispatched actions and handles them when appropriate. In Redux, dispatched actions are global, so only reducers that are specifically configured to listen out for a given action will be prompted to change state when that action is released.

The four-file component structure isn't a hard-and-fast rule, however. I also found it useful to incorporate a couple of supplemental "utility" components for sharing functionality and logic among multiple components. These include "UserActions" and "Date".

### Data Validation
There were several locations in the code base that called for solid data validation in order to ensure a quality user experience, primarily concerning dates and text input fields. In order to ensure users are able to create usernames with no more than 12 alphanumeric characters, the API layer checks the username for validity prior to firing off the createNewUser() database call. This was accomplished using a helper function called validateUsername():

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
                errorMessage: `Username must be ${MAX} characters or less.`,
            });
        }
        
        // if the inputs are valid, proceed to make API call to the backend
```
