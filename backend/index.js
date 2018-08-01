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

app.get("/allTrips", (req, res) => {
    db.getAllTrips()
        .then(data => {
            res.json(data);
        })
});

app.get("/allTripsByUser/:id", (req, res) => {
    const userId = req.params.id;
    // console.log(userId);
    db.getAllTripsByUser(userId)
        .then(data => {
            res.json(data);
        })
});

app.get("/trip/:id", (req, res) => {
    db.getOneTrip(req.params.id)
        .then(data => {
            res.json(data);
        })
});

app.get("/tripdetails/:id", (req, res) => {
    db.getTripDetails(req.params.id)
        .then(data => {
            res.json(data);
        })
});

app.post("/signout", (req, res) => {
    res.json({
        signout: true,
    });
});

app.post("/signin", (req, res) => {
    // console.log("reqbody: ", req.body);
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

app.post("/createnewuser", (req, res) => {
    db.createNewUser(req.body.username, req.body.password)
        .then(result => {
            // console.log(JSON.stringify(result) + "result");
            // result["usernameAvailable"] = true,
            // console.log(result);
            res.json(result);
        })
        .catch(error => console.error);
});

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`);
});