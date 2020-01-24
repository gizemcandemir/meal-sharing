import { fetchMeals, renderHeader, makeClickable } from "../helpers/helper";

function homeRouter(req, router) {
  renderHeader();
  fetchMeals();  
  // makeClickable();
}

export default homeRouter;
