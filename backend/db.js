const pgp = require('pg-promise')();
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const db = pgp(cn);

const config = {
    password: process.env.ENCRYPT_PASSWORD,
    salt: process.env.ENCRYPT_SALT,
};
const simplecrypt = require("simplecrypt");
const sc = simplecrypt(config);

function getAllTripsByUser(user_id) {
    return db.any("SELECT * FROM trips WHERE user_id = $1;", [user_id]);
}

function getOneTrip(trip_id) {
    return db.oneOrNone("SELECT * FROM trips WHERE trip_id = $1;", [trip_id]);
}

function getTripCost(trip_id) {
    return db.one("SELECT SUM(cost) FROM trip_activities WHERE trip_id = $1;", [trip_id]);
}

function getTripDetails(trip_id) {
    return db.any("SELECT * FROM trip_activities WHERE trip_id = $1;", [trip_id]);
}

function validateExistingUserPassword(user_id, username, password) {

    return getPassword(user_id)
        .then(result => {

            let decrypted = sc.decrypt(result.password);
            if (decrypted === password) {
                return db.oneOrNone("SELECT user_id, (COUNT(user_id) = 1) AS exists FROM users WHERE username = $1 GROUP BY user_id;", [username]);
            } else {
                return false;
            }
        })
        .catch(error => console.error);
}

function getPassword(user_id) {
    return db.one("SELECT password FROM users WHERE user_id = $1", [user_id]);
};

function checkUserExistenceByUsername(username) {
    return db.oneOrNone("SELECT user_id, COUNT(user_id) = 1 AS exists FROM users WHERE username ILIKE $1 GROUP BY user_id", [username]);
}

function createNewUser(username, password) {

    let encryptedPassword = sc.encrypt(password);

    return checkUserExistenceByUsername(username)
        .then(result => {
            if (result) {
                return {
                    usernameAvailable: false,
                };
            } else {
                const isValid = validateUsername(username);
                if (!isValid) {
                    return {
                        usernameAvailable: false,
                    };
                } else {
                    return addUserToDatabase(username, encryptedPassword);
                }
            }
        })
}

function validateUsername(username) {
    const letters = /^[0-9a-zA-Z]+$/;
    if (username.match(letters)) {
        return true;
    } else {
        return false;
    }
}

function addUserToDatabase(username, password) {
    return db.one("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id", [username, password]);
}

function addTrip(userId, title, description, startDate, endDate) {
    return db.one("INSERT INTO trips (user_id, title, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING trip_id", [userId, title, description, startDate, endDate]);
}

function editTrip(tripId, title, description, startDate, endDate) {
    return db.one("UPDATE trips SET \
    title = $2, description = $3, start_date = $4, end_date = $5 \
    WHERE trip_id = $1 \
    RETURNING true", [tripId, title, description, startDate, endDate]);
}

function addActivity(title, description, cost, location, trip_id, startDate, endDate, contact_id, category_id) {
    return db.one("INSERT INTO trip_activities (title, description, cost, location, trip_id, start_date, end_date, contact_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING activity_id", [title, description, cost, location, trip_id, startDate, endDate, contact_id, category_id]);
}

function editActivity(title, description, cost, location, startDate, endDate, contact_id, category_id, activityId) {
    return db.one("UPDATE trip_activities SET \
    title = $1, description = $2, cost = $3, location = $4, \
    start_date = $5, end_date = $6, contact_id = $7, category_id = $8 \
    WHERE activity_id = $9 \
    RETURNING activity_id", [title, description, cost, location, startDate, endDate, contact_id, category_id, activityId]);
}

function deleteActivity(activityId) {
    return db.one("DELETE FROM trip_activities WHERE activity_id = $1 RETURNING activity_id", [activityId]);
}

function deleteTrip(tripId) {
    return db.one("DELETE FROM trips WHERE trip_id = $1 RETURNING trip_id", [tripId]);
}

function getCategories() {
    return db.any("SELECT * FROM categories;");
}

module.exports = {
    getOneTrip,
    getTripCost,
    getTripDetails,
    validateExistingUserPassword,
    checkUserExistenceByUsername,
    getAllTripsByUser,
    createNewUser,
    addTrip,
    editTrip,
    addActivity,
    editActivity,
    deleteActivity,
    deleteTrip,
    getCategories,
};