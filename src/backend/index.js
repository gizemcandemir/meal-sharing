const express = require("express");
const app = express();
const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
const router = express.Router();

const port = process.env.PORT || 5000;

const path = require("path"); 
// Serve the built client html
const buildPath = path.join(__dirname, "../../dist");
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);
app.use("/api", router);


app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
