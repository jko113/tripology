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

// const simplecrypt = require("simplecrypt");
// const sc = simplecrypt();

// app.get("/allTrips", (req, res) => {
//     db.getAllTrips()
//         .then(data => {
//             res.json(data);
//         })
// });

app.get("/api/allTripsByUser/:id", (req, res) => {
    const userId = req.params.id;
    // console.log(userId);
    db.getAllTripsByUser(userId)
        .then(data => {
            res.json(data);
        })
});

app.get("/api/trip/:id", (req, res) => {
    db.getOneTrip(req.params.id)
        .then(data => {
            res.json(data);
        })
});

app.get("/api/tripdetails/:id", (req, res) => {
    // console.log("tripdetails req.params", req.params);
    db.getTripDetails(req.params.id)
        .then(data => {
            // console.log(data);
            res.json(data);
        })
});

app.post("/api/signout", (req, res) => {
    res.json({
        signout: true,
    });
});

app.post("/api/deleteActivity", (req, res) => {
    // console.log(req.body, "delete acti req.body");
    db.deleteActivity(req.body.activityId)
        .then(result => {
            // console.log("deletion result", result);
            res.json(result)
        }).catch(err => console.error);
});

app.post("/api/deleteTrip", (req, res) => {
    // console.log("deletetrip req.body", req.body);
    db.deleteTrip(req.body.tripId)
        .then(result => {
            // console.log("deletion result", result);
            res.json(result)
        }).catch(err => console.error);
});

app.post("/api/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.checkUserExistenceByUsername(username)
        .then(result => {
            // console.log(result, "result1");
            if (result && result.exists) {
                db.validateExistingUserPassword(result.user_id, username, password)
                    .then(result => {
                        if (result) {
                            // result["token"] = "a token";
                            // res.json(result);
                            return result;
                        } else {
                            // incorrect password, no?
                            res.json({
                                error: "Username does not exist."
                            });
                        }
                    }).then(userExistsObject => {
                        // console.log(result, "resultypoo");
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
                // return false;
            }
        }).catch(error => console.error);

});

app.post("/api/createnewuser", (req, res) => {

    db.createNewUser(req.body.username, req.body.password)
        .then(result => {
            // console.log(JSON.stringify(result) + "result");
            // result["usernameAvailable"] = true,
            // console.log(result);
            res.json(result);
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

app.post("/api/newActivity", (req, res) => {
    // console.log("req.body new activity",req.body);
    activityDetails = req.body.activityDetails;
    // console.log("activityDet keys", Object.keys(activityDetails));
    tripDetails = activityDetails.currentTrip;
    // console.log(tripDetails);
    const {
        title,
        description,
        location,
        startDate,
        endDate,
        cost,
    } = activityDetails;
    const {
        trip_id,
    } = tripDetails;
    // const trip_id = 1;
    // const cost = 50;
    // const location = "home";
    const contactId = 1;
    const categoryId = 1;
    
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
        // console.log("result",result);
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