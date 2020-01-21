import { fetchMealById } from "../helpers/helper";

function mealRouter(req, router) {
  fetchMealById(req);
}

export default mealRouter;
