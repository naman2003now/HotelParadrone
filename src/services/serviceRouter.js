const router = require("express").Router();
const {
	getServices,
	createService,
	deleteService,
} = require("./serviceController.js");

router.get("/", (req, res) => {
	getServices()
		.then((services) => {
			res.status(200).json(services);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post("/create", (req, res) => {
	createService(req.body)
		.then((service) => {
			res.status(201).json(service);
		})
		.catch((err) => {
			res.status(406).json(err);
		});
});

router.delete("/delete", (req, res) => {
	deleteService(req.body)
		.then((service) => {
			res.status(200).json(service);
		})
		.catch((err) => {
			res.status(406).json(err);
		});
});

module.exports = router;
