import { fetchMeals, renderHeader } from "../helpers/helper";

function homeRouter(req, router) {
  renderHeader();
  fetchMeals();  
}

export default homeRouter;
