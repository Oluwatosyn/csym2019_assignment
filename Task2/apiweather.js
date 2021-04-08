let apiKey = 'ce7b672af0382b6a9b6c535ca2be9a81'
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let englandInfo = "";
let nirelandInfo ="";
let scotlandInfo ="";
let walesInfo = "";
let txt = "";

$(document).ready(function() {
    $("#england-cities").load("england-cities.html"); 
    $("#england-cities").change(function() {
        
    englandInfo = $(this).val();
    apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + englandInfo +  '&appid=' + apiKey ;  
        
		ajaxLoad();

        
			
 });	
});

$(document).ready(function() {
    $("#nireland-cities").load("nireland-cities.html"); 
    $("#nireland-cities").change(function() {
        
        nirelandInfo = $(this).val();
    apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + nirelandInfo +  '&appid=' + apiKey ;  
        
		ajaxLoad();

        
			
 });	
});

$(document).ready(function() {
    $("#scotland-cities").load("scotland-cities.html"); 
    $("#scotland-cities").change(function() {
        
        scotlandInfo = $(this).val();
    apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + scotlandInfo +  '&appid=' + apiKey ;  
        
		ajaxLoad();

        
			
 });	
});

$(document).ready(function() {
    $("#wales-cities").load("wales-cities.html"); 
    $("#wales-cities").change(function() {
        
        walesInfo = $(this).val();
    apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + walesInfo +  '&appid=' + apiKey ;  
        
		ajaxLoad();

        
			
 });	
});

function ajaxLoad(){
$.ajax( {
           url: apiUrl,
           type: "GET",
           dataType: "json", 
           success: function(response){
               console.log(response);
               let txt = "";

               txt += "<table><tr>"
           txt += "<th>City Name</th>"
           txt += "<th>Date</th>"
           txt += "<th>Weather Conditions</th>"
           txt += "<th>Temperature</th>"
           txt += "<th>Wind Speed</th>"
           txt += "<th>Wind Direction</th>"
           txt += "<th>Weather Icon</th>"
           txt += "</tr>";

           txt += "<tr>"
					
			txt += "<td>" + response.name + "</td>"
            txt += "<td>" + response.date+ "</td>"
            txt += "<td>" + response.weather[0].description + "</td>"
			txt += "<td>" + response.main.temp + "</td>"
			txt += "<td>" + response.wind.speed + "</td>"
			txt += "<td>" + response.wind.dir + "</td>"
		

            $.each(response.weather, function() {  
        
             let iconID = response.weather[0].icon 
             let iconPath  = "http://openweathermap.org/img/wn/"+ iconID +"@2x.png"
             //console.log(iconPath);

             txt += "<td><img src=\""+ iconPath + "\"alt=\""+response.weather[0].description+"\"></td>"
			
			txt += "</tr></table>"
            });

            $("#englandinfo").html("");					
			$("#englandinfo").append(txt);
			if ($("#englandinfo").attr("hidden")) {
				$("#englandinfo").show();	
			}
			
			$("#englandinfo").css(
			{	
				"border-color": "#C1E0FF", 
				"border-weight":"1px", 
				"border-style":"solid",
				"margin-top":"1rem",
				"width":"50%",
				"padding":"0.5rem"
			});


            $.each(response.weather, function() {  
        
                let iconID = response.weather[0].icon 
                let iconPath  = "http://openweathermap.org/img/wn/"+ iconID +"@2x.png"
                //console.log(iconPath);
            
                txt += "<td><img src=\""+ iconPath + "\"alt=\""+response.weather[0].description+"\"></td>"
               
               txt += "</tr></table>"
               });
            
               $("#nirelandInfo").html("");					
               $("#nirelandInfo").append(txt);
               if ($("#nirelandInfo").attr("hidden")) {
                   $("#enirelandInfo").show();	
               }
               
               $("#nirelandInfo").css(
               {	
                   "border-color": "#C1E0FF", 
                   "border-weight":"1px", 
                   "border-style":"solid",
                   "margin-top":"1rem",
                   "width":"50%",
                   "padding":"0.5rem"
               });


               $.each(response.weather, function() {  
        
                let iconID = response.weather[0].icon 
                let iconPath  = "http://openweathermap.org/img/wn/"+ iconID +"@2x.png"
                //console.log(iconPath);
            
                txt += "<td><img src=\""+ iconPath + "\"alt=\""+response.weather[0].description+"\"></td>"
               
               txt += "</tr></table>"
               });
            
               $("#scotlandInfo").html("");					
               $("#scotlandInfo").append(txt);
               if ($("#scotlandInfo").attr("hidden")) {
                   $("#scotlandInfo").show();	
               }
               
               $("#scotlandInfo").css(
               {	
                   "border-color": "#C1E0FF", 
                   "border-weight":"1px", 
                   "border-style":"solid",
                   "margin-top":"1rem",
                   "width":"50%",
                   "padding":"0.5rem"
               });

               $.each(response.weather, function() {  
        
                let iconID = response.weather[0].icon 
                let iconPath  = "http://openweathermap.org/img/wn/"+ iconID +"@2x.png"
                //console.log(iconPath);
            
                txt += "<td><img src=\""+ iconPath + "\"alt=\""+response.weather[0].description+"\"></td>"
               
               txt += "</tr></table>"
               });
            
               $("#walesInfo").html("");					
               $("#walesInfo").append(txt);
               if ($("#walesInfo").attr("hidden")) {
                   $("#walesInfo").show();	
               }
               
               $("#walesInfo").css(
               {	
                   "border-color": "#C1E0FF", 
                   "border-weight":"1px", 
                   "border-style":"solid",
                   "margin-top":"1rem",
                   "width":"50%",
                   "padding":"0.5rem"
               });




               



          
			
			
			
           },	

           error: function(xhr, error, message){
            //   $("#info").append(error.toUpperCase() + ". HTTP status: " + xhr.status);
           }
       });    
	 }