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

app.post("/api/signin", (req, res) => {
    console.log("reqbody: ", req.body);
    const username = req.body.username;
    const password = req.body.password;
    db.checkUserExistence(username, password)
        .then(result => {
            // console.log(typeof result);
            // console.log("result: ", result);
            if (result) {
                result["token"] = "a token";
            }
            res.json(result);
        }).catch(error => {
            console.error(error);
        })
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

    // console.log(title);
    // res.json("got it");

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

    // { tripDetails: 
    //     { title: 'asdf',
    //       description: 'asdf',
    //       startDate: '2018-08-03',
    //       endDate: '2018-08-04',
    //       userInfo: 
    //        { authorizationMode: '',
    //          username: 'ca',
    //          password: '',
    //          authenticated: true,
    //          userId: 3 } } }
});

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`);
});