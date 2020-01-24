import { renderNavbar, fetchMealById } from "../helpers/helper";

function mealRouter(req, router) {
  renderNavbar();
  const section = document.createElement("div");
	section.innerHTML = `
		<div class="section single-meal">
      <p>Details of the chosen meal</p>
		</div>
  `;
	document.body.appendChild(section);
  fetchMealById(req);
}

export default mealRouter;
