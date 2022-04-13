const pool = require("../db");

const getRooms = (req, res) => {
    pool.query("SELECT * FROM rooms", (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createRoom = (req, res) => {
    pool.query(
        "INSERT INTO rooms (number, prise, advanced, type) VALUES ($1, $2, $3, $4)",
        [req.body.number, req.body.prise, req.body.advanced, req.body.type],
        (err, results) => {
            if (err) {
                res.status(406).json(err);
            } else {
                res.status(201).json({ code: "201", detail: "Room created" });
            }
        }
    );
};

module.exports = { getRooms, createRoom };
