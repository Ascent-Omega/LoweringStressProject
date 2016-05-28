function getData() {
	var beginning_dest 	= $('input#beginning_destination').val();
	var ending_dest		= $('input#ending_destination').val();
	var beginning_dest_loc = getLatLong(beginning_dest);
	var ending_dest_loc = getLatLong(ending_dest);
	initMap(beginning_dest_loc,ending_dest_loc);
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
	   }
	 });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = Math.round(total / 1609.344);
  var cost_button = document.getElementById('costs');
  cost_button.value = total;
  cost_button.disabled = false;
}

function routePage() {
	var miles = $('button#costs').val();
	window.location.href = "/select?miles=" + miles;
}
