const dotenv = require("dotenv");
dotenv.config();

const db = require("./db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.APP_PORT;
const cors = require('cors')

const static = express.static;
app.use(static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get("/api/allTripsByUser/:id", (req, res) => {
    const userId = req.params.id;
    db.getAllTripsByUser(userId)
        .then(data => {
            res.json(data);
        })
});

app.get("/api/trip/:id", (req, res) => {
    db.getOneTrip(req.params.id)
        .then(tripData => {            
            db.getTripCost(tripData.trip_id)
                .then(cost => {
                    tripData["tripCost"] = cost.sum;
                    res.json(tripData);
                })
                .catch(error => console.error);
        
        }).catch(error => console.error);
});

app.get("/api/tripdetails/:id", (req, res) => {
    db.getTripDetails(req.params.id)
        .then(data => {
            res.json(data);
        })
});

app.post("/api/signout", (req, res) => {
    res.json({
        signout: true,
    });
});

app.post("/api/deleteActivity", (req, res) => {
    db.deleteActivity(req.body.activityId)
        .then(result => {
            res.json(result)
        }).catch(err => console.error);
});

app.post("/api/deleteTrip", (req, res) => {
    db.deleteTrip(req.body.tripId)
        .then(result => {
            res.json(result)
        }).catch(err => console.error);
});

app.post("/api/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.checkUserExistenceByUsername(username)
        .then(result => {
            if (result && result.exists) {
                db.validateExistingUserPassword(result.user_id, username, password)
                    .then(result => {
                        if (result) {
                            return result;
                        } else {
                            // incorrect password, no?
                            res.json({
                                error: "Username does not exist."
                            });
                        }
                    }).then(userExistsObject => {
                        db.getCategories(userExistsObject)
                            .then(categories => {
                                const returnObj = {
                                    userInfo: userExistsObject,
                                    categories: categories,
                                };
                                res.json(returnObj);
                            })
                            .catch(error => console.error);
                    }).catch(error => {
                        console.error(error);
                    })
            } else {
                res.json({
                    error: "Username does not exist."
                });
            }
        }).catch(error => console.error);

});

app.post("/api/createnewuser", (req, res) => {

    db.createNewUser(req.body.username, req.body.password)
        .then(userCreatedObject => {
            // res.json(result);
            db.getCategories(userCreatedObject)
                .then(categories => {
                    userCreatedObject["categories"] = categories;
                    res.json(userCreatedObject);
                }).catch(error => console.error);
        })
        .catch(error => console.error);
});

app.post("/api/newTrip", (req, res) => {
    const {
        userInfo,
        title,
        description,
        startDate,
        endDate,
    } = req.body.tripDetails;

    db.addTrip(
        userInfo.userId,
        title,
        description,
        startDate,
        endDate,
    ).then(result => {
        if (result) {
            // add additional fields for currentTrip
            result["user_id"] = userInfo.userId;
            result["title"] = title;
            result["description"] = description;
            result["start_date"] = new Date(startDate);
            result["end_date"] = new Date(endDate);
            res.json(result);
        } else {
            res.json({
                error: "An error occurred. The trip was not added successfully."
            });
        }
    }).catch(error => {
        res.json(error);
    })
});

app.post("/api/editTrip", (req, res) => {
    const {
        tripId,
        userInfo,
        title,
        description,
        startDate,
        endDate,
    } = req.body.tripDetails;

    db.editTrip(
        tripId,
        title,
        description,
        startDate,
        endDate,
    ).then(result => {
        if (result) {
            // add additional fields for currentTrip
            result["user_id"] = userInfo.userId;
            result["title"] = title;
            result["description"] = description;
            result["start_date"] = new Date(startDate);
            result["end_date"] = new Date(endDate);
            res.json(result);
        } else {
            res.json({
                error: "An error occurred. The trip was not edited successfully."
            });
        }
    }).catch(error => {
        res.json(error);
    })
});

app.post("/api/newActivity", (req, res) => {
    activityDetails = req.body.activityDetails;
    tripDetails = activityDetails.currentTrip;
    const {
        title,
        description,
        location,
        startDate,
        endDate,
        cost,
        categoryId,
    } = activityDetails;
    const {
        trip_id,
    } = tripDetails;
    
    const contactId = 1;
    
    db.addActivity(
        title,
        description,
        cost,
        location,
        trip_id,
        startDate,
        endDate,
        contactId,
        categoryId,
    ).then(result => {
        res.json(result);
    }).catch(error => console.error);
});

app.post("/api/editActivity", (req, res) => {
    activityDetails = req.body.activityDetails;
    tripDetails = activityDetails.currentTrip;
    const {
        title,
        description,
        location,
        startDate,
        endDate,
        cost,
        categoryId,
        activityId,
    } = activityDetails;

    const contactId = 1;
    
    db.editActivity(
        title,
        description,
        cost,
        location,
        startDate,
        endDate,
        contactId,
        categoryId,
        activityId,
    ).then(result => {
        res.json(result);
    }).catch(error => console.error);
});

app.get("/api/getCategories", (req, res) => {
    db.getCategories()
        .then(result => {
            console.log("result", result);
        })
        .catch(error => console.error);
});

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`);
});