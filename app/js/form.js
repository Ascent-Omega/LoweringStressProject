function getData() {
	var beginning_dest 	= $('input#beginning_destination').val();
	var ending_dest		= $('input#ending_destination').val();
}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: -34.397, lng: 150.644},
	zoom: 8
  });
}
