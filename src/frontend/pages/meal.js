import { fetchMealById } from "../helpers/helper";

function mealsId(req, router) {
  fetchMealById(req);
}

export default mealsId;
