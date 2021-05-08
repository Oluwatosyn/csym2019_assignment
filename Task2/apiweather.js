let apiKey = 'ce7b672af0382b6a9b6c535ca2be9a81';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

$(document).ready(function() {
	$("#countries").change(function() {
		let country = $(this).val();

		if (country == "england") {
			$("#cities").load("england-cities.html");

		}
		if (country == "nireland") {
			$("#cities").load("nireland-cities.html");
		}

		if (country == "scotland") {
			$("#cities").load("scotland-cities.html");
		}
		if (country == "wales") {
			$("#cities").load("wales-cities.html");
		}
		$("#cities").change(function() {
			let city = $(this).val();
			apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
			$.ajax({
				url: apiUrl,
				type: "GET",
				dataType: "json",
				success: function(response) {
					console.log(response);
					let txt = "";
					// let info = "";

					txt += "<table><tr>";
					txt += "<th>City Name</th>";
					txt += "<th>Date</th>";
					txt += "<th>Weather Conditions</th>";
					txt += "<th>Temperature</th>";
					txt += "<th>Wind Speed</th>";
					txt += "<th>Wind Direction</th>";
					txt += "<th>Weather Icon</th>";
					txt += "</tr>";

					txt += "<tr>";

					txt += "<td>" + response.name + "</td>";
					txt += "<td>" + response.date + "</td>";
					txt += "<td>" + response.weather[0].description + "</td>";
					txt += "<td>" + response.main.temp + "</td>";
					txt += "<td>" + response.wind.speed + "</td>";
					txt += "<td>" + response.wind.dir + "</td>";


					$.each(response.weather, function() {

						let iconID = response.weather[0].icon;
						let iconPath = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
						//console.log(iconPath);

						txt += "<td><img src=\"" + iconPath + "\"alt=\"" + response.weather[0].description + "\"></td>";

						txt += "</tr></table>";
					});

					$.each(response, function() {
						$("#citiesinfo").html("");
						$("#citiesinfo").append(txt);
						if ($("#citiesinfo").attr("hidden")) {
							$("#citiesinfo").show();
						}

						$("#citiesinfo").css({
							"border-color": "#C1E0FF",
							"border-weight": "1px",
							"border-style": "solid",
							"margin-top": "1rem",
							"width": "50%",
							"padding": "0.5rem"
						});
					});

				},

				error: function(xhr, error) {
					$("#info").append(error.toUpperCase() + ". HTTP status: " + xhr.status);
				}
			});
		});
	});
});