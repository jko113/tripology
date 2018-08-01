const pgp = require('pg-promise')();
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const db = pgp(cn);

function getAllTrips() {
    return db.any("SELECT * FROM trips;");
}

function getAllTripsByUser(user_id) {
    return db.any("SELECT * FROM trips WHERE user_id = $1;", [user_id]);
}

function getOneTrip(trip_id) {
    return db.oneOrNone("SELECT * FROM trips WHERE trip_id = $1;", [trip_id]);
}

function getTripDetails(trip_id) {
    return db.any("SELECT * FROM trip_activities WHERE trip_id = $1;", [trip_id]);
}

function checkUserExistence(username, password) {
    return db.oneOrNone("SELECT user_id, (COUNT(user_id) = 1) AS exists FROM users WHERE username = $1 AND password = $2 GROUP BY user_id;", [username, password]);
}

function checkUserExistenceByUsername(username) {
    return db.oneOrNone("SELECT COUNT(user_id) = 1 AS exists FROM users WHERE username ILIKE $1;", [username]);
}

function createNewUser(username, password) {
    return checkUserExistenceByUsername(username)
        .then(result => {
            const isValid = validateUsername(username);
            console.log(isValid);
            const alreadyExists = result.exists;
            
            if (alreadyExists || !isValid) {
                console.log("already exists",isValid);
                return {
                    usernameAvailable: false,
                };
            } else {
                // return {
                //     usernameAvailable: true,
                // };
                return addUserToDatabase(username, password);
            }
        })
}

function validateUsername(username) {
    console.log("calling validate");
    const letters = /^[0-9a-zA-Z]+$/;
    if (username.match(letters)) {
        console.log("accepted");
        // alert('Your registration number have accepted : you can try another');
        return true;
    } else {
        console.log("not accepted");
// alert('Please input alphanumeric characters only');
        return false;
    }
}

function addUserToDatabase(username, password) {
    return db.one("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id", [username, password]);
}

module.exports = {
    getAllTrips,
    getOneTrip,
    getTripDetails,
    checkUserExistence,
    getAllTripsByUser,
    createNewUser,
};