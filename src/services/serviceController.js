const pool = require("../db");

const getServices = () =>
	new Promise((resolve, reject) => {
		pool.query("SELECT * FROM services", (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.rows);
			}
		});
	});

const createService = (service) =>
	new Promise((resolve, reject) => {
		pool.query(
			"SELECT id FROM employees WHERE role = $1 and status = $2 ORDER BY random() LIMIT 1",
			[service.role, "active"],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					let RandomEmployee = results.rows[0].id;
					console.log(RandomEmployee);
					pool.query(
						"INSERT INTO services (role, guest_username, room_number, description, employee_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
						[
							service.role,
							service.guest_username,
							service.room_number,
							service.description,
							RandomEmployee, // random employee
						],
						(err, results) => {
							if (err) {
								reject(err);
							} else {
								resolve({
									code: "201",
									detail: "Service created",
									service: results.rows,
								});
							}
						}
					);
				}
			}
		);
	});

const deleteService = (service) =>
	new Promise((resolve, reject) => {
		pool.query(
			"DELETE FROM services WHERE id = $1 RETURNING *",
			[service.id],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve({
						code: "200",
						detail: "Service deleted",
						service: results.rows,
					});
				}
			}
		);
	});

module.exports = { createService, getServices, deleteService };
