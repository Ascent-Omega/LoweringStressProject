document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
	
	populateHotel();
	populateNights();
	
 });

var selectHotel = document.getElementById("selectHotel");
var selectNights = document.getElementById("selectNights");
var calculateBtn = document.getElementById("calcAll");
var totalMiles = 0;
var goHere;
var url = window.location.href;

document.getElementById("cheapChk").addEventListener("click", checkClick);
selectHotel.addEventListener("click", selectClicked);
selectNights.addEventListener("click", selectClicked);



function getData() {
	
	var beginning_dest 	= $('input#beginning_destination').val();
	var ending_dest		= $('input#ending_destination').val();
	var beginning_dest_loc = getLatLong(beginning_dest);
	var ending_dest_loc = getLatLong(ending_dest);
	// console.log(beginning_dest_loc);
	initMap(beginning_dest_loc,ending_dest_loc);
	// getDistance(beginning_dest_loc,ending_dest_loc);
	
}

function showConfirm(){
	
	document.getElementById("confirm").style.display = "";
	
}


function getLatLong(location) {
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDZ0Iz2-uDQLCltYL5zcJYtUsLaSf24wuE";
	var results;
	$.ajax({
   type: "GET",
   url: url,
   async: false,
   success: function(data){
		 results = data.results[0].geometry.location;
	}
	});	
	return results;
}

var map;
function initMap(beginning_dest_loc,ending_dest_loc) {
	 var map = new google.maps.Map(document.getElementById('map'), {
	   center: beginning_dest_loc, // chicago
	   scrollwheel: false,
	   zoom: 7
	 });

	 var directionsDisplay = new google.maps.DirectionsRenderer({
	   map: map
	 });
	
	 var mode = document.querySelector('input[name = "transport"]:checked').value;
	 var pref = document.querySelector('input[name = "preference"]:checked').value;
	 var mass_trans_type = document.querySelector('input[name = "transport"]:checked').id;

	 //var $radio = $('input[name=transport]:checked');
	 //var ids = $radio.attr('id');
	 console.log(mode);	 console.log(pref); console.log(mass_trans_type); 
	 var request;
	 // Set destination, origin and travel mode.
	 if( mode == "TRANSIT"){
		   request = {
		   destination: ending_dest_loc, //indianapolis
		   origin: beginning_dest_loc, // chicago
		   travelMode: google.maps.TravelMode[mode],
		   transitOptions: {
				//departureTime: new Date(1337675679473),
				modes: [google.maps.TransitMode[mass_trans_type]],
				routingPreference: google.maps.TransitRoutePreference[pref]
			},
		 };
	 }
	 else if( mode == "DRIVING")
	 {
		   request = {
		   destination: ending_dest_loc, //indianapolis
		   origin: beginning_dest_loc, // chicago
		   travelMode: google.maps.TravelMode.DRIVING
		};
	 }
	 // Pass the directions request to the directions service.
	 var directionsService = new google.maps.DirectionsService();
	//  console.log(map);
	 directionsService.route(request, function(response, status) {
		 console.log(response.status);

	   if (status == google.maps.DirectionsStatus.OK) {
		showConfirm();
	     // Display the route on the map.

	     directionsDisplay.setDirections(response);
			computeTotalDistance(directionsDisplay.getDirections());
			 console.log(directionsService);
	   }
	   else if (response.status == "ZERO_RESULTS")
	   {
		   document.getElementById("no-results").style.visibility = "visible";
		   document.getElementById("confirm").style.display = "none";
		   document.getElementById('total').innerHTML = "";
	   }
	 });
	 
function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = Math.round(total / 1609.344);
  totalMiles = total;
  document.getElementById('total').innerHTML = total + ' miles.';
	console.log(total);
	
}
 

  // map = new google.maps.Map(document.getElementById('map'), {
	// center: {lat: -34.397, lng: 150.644},
	// zoom: 8
  // });
}

function routePage()
{
	
	var sendMiles = totalMiles;
	//console.log("Miles -? " + sendMiles);
	//console.log(window.location.href);
	var trans_type = document.querySelector('input[name = "transport"]:checked').id;
	var ticketPrice;
	
	if(trans_type == "driving"){
		goHere = window.location.href + "select?miles=" + sendMiles;
		//window.location.href = "/select?miles=" + sendMiles;
		//console.log("gohere is --" + goHere);
		confirmButton();
		//asyncGetReq(goHere);
	}
	else if(trans_type == "BUS")
	{
		document.getElementById("transit-fields").style.display = "";
	}
	else if(trans_type == "TRAIN")
	{
		document.getElementById("transit-fields").style.display = "";
	}
	
	
}

function asyncGetReq(url, res)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() { 
        if (req.readyState == 4 && req.status == 200)
            //res(req.responseText);
		console.log((req.responseText));

    }
    req.open("GET", url, true); // true for asynchronous 
    req.send(null);
}

function confirmButton() {
	
        location.href = goHere;
};

document.getElementById("submit").addEventListener("click",  function(event) {
	
	document.getElementById("no-results").style.visibility = "hidden";

});


$("#TRAIN").click(function(){
    $("#route-pref").show();
	//$("#fewer_transfers").click();
	$("#transit-fields").hide();
	document.getElementById("confirm").style.display = "none";
	clearPrices();
});

