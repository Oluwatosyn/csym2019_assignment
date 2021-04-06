$(document).ready(function() {

	(function updateWeather() {
		setTimeout(function() {
			$.ajax( {
				url:"weather.json",
				type: "GET",
				dataType: "json",
				success: function(response){
					let txt = "";
					txt += "<tr>"
				txt += "<th>City ID</th>"
				txt += "<th>City Name</th>"
				txt += "<th>Current Condition</th>"
				txt += "<th>Temperature</th>"
				txt += "<th>Wind Speed</th>"
				txt += "<th>Wind Direction</th>"
				txt += "<th>Wind ChillFactor</th>"
				txt += "<th>Weather Icon</th>"
				txt += "</tr>";
	
					$.each(response.cities, function(i) {        
						txt += "<tr>"
					txt += "<td>" + response.cities[i].weather[0].id + "</td>"
					txt += "<td>" + response.cities[i].name + "</td>"
					txt += "<td>" + response.cities[i].weather[0].description + "</td>"
					txt += "<td>" + response.cities[i].main.temp + "</td>"
					txt += "<td>" + response.cities[i].wind.speed + "</td>"
					txt += "<td>" + response.cities[i].wind.dir + "</td>"
					txt += "<td>" + response.cities[i].wind.chillfactor + "</td>"
					if(response.cities[i].weather[0].description =="broken clouds"){
						txt += "<td><img src=\"weather_icons/cloud.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else if (response.cities[i].weather[0].description =="Sunny Day"){
						txt += "<td><img src=\"weather_icons/sun.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else if (response.cities[i].weather[0].description =="heavy rain"){
						txt += "<td><img src=\"weather_icons/heavy rain.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else if (response.cities[i].weather[0].description =="sun and cloud"){
						txt += "<td><img src=\"weather_icons/sun and cloud.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else if (response.cities[i].weather[0].description =="Hail"){
						txt += "<td><img src=\"weather_icons/hail.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else if (response.cities[i].weather[0].description =="Mist"){
						txt += "<td><img src=\"weather_icons/mist.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else if (response.cities[i].weather[0].description =="Sleet"){
						txt += "<td><img src=\"weather_icons/sleet.png\" alt=\""+response.cities[i].weather[0].description+"\"></td>"
					}
					else{
						txt += "<td><img src=\"weathesr_icons/sun.png\"></td>"
					}
					txt += "</tr>";
						});
	
						$("#weatherlist").append(txt);
						updateWeather()
				},	
				error: function() {
					$("#info").html("<p>An error has occurred</p>");
			   }
			});
		}, 600);	
	})();
		 
	})