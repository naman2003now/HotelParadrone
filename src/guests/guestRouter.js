const { Router } = require("express");
const { getGuests, createGuest } = require("./guestController.js");
const router = Router();

router.get("/", getGuests);

router.post("/create", createGuest);

module.exports = router;
