const pool = require("../db");

const getBookings = () =>
    new Promise((resolve, reject) => {
        pool.query("SELECT * FROM bookings", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        });
    });

const createBooking = (booking) =>
    new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM bookings WHERE (booking_from, booking_to) OVERLAPS ($1, $2)",
            [booking.booking_from, booking.booking_to],
            (err, overlapedBookings) => {
                pool.query(
                    "INSERT INTO bookings (booking_from, booking_to, room_number, guest_username) VALUES ($1, $2, $3, $4)",
                    [
                        booking.booking_from,
                        booking.booking_to,
                        booking.room_number,
                        booking.guest_username,
                    ],
                    (err, results) => {
                        if (err) {
                            reject(err);
                        } else if (overlapedBookings.rows.length > 0) {
                            reject({
                                code: "406",
                                detail: "Booking overlaps with existing booking",
                            });
                        } else {
                            resolve({
                                code: "201",
                                detail: "Booking created",
                            });
                        }
                    }
                );
            }
        );
    });

const cancelBooking = (booking_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "DELETE FROM bookings WHERE id = $1",
            [booking_id],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        code: "200",
                        detail: "Booking cancelled",
                    });
                }
            }
        );
    });
};

module.exports = { getBookings, createBooking, cancelBooking };
