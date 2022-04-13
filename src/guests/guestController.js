const pool = require("../db");

const getGuests = (req, res) => {
    pool.query("SELECT * FROM guests", (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createGuest = (req, res) => {
    pool.query(
        "INSERT INTO guests (name, username, password) VALUES ($1, $2, $3)",
        [req.body.name, req.body.username, req.body.password],
        (err, results) => {
            if (err) {
                res.status(406).json(err);
            } else {
                res.status(201).json({ code: "201", detail: "Guest created" });
            }
        }
    );
};

module.exports = { getGuests, createGuest };
