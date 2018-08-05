const pgp = require('pg-promise')();
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const db = pgp(cn);

// function getAllTrips() {
//     return db.any("SELECT * FROM trips;");
// }

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
            // console.log(isValid);
            const alreadyExists = result.exists;
            
            if (alreadyExists || !isValid) {
                // console.log("already exists",isValid);
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
    // console.log("calling validate");
    const letters = /^[0-9a-zA-Z]+$/;
    if (username.match(letters)) {
        // console.log("accepted");
        return true;
    } else {
        // console.log("not accepted");
        return false;
    }
}

function addUserToDatabase(username, password) {
    return db.one("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id", [username, password]);
}

function addTrip(userId, title, description, startDate, endDate) {
    return db.one("INSERT INTO trips (user_id, title, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING trip_id", [userId, title, description, startDate, endDate]);
}

function addActivity(title, description, cost, location, trip_id, startDate, endDate, contact_id, category_id) {
    // console.log("adding activity");
    return db.one("INSERT INTO trip_activities (title, description, cost, location, trip_id, start_date, end_date, contact_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING activity_id", [title, description, cost, location, trip_id, startDate, endDate, contact_id, category_id]);
}

function deleteActivity(activityId) {
    return db.one("DELETE FROM trip_activities WHERE activity_id = $1 RETURNING activity_id", [activityId]);
}

module.exports = {
    // getAllTrips,
    getOneTrip,
    getTripDetails,
    checkUserExistence,
    getAllTripsByUser,
    createNewUser,
    addTrip,
    addActivity,
    deleteActivity,
};