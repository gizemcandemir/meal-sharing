import { renderNavbar, renderFooter } from "../helpers/helper";

function requestReservation(data) {
	fetch("/api/reservations/", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}).then(res => {
		if (res.status != 201) {
			alert("Something went wrong, please try again");
		} else {
			alert("Your reservation has been submitted!");
		}
	});
}

function fetchMealById(req) {
	const id = req.param.id;
	fetch(`/api/meals/${id}`)
		.then(res => res.json())
		.then(meal => {
			renderSingleMeal(meal);
			renderFooter();

			const name = document.getElementById("name").value;
			const phone = document.getElementById("phone").value;
			const email = document.getElementById("email").value;
			const mealId = req.param.id;
			const data = { name, phone, email, mealId };

			document.querySelector("form").addEventListener("submit", function() {
				requestReservation(data);
			});
		}, false);
}

function renderSingleMeal(meal) {
	const hr = document.createElement("hr");
	document.body.appendChild(hr);
	const card = document.createElement("div");
	card.classList.add("single-meal");
	card.classList.add("card");
	card.innerHTML = `
		<div>
			<img src="../../public/img/anna-pelzer-IGfIGP5ONV0-unsplash.jpg" alt="Menu">
		</div>
		<div class="card-description">
			<h3>${meal[0].title}</h3>
			<p>${meal[0].description}</p>
			<ul>
				<li>Price: ${meal[0].price} kr.</li>
				<li>Location: ${meal[0].location}</li>
				<li>Max. Guests: ${meal[0].max_guests}</li>
			</ul>
		</div>
    <form method="post" class="reservation-form" action="api/reservations">
      <div class="reservation-form">
				<label for="name">Enter your name </label>
				<input type="name" name="name" id="name" value="Gizem Candemir" required>
      </div>
      <div class="reservation-form">
	      <label for="number">Enter your phone: </label>
	      <input type="phone" name="phone" id="phone" value="53906106" required>
      </div>
			<div class="reservation-form">
				<label for="email">Enter your email: </label>
				<input type="email" name="email" id="email" value="gizemc@gmail.com" required>
			</div>
			<div class="reservation-form">
				<input type="submit" value="Request reservation">
			</div>
		</form>
		`;
	document.body.appendChild(card);
}

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

export default reservationsRouter;
