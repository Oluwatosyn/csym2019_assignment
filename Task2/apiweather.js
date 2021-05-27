
$(document).ready(function () {
	let apiKey = 'ce7b672af0382b6a9b6c535ca2be9a81';
	let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

	let tableHeader = "<table><tr>";
	tableHeader += "<th>City Name</th>";
	tableHeader += "<th>Date</th>";
	tableHeader += "<th>Weather Conditions</th>";
	tableHeader += "<th>Temperature </th>";
	tableHeader += "<th>Wind Speed</th>";
	tableHeader += "<th>Wind Direction</th>";
	tableHeader += "<th>Warnings</th>";
	tableHeader += "<th>Weather Icon</th>";
	tableHeader += "</tr>";

	let tableRow = '';

	$("#countries").change(function () {
		let country = $(this).val();
		$("#citiesinfo").hide();

		if (country == "none") {
			$("#cities").load('');
		}

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


		$("#cities").change(function () {
			var city = $(this).val();
			console.log(city);

			let dynamicAPIUrl = apiUrl + city + '&appid=' + apiKey + '&units=imperial&country=GB';

			$.ajax({
				url: dynamicAPIUrl,
				type: "GET",
				dataType: "json",
				success: function (response) {
					console.log(response);
					tableRow = '';
					let currentDatetime = new Date();
					let date = currentDatetime.getDate() + "-" + (currentDatetime.getMonth() + 1) + "-" + currentDatetime.getFullYear();

					tableRow += "<tr>";
					tableRow += "<td>" + response.name + "</td>";
					tableRow += "<td>" + date + "</td>";
					tableRow += "<td>" + response.weather[0].description + "</td>";
					tableRow += "<td>" + farToCelc(response.main.temp) + "°C | " + response.main.temp + "°F" + "</td>";
					tableRow += "<td>" + response.wind.speed + "mph | " + mphTokmph(response.wind.speed) + "kmph" + "</td>";
					tableRow += "<td>" + response.wind.deg + "°" + degToCard(response.wind.deg) + "</td>";
					tableRow += "<td>" + severWeatherCheck(farToCelc(response.main.temp), response.wind.speed) + "</td>";
					tableRow += "<td>" + ResolveWeatherIcon(response.weather[0].icon, response.weather[0].description) + "</td>";
					tableRow += "</tr>";


					$("#citiesinfo").show();


					function ResolveWeatherIcon(iconID, description) {
						let iconPath = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

						return "<img src=\"" + iconPath + "\"alt=\"" + description + "\">";

					}

					function severWeatherCheck(temp, speed) {
						var warning = "Nice";
						var tempC = temp;
						if (tempC > 35) {
							warning = "Severely HOT";
						}
						if (tempC < -5) {
							warning = "Severe COLD";
						}
						if (speed > 50) {
							warning = "Severe WINDY";
						}

						return warning;
					}


					function farToCelc(fahrenheit) {
						var result = 0;
						result = ((fahrenheit - 32) * 5 / 9);
						return +(Math.round(result + "e+2") + "e-2");

					}

					function mphTokmph(mph) {
						var result = (mph * 1.609344);
						return +(Math.round(result + "e+2") + "e-2");
					}

					/*********************************************************************
					Javascript function to convert wind direction in degrees to cardinal.
					felipeskroski/degToCard.js
					https://gist.github.com/felipeskroski/8aec22f01dabdbf8fb6b
					************************************************************************/
					function degToCard(deg) {
						if (deg > 11.25 && deg <= 33.75) {
							return "NNE";
						}
						else if (deg > 33.75 && deg <= 56.25) {
							return "ENE";
						}
						else if (deg > 56.25 && deg <= 78.75) {
							return "E";
						}
						else if (deg > 78.75 && deg <= 101.25) {
							return "ESE";
						}
						else if (deg > 101.25 && deg <= 123.75) {
							return "ESE";
						}
						else if (deg > 123.75 && deg <= 146.25) {
							return "SE";
						}
						else if (deg > 146.25 && deg <= 168.75) {
							return "SSE";
						}
						else if (deg > 168.75 && deg <= 191.25) {
							return "S";
						}
						else if (deg > 191.25 && deg <= 213.75) {
							return "SSW";
						}
						else if (deg > 213.75 && deg <= 236.25) {
							return "SW";
						}
						else if (deg > 236.25 && deg <= 258.75) {
							return "WSW";
						}
						else if (deg > 258.75 && deg <= 281.25) {
							return "W";
						}
						else if (deg > 281.25 && deg <= 303.75) {
							return "WNW";
						}
						else if (deg > 303.75 && deg <= 326.25) {
							return "NW";
						}
						else if (deg > 326.25 && deg <= 348.75) {
							return "NNW";
						}
						else
							return "N";
					}


					$("#citiesinfo").empty('');
					$("#citiesinfo").append(tableHeader + tableRow);


					$("#citiesinfo").css({
						"border-color": "cadetblue",
						"background-color": "#fffff",
						"border-weight": "1px",
						"border-style": "solid",
						"margin": "1rem auto",
						"width": "60%",
						"padding": "0.25rem"
					});
				},

				error: function (xhr, error) {
					$("#info").append(error.toUpperCase() + ". HTTP status: " + xhr.status);
				}
			});
		});
	});
});



