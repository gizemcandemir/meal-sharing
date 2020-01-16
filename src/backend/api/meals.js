const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

// GET
router.get("/", (req, res) => {

	// GET api/meals/ query parameters
	const { maxPrice } = req.query;
	const { availableReservations } = req.query;
	const { title } = req.query;
	const { createdAfter } = req.query;
	const { limit } = req.query;

	// Get meals that has a price smaller than maxPrice
	if (maxPrice) {
		console.log(maxPrice);
		pool.query(
			`SELECT * FROM meals WHERE price <= ${maxPrice}`,
			(error, results, fields) => {
				if (error) {
					return res.send(error);
				}
				res.json(results);
			}
		);

		//Get meals that still has available reservations
	} else if (availableReservations) {
		pool.query(
			`SELECT meals.id AS id, meals.title AS title,
					SUM(reservations.numberOfGuests), 
					meals.maxReservations
					FROM meals 
					JOIN reservations ON reservations.meal_id = meals.id
					WHERE reservations.numberOfGuests < meals.maxReservations
					GROUP BY reservations.meal_id`,
			(error, results, fields) => {
				if (error) {
					return res.send(error);
				}
				res.json(results);
			}
		);

		//Get meals that partially match a title
	} else if (title) {
		const titleFromQuery = title
			.toLowerCase()
			.replace(/"/g, "")
			.trim();
		pool.query(
			`SELECT * FROM meals WHERE title LIKE '%${titleFromQuery}%'`,
			(error, results, fields) => {
				if (error) {
					return res.send(error);
				}
				res.json(results);
			}
		);

		//Get meals that has been created after the date
	} else if (createdAfter) {
		pool.query(
			`SELECT * FROM meals WHERE created_date >= '${createdAfter}'`,
			(error, results, fields) => {
				if (error) {
					return res.send(error);
				}
				res.json(results);
			}
		);

		//Only specific number of meals
	} else if (limit) {
		pool.query(
			`SELECT * FROM meals LIMIT ${limit}`,
			(error, results, fields) => {
				if (error) {
				}
				res.json(results);
			}
		);
	} else {
		pool.query("SELECT * FROM meals", (error, results, fields) => {
			if (error) {
				return res.send(error);
			}
			res.json(results);
		});
	}
});

// POST
router.post("/", (req, res) => {
	const meal = req.body;
	pool.query("INSERT INTO meals SET ?", meal, (error, results, fields) => {
		if (error) {
			return res.send(error);
		}
		res.json(results);
	});
});

// GET by id
router.get("/:id", (req, res) => {
	const { id } = req.params;
	pool.query(`SELECT * FROM meals WHERE id = ${id}`, function(
		error,
		results,
		fields
	) {
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
		"UPDATE meals SET title=?, description=?,price=? where id=?",
		[req.body.title, req.body.description, req.body.price, idFromQuery],
		function(error, results, fields) {
			if (error) {
				return res.send(error);
			}
			res.send(`Meal with id ${idFromQuery} is updated`);
		}
	);
});

// DELETE
router.put("/:id", (req, res) => {
	const idFromQuery = req.params.id;
	pool.query(`DELETE FROM meals WHERE id = ${id}`, function(
		error,
		results,
		fields
	) {
		if (error) {
			return res.send(error);
		}
		res.send(`Meal with id ${idFromQuery} is deleted`);
	});
});

module.exports = router;
