const pool = require("../db");

const getGuests = () =>
    new Promise((resolve, reject) => {
        pool.query("SELECT name, username FROM guests", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        });
    });

const createGuest = (guest) =>
    new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO guests (name, username, password) VALUES ($1, $2, $3)",
            [guest.name, guest.username, guest.password],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ code: "201", detail: "Guest created" });
                }
            }
        );
    });

const getGuestBookings = (guest_username) =>
    new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM bookings WHERE guest_username = $1",
            [guest_username],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.rows);
                }
            }
        );
    });

module.exports = { getGuests, createGuest, getGuestBookings };
