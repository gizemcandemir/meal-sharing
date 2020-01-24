import { renderNavbar, renderMealsHeader, fetchMeals } from "../helpers/helper";

function allMealsRouter(req, router) {
  renderNavbar();
  renderMealsHeader();
  fetchMeals();
}

export default allMealsRouter;
