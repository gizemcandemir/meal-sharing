const express = require("express");
const app = express();
const router = express.Router();
const pool = require("../database");
const bodyParser = require ('body-parser');

router.use(bodyParser.json());

// GET
router.get("/", (req, res) => {
	pool.query("SELECT * from reviews", (error, results, fields) => {
		if(error) {
			return res.send(error);
		}
		res.json(results);
	});
});

// POST
router.post("/", (req, res) => {
	const newReview = req.body;

	pool.query("INSERT INTO reviews SET ?", newReview, (error, results, fields) => {
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
	pool.query(`SELECT * FROM reviews WHERE id = ${id}`, (
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
		"UPDATE reviews SET name=?, email=?, mealId=? where id=?",
		[req.body.name, req.body.email, req.body.mealId, idFromQuery],
		(error, results, fields) => {
			if (error) {
				return res.send(error);
			}
			res.send(`Review with id ${idFromQuery} is updated`);
		}
	);
});

// DELETE
router.delete("/:id", (req, res) => {
	const idFromQuery = req.params.id;
	pool.query(`DELETE FROM reviews WHERE id = ${idFromQuery}`, (
		error,
		results,
		fields
	) => {
		if (error) {
			return res.send(error);
		}
		res.send(`Review with id ${idFromQuery} is deleted`);
	});
});

module.exports = router;