$("#BUS").click(function(){
    $("#route-pref").show();
	//$("#fewer_transfers").click();
	$("#transit-fields").hide();
	document.getElementById("confirm").style.display = "none";
	clearPrices();
});

$("#driving").click(function(){
    $("#route-pref").hide();
	$("#transit-fields").hide();
	document.getElementById("confirm").style.display = "none";
	clearPrices();
});

function checkClick(event){
        
	// choose cheapest hotel price
	var totalOptions = selectHotel.getElementsByTagName("option").length;
	//console.log(totalOptions);
	
	var lowestValue = getLowestValue(selectHotel,totalOptions);
	
	selectHotel.value = lowestValue;
	
	// choose cheapest nights(1)
	totalOptions = selectNights.getElementsByTagName("option").length;
	lowestValue = getLowestValue(selectNights,totalOptions);
	selectNights.value = lowestValue;
	
}

function getLowestValue(element, totalOptions){
        
	var lowest = Number(element[1].value);
	
	var x = 15;
	loop();
	function loop() {
		for (x=1; x<= ((Number(totalOptions))-1); x++) {
			
			if((Number(element[x].value)) < lowest){
				lowest = Number(element[x].value);
			}
			//console.log(" running");

		}
	}
	
	return lowest;
}

function selectClicked(){
        // uncheck
        document.getElementById("cheapChk").checked = false;

}

function selectHOption(input){
	

	for(var i = 0; i < input.length; i++) {
    var opt = input[i].name + ", " +
    					input[i].room_price_per_night;
    var hotel = document.createElement("option");
    hotel.textContent = opt;
    hotel.value = input[i].room_price_per_night;
    selectHotel.appendChild(hotel);
	
	
	}
};

function selectNOption(input){
	

	for(var i = 0; i < input.length; i++) {
    var opt = input[i].total_nights;
    var nights = document.createElement("option");
    nights.textContent = opt;
    nights.value = opt;
    selectNights.appendChild(nights);
	
	
	}
};

function populateHotel(){

	var req = new XMLHttpRequest();

	var reqString = url + "selectHotel";

	req.open('GET', reqString, true);
	
	var payload = {};

	req.addEventListener('load',function() {
	if (req.status >= 200 && req.status < 400) {
		var response = JSON.parse(req.responseText);
				
		payload = response;
		
		selectHOption(response);
		
	}else {
			// If a server error was received, post the response text to the log
			console.log("Error in network request: " + req.statusText);
		}
	});
	
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(payload));
 
};


function populateNights(){

	var req = new XMLHttpRequest();

	var reqString = url + "selectNights";

	req.open('GET', reqString, true);
	
	var payload = {};

	req.addEventListener('load',function() {
	if (req.status >= 200 && req.status < 400) {
		var response = JSON.parse(req.responseText);
		
		payload = response;
		
		selectNOption(response);

	}else {
			// If a server error was received, post the response text to the log
			console.log("Error in network request: " + req.statusText);
		}
	});
	
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(payload));

};

function doMath(tickCost){

	var hotelPrice = getValue(selectHotel);
	var totalNights = getValue(selectNights);

	tickCost = +(tickCost).toFixed(2);
	
	var stayPrice = +((hotelPrice * totalNights).toFixed(2));

	var totalPrice = +((tickCost + stayPrice).toFixed(2));
	
	document.getElementById("transPrice").innerHTML = "Transit Price: $" + tickCost;
	document.getElementById("stayPrice").innerHTML = "Hotel Price: $" + stayPrice;
	document.getElementById("totalPrice").innerHTML = "Total: $" + totalPrice;


}

function getValue(element){
	
	// need tests here for 0 values or null values
	//if(element == )
	
	var val = Number(element.options[element.selectedIndex].value);
	console.log(val);
	
	return val;
}

function ticketCost(totalRouteDistance)
{
	var driving_BUS_TRAIN = document.querySelector('input[name = "transport"]:checked').id;
	var ticketCost;
	
	if(driving_BUS_TRAIN == "BUS")
	{
		ticketCost = (getBase2(totalRouteDistance) * 1.25 )* 5.34;
	}
	else if(driving_BUS_TRAIN == "TRAIN")
	{
		ticketCost = (getBase2(totalRouteDistance) * 1.50 )* 6.34;
	}
	
	return ticketCost;
}

function getBase2(y) {
  return Math.log(y) / Math.log(2);
}

calculateBtn.addEventListener('click', function(event){
	
    var driving_BUS_TRAIN = document.querySelector('input[name = "transport"]:checked').id;


	if(driving_BUS_TRAIN == "BUS")
	{
		ticketPrice = ticketCost(totalMiles);
		doMath(ticketPrice);
	}
	else if(driving_BUS_TRAIN == "TRAIN")
	{
		ticketPrice = ticketCost(totalMiles);
		doMath(ticketPrice);
	}	
	//console.log(travelDistance);
});

function clearPrices(){
	
	document.getElementById("transPrice").innerHTML = "";
	document.getElementById("stayPrice").innerHTML = "";
	document.getElementById("totalPrice").innerHTML = "";
}