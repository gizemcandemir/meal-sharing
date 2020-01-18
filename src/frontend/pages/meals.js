import { fetchMeals } from "../helpers/helper";

// document.body.innerHTML = "<h1>Meal Sharing Website</h1>";

function allMealsRouter(req, router) {
  fetchMeals();
}

export default allMealsRouter;
