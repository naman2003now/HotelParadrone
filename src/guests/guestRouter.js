const { Router } = require("express");
const {
    getGuests,
    createGuest,
    getGuestBookings,
} = require("./guestController.js");
const router = Router();

router.get("/", (req, res) => {
    getGuests()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/bookings", (req, res) => {
    getGuestBookings(req.body.guest_username)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(406).json(err);
        });
});

router.post("/create", (req, res) => {
    createGuest(req.body)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(406).json(err);
        });
});

module.exports = router;
