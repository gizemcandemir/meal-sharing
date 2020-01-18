import { fetchMeals, renderHeader, renderFooter } from "../helpers/helper";

function homeRouter(req, router) {
  renderHeader();
	fetchMeals();
  renderFooter();
}

export default homeRouter;
