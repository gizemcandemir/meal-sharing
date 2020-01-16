const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../database");
const bodyParser = require ('body-parser');

router.use(bodyParser.json());

// GET
router.get("/", (req, res) => {
	pool.query("SELECT * from reservations", (error, results, fields) => {
		if(error) {
			return res.send(error);
		}
		res.json(results);
	});
});

// POST
router.post("/", (req, res) => {
	const newReservation = req.body;

	pool.query("INSERT INTO reservations SET ?", newReservation, (error, results, fields) => {
		if (error) {
			return res.send(error);
		} else {
			res.json(results);
		}
	});
});

// GET by id
router.get("/:id", (req, res) => {
	const { id } = req.params;
	pool.query(`SELECT * FROM reservations WHERE id = ${id}`, (
		error,
		results,
		fields
	) => {
		if (error) {
			return res.send(error);
		}
		res.json(results);
	});
});

// PUT by id
router.put("/:id", (req, res) => {
	const idFromQuery = req.params.id;
	pool.query(
		"UPDATE reservations SET name=?, email=?, mealId=? where id=?",
		[req.body.name, req.body.email, req.body.mealId, idFromQuery],
		(error, results, fields) => {
			if (error) {
				return res.send(error);
			}
			res.send(`Reservation with id ${idFromQuery} is updated`);
		}
	);
});

// DELETE
router.delete("/:id", (req, res) => {
	const idFromQuery = req.params.id;
	pool.query(`DELETE FROM reservations WHERE id = ${idFromQuery}`, (
		error,
		results,
		fields
	) => {
		if (error) {
			return res.send(error);
		}
		res.send(`Reservation with id ${idFromQuery} is deleted`);
	});
});

module.exports = router;
