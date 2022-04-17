const pool = require("../db");

const getEmployees = () =>
	new Promise((resolve, reject) => {
		pool.query("SELECT * FROM employees", (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.rows);
			}
		});
	});

const createEmployee = (employee) =>
	new Promise((resolve, reject) => {
		pool.query(
			"INSERT INTO employees (name, salary, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
			[employee.name, employee.salary, employee.password, employee.role],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve({
						code: "201",
						detail: "Employee created",
						ID: results.rows[0].id,
					});
				}
			}
		);
	});

const updateEmployee = (employee) =>
	new Promise((resolve, reject) => {
		pool.query(
			"UPDATE employees SET name = $1, salary = $2, password = $3, role = $4 WHERE id = $5",
			[
				employee.name,
				employee.salary,
				employee.password,
				employee.role,
				employee.id,
			],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results.rows);
				}
			}
		);
	});

const setEmployeeStatus = (employee) =>
	new Promise((resolve, reject) => {
		console.log(employee);
		pool.query(
			"UPDATE employees SET status = $1 WHERE id = $2 RETURNING *",
			[employee.status, employee.id],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve({ code: "201", employee: results.rows });
				}
			}
		);
	});

const getEmployeeServices = (employee) =>
	new Promise((resolve, reject) => {
		pool.query(
			"SELECT * FROM services WHERE employee_id = $1",
			[employee.id],
			(err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results.rows);
				}
			}
		);
	});

module.exports = {
	getEmployees,
	createEmployee,
	updateEmployee,
	setEmployeeStatus,
	getEmployeeServices,
};
