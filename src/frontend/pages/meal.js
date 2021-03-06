import { renderNavbar, renderFooter } from "../helpers/helper";

function requestReservation(data) {
	fetch("api/reservations", {
		method: "POST",
		headers: {
      "Content-Type": "application/json"
    },
		body: JSON.stringify(data)
	}).then(res => {
		if (res.status != 200) {
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
      document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mealId = req.param.id;
        const data = { name, email, mealId };
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
    <form method="post" class="reservation-form">
      <div class="reservation-form">
				<label for="name">Enter your name </label>
				<input type="name" name="name" id="name" required>
      </div>
			<div class="reservation-form">
				<label for="email">Enter your email: </label>
				<input type="email" name="email" id="email" required>
			</div>
			<div class="reservation-form">
				<input type="submit" class="submit" value="Request reservation">
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

export { mealRouter as default, requestReservation };
