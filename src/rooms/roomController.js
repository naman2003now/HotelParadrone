const pool = require("../db");

const getRooms = () =>
    new Promise((resolve, reject) => {
        pool.query("SELECT * FROM rooms", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        });
    });

const createRoom = (room) =>
    new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO rooms (number, price, advance, type) VALUES ($1, $2, $3, $4)",
            [room.number, room.price, room.advance, room.type],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ code: "201", detail: "Room created" });
                }
            }
        );
    });

const getRoomBookings = (room_number) =>
    new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM bookings WHERE room_number = $1",
            [room_number],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.rows);
                }
            }
        );
    });

const getRoomStatus = (room_number) =>
    new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM bookings WHERE room_number = $1 AND (now() BETWEEN booking_from AND booking_to)",
            [room_number],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.rows.length > 0) {
                        resolve({
                            code: "200",
                            detail: "Room is booked",
                        });
                    } else {
                        resolve({
                            code: "200",
                            detail: "Room is available",
                        });
                    }
                }
            }
        );
    });

module.exports = { getRooms, createRoom, getRoomBookings, getRoomStatus };
