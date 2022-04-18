require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");

const {
	getGuests,
	createGuest,
	getGuestBookings,
	guestLogin,
} = require("./guestController.js");

const router = Router();

const authenticateGuest = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
			if (err) {
				next();
			} else {
				req.body.guest_username = username;
				getGuestBookings(req.body.guest_username)
					.then((data) => {
						res.status(201).send(data);
					})
					.catch((err) => {
						res.status(406).send(err);
					});
			}
		});
	} else {
		next();
	}
};

router.get("/", (req, res) => {
	getGuests()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get("/bookings", authenticateGuest, async (req, res) => {
	getGuestBookings(req.body.guest_username)
		.then((data) => {
			console.log(data);
			try {
				res.status(201).send(data);
			} catch (err) {
				console.log(err);
			}
		})
		.catch((err) => {
			res.status(406).send(err);
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

router.post("/login", (req, res) => {
	guestLogin(req.body)
		.then((data) => {
			if (data) {
				console.log(data);
				res.status(200).json({
					guest: data.username,
					token: jwt.sign(data.username, process.env.JWT_SECRET_KEY),
				});
			} else {
				res.status(403).json({
					code: "403",
					message: "Invalid username or password",
				});
			}
		})
		.catch((err) => {
			res.status(401).json({
				code: "401",
				detail: "There was an error logging in",
				err: err,
			});
		});
});

module.exports = router;
