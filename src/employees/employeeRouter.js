const Router = require("express").Router;
const router = Router();
const {
	getEmployees,
	createEmployee,
	updateEmployee,
	setEmployeeStatus,
	getEmployeeServices,
} = require("./employeeController.js");

router.get("/", (req, res) => {
	getEmployees()
		.then((employees) => {
			res.status(200).json(employees);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get("/services", (req, res) => {
	getEmployeeServices(req.body)
		.then((employees) => {
			res.status(200).json(employees);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post("/create", (req, res) => {
	createEmployee(req.body)
		.then((employee) => {
			res.status(201).json(employee);
		})
		.catch((err) => {
			res.status(406).json(err);
		});
});

router.put("/update", (req, res) => {
	updateEmployee(req.body)
		.then((employee) => {
			res.status(200).json(employee);
		})
		.catch((err) => {
			res.status(406).json(err);
		});
});

router.put("/setStatus", (req, res) => {
	setEmployeeStatus(req.body)
		.then((employee) => {
			res.status(200).json(employee);
		})
		.catch((err) => {
			res.status(406).json(err);
		});
});

module.exports = router;
