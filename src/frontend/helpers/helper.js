function renderHeader() {
	const header = document.createElement("div");
	header.className = "header";
	header.innerHTML = `
		<div class="header">
			<h1>Meal Sharing</h1>
			<img src="../../public/img/stefan-vladimirov-Q_Moi2xjieU-unsplash.jpg" alt="Healthy Food">
		</div>
	`;
	document.body.appendChild(header);
}

function fetchMeals() {
	fetch("/api/meals")
		.then(res => res.json())
		.then(meals => {
			renderMeals(meals);
			renderFooter();
		});
}

function renderMeals(meals) {
	const mealList = document.createElement("ul");
	mealList.classList.add("meal");

	meals.forEach(meal => {
		const mealItem = document.createElement("li");
		mealItem.classList.add("meal");

		mealItem.innerHTML = `
			<div class="meal-item" onclick="fetchMealById(${meal.id})">
				<img src="../../public/img/anna-pelzer-IGfIGP5ONV0-unsplash.jpg" alt="Menu">
					<h3>${meal.title}</h3>
					<p>${meal.description}, </br> only for ${meal.price} kr.</p>	
			</div>
		`;
		mealItem.classList.add = "meal";
		mealList.appendChild(mealItem);
	});
	document.body.appendChild(mealList);
}

function fetchMealById(req) {
	const id = req.param.id;
	fetch(`/api/meals/${id}`)
		.then(res => res.json())
		.then(meal => {
			const mealP = document.createElement("p");
			mealP.innerText = meal[0].title;
			mealP.classList.add = "meal";
			document.body.appendChild(mealP);
		});
}

function renderFooter() {
	const footer = document.createElement("footer");
	footer.innerHTML = `
		<footer class="footer">
			<div class="col">
				<h3>EXPLORE</h3>
				<ul>
					<li><a href="#">How it works</a></li>
					<li><a href="#">Why Host?</a></li>
					<li><a href="#">Become a Host</a></li>
					<li><a href="#">Trust & Safety</a></li>
					<li><a href="#">Help Center</a></li>
				</ul>
			</div>

			<div class="col">
				<h3>COMPANY</h3>
				<ul>
					<li><a href="#">About</a></li>
					<li><a href="#">Team</a></li>
					<li><a href="#">Press</a></li>
					<li><a href="#">Contact</a></li>
					<li><a href="#">Blog</a></li>
					<li><a href="#">Terms & Privacy</a></li>
				</ul>
			</div>

			<div class="col">
				<h3>FOLLOW US</h3>
				<ul>
					<li class="social"><a href="#"><i class="fab fa-facebook-square"></i></a></li>
					<li class="social"><a href="#"><i class="fab fa-twitter"></i></a></li>
					<li class="social"><a href="#"><i class="fab fa-instagram"></i></a></li>
					<li class="social"><a href="#"><i class="fab fa-youtube"></i></a></li>
					
				</ul>
			</div>
		</footer>
	`;
	document.body.appendChild(footer);
}

export { renderHeader, renderFooter, fetchMeals, fetchMealById };
