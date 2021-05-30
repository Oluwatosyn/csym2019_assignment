//   the ready method make the callback function available after the document is loaded
$(document).ready(function() {

	(function updateWeather() { //it self execute the updateWeather function without being explicitly called
		setTimeout(function() { // create a setTimeout function by passing the callback function as a parameter. Inside this function is the ajax code
			$.ajax({     // an ajax request that takes a configuration object required to complete an Ajax request.
				url: "weather.json",
				type: "GET",
				dataType: "json",
				success: function(response) { //A callback function to run if the Ajax request is successful. The function returns the data as a parameter.
					let txt = ""; // Initialse variable txt
					txt += "<tr>"; //set variable txt to hold the html table row tag
					txt += "<th>City ID</th>";
					txt += "<th>City Name</th>";
					txt += "<th>Current Condition</th>";
					txt += "<th>Temperature</th>";
					txt += "<th>Wind Speed</th>";
					txt += "<th>Wind Direction</th>";
					txt += "<th>Wind ChillFactor</th>";
					txt += "<th>Weather Icon</th>";
					txt += "</tr>";

					/* when the JSON data is called it iterates over the DOM element that are part of JQuery object, the callback takes index, 
					the index is use to iterate through the returned json data and display it.*/
					$.each(response.cities, function(i) {
						txt += "<tr>";
						txt += "<td>" + response.cities[i].weather[0].id + "</td>";
						txt += "<td>" + response.cities[i].name + "</td>";
						txt += "<td>" + response.cities[i].weather[0].description + "</td>";
						txt += "<td>" + response.cities[i].main.temp + "</td>";
						txt += "<td>" + response.cities[i].wind.speed + "</td>";
						txt += "<td>" + response.cities[i].wind.dir + "</td>";
						txt += "<td>" + response.cities[i].wind.chillfactor + "</td>";
						if (response.cities[i].weather[0].description == "broken clouds") {
							txt += "<td><img src=\"weather_icons/cloud.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else if (response.cities[i].weather[0].description == "Sunny Day") {
							txt += "<td><img src=\"weather_icons/sun.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else if (response.cities[i].weather[0].description == "cloud") {
							txt += "<td><img src=\"weather_icons/cloud.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else if (response.cities[i].weather[0].description == "snow") {
							txt += "<td><img src=\"weather_icons/snow.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else if (response.cities[i].weather[0].description == "Hail") {
							txt += "<td><img src=\"weather_icons/hail.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else if (response.cities[i].weather[0].description == "heavy clouds") {
							txt += "<td><img src=\"weather_icons/heavy cloud.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else if (response.cities[i].weather[0].description == "Sleet") {
							txt += "<td><img src=\"weather_icons/sleet.png\" alt=\"" + response.cities[i].weather[0].description + "\" class = \"iconSize\"></td>";
						} else {
							txt += "<td><img src=\"weathesr_icons/sun.png\"></td>";
						}
						txt += "</tr>";
					});

					 $("#weatherlist").empty(); // set the weatherlist empty
					$("#weatherlist").append(txt); //insert the required content of the variable 'txt' to table weatherlist
				    updateWeather(); // update after previous update have been completed
				},
				error: function() { //the error function runs if the Ajax is not successful
					$("#info").html("<p>An error has occurred</p>");
				}
			});
		}, 3000); // the callback function was set to execute  every 3000 milliseconds
	})();

});