// this is a callback for makeAjaxRequest - i.e. no brackets ().
window.onload = makeAjaxRequest; 

/*
This is a global variable holding the request. It is global because it needs to be accessed 
by the two function that we have in this file.
*/
let xhr = false; 

//Create an XMLHttpRequest Object
function makeAjaxRequest() {
	
	// this code checks if the the browser supports XMLHttpRequests.
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) {
			xhr = newActiveXObject("Microsoft.XMLHTTP");
		}
	}

	// if the request has been created successfully then configure it.
	if (xhr) { // it is successful when if(xhr) is equal to 'true'.
		xhr.open("GET", "weather.json", true);
		xhr.send(); 
		xhr.onreadystatechange = showContents; // the event listener onreadystatechange takes a callback which in this case is the function showContents.
	} else {
		// informting the user that the request creation was not successful.
		document.getElementById("updatemessage").innerHTML = "Could not perform stated Request";
	}	
}


(function updateWeather() {
	setTimeout(function() {
		$.ajax( {
			url:"weather.json",
			type: "GET",
			dataType: "json",
			success: function(response){
				let txt = "";
				$("#weather").html("");
				$.each(response.cities, function(index) {        
					txt += "<tr class='score'><td>" + 
					response.cities[index].weather[0].id  + "</td><td>" + 
					response.cities[index].name + "</td><td>" + 
					response.cities[index].weather[0].description + 
					"</td></tr><tr><td>" + 
					response.cities[index].main.temp  + 
					"</td><td></td><td>" + 
					response.cities[index].wind.speed + 
					"</td></tr><tr><td>" + 
					response.cities[index].wind.dir + 
					"</td></tr><tr><td>" + 
					response.cities[index].wind.chillfactor + 
					" minutes</td><td></td><td></td></tr>";;	
					});
					$("#weather").append(txt);
					updateWeather();
			},	
			error: function() {
				$("#info").html("<p>An error has occurred</p>");
		   }
		});
	}, 500);	
})();
  

function showContents() {
	if (xhr.readyState == 4) {
	    if (xhr.status == 200) {

		    let data = JSON.parse(xhr.responseText); // the variable 'data' holds the data received from the server.
			let txt = ""; // this variable holds the processed data.

			txt += "<tr>"
			txt += "<td>City ID</td>"
			txt += "<td>City Name</td>"
			txt += "<td>Current Condition</td>"
			txt += "<td>Temperature</td>"
			txt += "<td>Wind Speed</td>"
			txt += "<td>Wind Direction</td>"
			txt += "<td>Wind ChillFactor</td>"
            txt += "<td>Weather Icon</td>"
			txt += "</tr>";

            for (let i=0; i < data.cities.length; i++) {
				txt += "<tr>"
				txt += "<td>" + data.cities[i].weather[0].id + "</td>"
				txt += "<td>" + data.cities[i].name + "</td>"
				txt += "<td>" + data.cities[i].weather[0].description + "</td>"
				txt += "<td>" + data.cities[i].main.temp + "</td>"
				txt += "<td>" + data.cities[i].wind.speed + "</td>"
				txt += "<td>" + data.cities[i].wind.dir + "</td>"
				txt += "<td>" + data.cities[i].wind.chillfactor + "</td>"
                if(data.cities[i].weather[0].description =="broken clouds"){
                    txt += "<td><img src=\"weather_icons/cloud.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
                }
				else if (data.cities[i].weather[0].description =="Sunny Day"){
					txt += "<td><img src=\"weather_icons/sun.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
				}
				else if (data.cities[i].weather[0].description =="heavy rain"){
					txt += "<td><img src=\"weather_icons/heavy rain.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
				}
				else if (data.cities[i].weather[0].description =="sun and cloud"){
					txt += "<td><img src=\"weather_icons/sun and cloud.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
				}
				else if (data.cities[i].weather[0].description =="Hail"){
					txt += "<td><img src=\"weather_icons/hail.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
				}
				else if (data.cities[i].weather[0].description =="Mist"){
					txt += "<td><img src=\"weather_icons/mist.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
				}
				else if (data.cities[i].weather[0].description =="Sleet"){
					txt += "<td><img src=\"weather_icons/sleet.png\" alt=\""+data.cities[i].weather[0].description+"\"></td>"
				}
                else{
                    txt += "<td><img src=\"weathesr_icons/sun.png\"></td>"
                }
				txt += "</tr>";
			}


			// we are injecting the processed data into the HTML DOM - the HTML code/markup.
			document.getElementById("citylist").innerHTML = txt;


		} else {
			document.getElementById("updatemessage").innerHTML = "An error occurred: " + xhr.status;
		}
	}
}




         