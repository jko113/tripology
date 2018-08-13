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
