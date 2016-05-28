var totalMiles = 0;
var goHere;

function getData() {
	showConfirm();
	
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
// function getDistance(beginning_dest_loc, ending_dest_loc) {
// var url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + beginning_dest_loc.lat + "," + beginning_dest_loc.lng + "&destinations=" + ending_dest_loc.lat + "," + ending_dest_loc.lng;
// // console.log(url);
// var results;
// $.ajax({
//  type: "GET",
//  url: url,
//  async: false,
//  success: function(data){
// 	 console.log(data);
// 	//  results = data;
// 	//  results = data.results[0].geometry.location;
// }
// });	
// return results;
// }

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

	 // Set destination, origin and travel mode.
	 var request = {
	   destination: ending_dest_loc, //indianapolis
	   origin: beginning_dest_loc, // chicago
	   travelMode: google.maps.TravelMode.DRIVING
	 };

	 // Pass the directions request to the directions service.
	 var directionsService = new google.maps.DirectionsService();
	//  console.log(map);
	 directionsService.route(request, function(response, status) {
	   if (status == google.maps.DirectionsStatus.OK) {
	     // Display the route on the map.
	     directionsDisplay.setDirections(response);
			computeTotalDistance(directionsDisplay.getDirections());
			 console.log(directionsService);
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
	
	goHere = window.location.href + "select?miles=" + sendMiles;
	//window.location.href = "/select?miles=" + sendMiles;
	//console.log("gohere is --" + goHere);
	submitButton();
	//asyncGetReq(goHere);
	
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

function submitButton() {
	
        location.href = goHere;
};