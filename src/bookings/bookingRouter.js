const Router = require("express").Router;
const {
    getBookings,
    createBooking,
    cancelBooking,
} = require("./bookingController");
const router = Router();

router.get("/", (req, res) => {
    getBookings()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/create", (req, res) => {
    createBooking(req.body)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(406).json(err);
        });
});

router.delete("/cancel", (req, res) => {
    cancelBooking(req.body.booking_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(406).json(err);
        });
});

module.exports = router;
