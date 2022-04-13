const Router = require("express").Router;
const {
    getRooms,
    createRoom,
    getRoomBookings,
    getRoomStatus,
} = require("./roomController");
const router = Router();

router.get("/", (req, res) => {
    getRooms()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/bookings", (req, res) => {
    getRoomBookings(req.body.room_number)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(406).json(err);
        });
});

router.post("/create", (req, res) => {
    createRoom(req.body)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(406).json(err);
        });
});

router.get("/status", (req, res) => {
    getRoomStatus(req.body.room_number)
        .then((data) => {
            if (data.code === "200") {
                res.status(200).json(data);
            } else {
                res.status(406).json(data);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
