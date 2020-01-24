import { renderNavbar, renderMealsHeader, fetchMeals } from "../helpers/helper";

// document.body.innerHTML = "<h1>Meal Sharing Website</h1>";

function allMealsRouter(req, router) {
  renderNavbar();
  renderMealsHeader();
  fetchMeals();
}

export default allMealsRouter;
