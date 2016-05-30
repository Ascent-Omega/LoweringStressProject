var url = "http://52.11.246.123:3000";
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
	
	populateHotel();
	populateNights();
	populateVehicle();
	populateGas();
	testNumericalQuery();
	
 });

var selectHotel = document.getElementById("selectHotel");
var selectVehicle = document.getElementById("selectVehicle");
var selectNights = document.getElementById("selectNights");
var selectGas = document.getElementById("selectGas");
var calculateBtn = document.getElementById("calcAll");
var travelDistance = document.getElementById("distanceO").value;
var allowH = true;
var allowN = true;
var allowV = true;
var allowG = true;

document.getElementById("cheapChk").addEventListener("click", checkClick);
selectHotel.addEventListener("click", selectClicked);
selectNights.addEventListener("click", selectClicked);
selectGas.addEventListener("click", selectClicked);

function checkClick(event){
        
	// choose cheapest hotel price
	var totalOptions = selectHotel.getElementsByTagName("option").length;
	//console.log(totalOptions);
	
	var lowestValue = getLowestValue(selectHotel,totalOptions);
	
	//selectHotel.querySelectorAll("option[value=" + lowestValue + "]");
	selectHotel.value = lowestValue;
	document.getElementById('hotel-img').src = hotelUrlMap[lowestValue];	
	
	// choose cheapest nights(1)
	totalOptions = selectNights.getElementsByTagName("option").length;
	lowestValue = getLowestValue(selectNights,totalOptions);
	selectNights.value = lowestValue;
	
	// choose cheapest gas price
	totalOptions = selectGas.getElementsByTagName("option").length;
	lowestValue = getLowestValue(selectGas,totalOptions);
	selectGas.value = lowestValue;
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
	
	//console.log("af8 running");

	//console.log(lowest);
	
	return lowest;
}

function selectClicked(){
        // uncheck
        document.getElementById("cheapChk").checked = false;

}

// verifies whether the options generated the proper values
function executeHTests(){
	
	console.log("Hotel Tests:");
	testHSelectOption(1, 500);
	testHSelectOption(2, 200);
	testHSelectOption(3, 700);
	testHSelectOption(4, 300);
	testHSelectOption(5, 100);
	testHSelectOption(6, 400);
	testHSelectOption(7, 70);
	testHSelectOption(8, 900);
	testHSelectOption(9, 250);
	testHSelectOption(10, 80);
	console.log("Should fail:")
	testHSelectOption(10, 800);


}

function testHSelectOption(optionNumber, expected){
		
	//var selectHotel = document.getElementById("selectHotel");

	//console.log("childs are: " + selectHotel.childnodes.length);
	
	// if element is not found
	if (typeof selectHotel[optionNumber] == 'undefined')
	{ 			
		console.log("Element not found");
		return;
	}
	
	/*
	var x = selectHotel.getElementsByTagName("option").length;
	console.log("total options: " + x);
	*/
	
	var val = selectHotel[optionNumber].value;

	//console.log("value is: " + val); 
	
	if(val == expected)
	{
		console.log("Option " + optionNumber +" test passed!");
	}
	else
	{
		console.log("Option " + optionNumber + " test failed: " + val + " is not " + expected);
	}
	//console.log(selectHotel[0].value);
};

// verifies whether the options generated the proper values
function executeVTests(){
	
	console.log("Vehicle Tests:");
	testVSelectOption(1,"Acura-ILX-2014",33);
	testVSelectOption(2,"Chrysler-300C-2011",34);
	testVSelectOption(3,"Ford-Fusion-2016",37);
	testVSelectOption(4,"BMW-640 Grand Coupe-2017",29);
	testVSelectOption(5,"Cadillac-STS-V-2008",19);
	testVSelectOption(6,"Cadillac-CT6-2016",31);
	testVSelectOption(7,"Dodge-Ram 1500-2010",20);
	testVSelectOption(8,"Buick-LaCrosse-2009",25);
	testVSelectOption(9,"Ford-F-150-2016",23);
	testVSelectOption(10,"Chrysler-200-2015",34);

	console.log("Should fail:")
	testVSelectOption(10,"Chrysler-200-2014",34);
	testVSelectOption(10,"Chrysler-200-2015",33);


}

function testVSelectOption(optionNumber, optionText, expectedValue){
		
	// if not found then end function
	if (typeof selectVehicle[optionNumber] == 'undefined')
	{ 			
		console.log("Element not found");
		return;
	}
	
	var opText = selectVehicle[optionNumber].textContent;
	
	var val = selectVehicle[optionNumber].value;

	//console.log("value is: " + val); 
	
	if((val == expectedValue) && (opText == optionText))
	{
		console.log("Option " + optionNumber +" test passed!");
		return;
	}
	
	if(val != expectedValue)
	{
		console.log("Option " + optionNumber + " test failed: " + val + " is not " + expectedValue);
	}
	
	if((opText != optionText))
	{
		console.log("Option " + optionNumber + " test failed: " + opText + " is not " + optionText);
	}
	
	//console.log(selectHotel[0].value);
};	

function selectHOption(input){
	

	for(var i = 0; i < input.length; i++) {
    var opt = input[i].name + ", " +
    					input[i].room_price_per_night;
    var hotel = document.createElement("option");
    hotel.textContent = opt;
    hotel.value = input[i].room_price_per_night;
	//hotel.name = input[i].name;
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

function selectVOption(input){
	

	for(var i = 0; i < input.length; i++) {
    var opt = input[i].make + "-" +
    					input[i].model + "-" + input[i].year;
    var vehicle = document.createElement("option");
    vehicle.textContent = opt;
    vehicle.value = input[i].miles_per_gallon;
    selectVehicle.appendChild(vehicle);
	
	
	}
};

function selectGOption(input){
	

	for(var i = 0; i < input.length; i++) {
    var opt = input[i].station_name + "-" +
    					input[i].gas_type + "- $" + input[i].price;
    var gas = document.createElement("option");
    gas.textContent = opt;
    gas.value = input[i].price;
    selectGas.appendChild(gas);
	
	
	}
};

//selectHotel.addEventListener('click', function(event){
function populateHotel(){
if(allowH){
	allowH = false;
	var req = new XMLHttpRequest();

	var reqString = url + "/selectHotel";

	req.open('GET', reqString, true);
	
	var payload = {};

	req.addEventListener('load',function() {
	if (req.status >= 200 && req.status < 400) {
		var response = JSON.parse(req.responseText);
		
		//document.getElementById('status').textContent = response;
		
		payload = response;
		
		//console.log(response);
		//alert(response.name[0]);
		selectHOption(response);
		//document.getElementById('status').innerHTML = req.responseText;
		// uncomment to test //executeHTests();
	}else {
			// If a server error was received, post the response text to the log
			console.log("Error in network request: " + req.statusText);
	}
	});
	
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(payload));
	//req.send();
	//event.stopPropagation();
 }
//event.preventDefault();
};//);

//selectNights.addEventListener('click', function(event){
	//event.preventDefault();
function populateNights(){

if(allowN){
	allowN = false;
	var req = new XMLHttpRequest();

	var reqString = url + "/selectNights";

	req.open('GET', reqString, true);
	
	var payload = {};

	req.addEventListener('load',function() {
	if (req.status >= 200 && req.status < 400) {
		var response = JSON.parse(req.responseText);
		
		//document.getElementById('status').textContent = response;
		
		payload = response;
		
		//console.log(response);
		//alert(response.name[0]);
		selectNOption(response);
		//document.getElementById('status').innerHTML = req.responseText;

	}else {
			// If a server error was received, post the response text to the log
			console.log("Error in network request: " + req.statusText);
	}
	});
	
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(payload));
	//req.send();
}	//event.stopPropagation();

};//);

//selectVehicle.addEventListener('click', function(event){
	//event.preventDefault();
function populateVehicle(){

if(allowV){
	allowV = false;
	var req = new XMLHttpRequest();

	var reqString = url + "/selectVehicle";

	req.open('GET', reqString, true);
	
	var payload = {};

	req.addEventListener('load',function() {
	if (req.status >= 200 && req.status < 400) {
		var response = JSON.parse(req.responseText);
		
		//document.getElementById('status').textContent = response;
		
		payload = response;
				
		//console.log(response);
		//alert(response.name[0]);
		selectVOption(response);
		//document.getElementById('status').innerHTML = req.responseText;
		// uncomment to test //executeVTests();
	}else {
			// If a server error was received, post the response text to the log
			console.log("Error in network request: " + req.statusText);
	}
	});
	
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(payload));
	//req.send();
}

//event.stopPropagation();
};//);

//selectGas.addEventListener('click', function(event){
	//event.preventDefault();
function populateGas(){

if(allowG){
	allowG = false;
	var req = new XMLHttpRequest();

	var reqString = url + "/selectGas";

	req.open('GET', reqString, true);
	
	var payload = {};

	req.addEventListener('load',function() {
	if (req.status >= 200 && req.status < 400) {
		var response = JSON.parse(req.responseText);
		
		//document.getElementById('status').textContent = response;
		
		payload = response;
		
		//console.log(response);
		//alert(response.name[0]);
		selectGOption(response);
		//document.getElementById('status').innerHTML = req.responseText;

	}else {
			// If a server error was received, post the response text to the log
			console.log("Error in network request: " + req.statusText);
	}
	});
	
	req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(payload));
	//req.send();
}

//event.stopPropagation();
};//);

function testNumericalQuery(){
	
	travelDistance = Number(travelDistance);
	
	if((isNaN(travelDistance)) || travelDistance === 0){
		//console.log("Query is not a number - " + travelDistance);
		
		document.getElementById("warn").innerHTML = "You got here the wrong way. Click the link to get to the right page";
		var url = "http://52.11.246.123:3000";
		var result = url.link("http://52.11.246.123:3000");
		document.getElementById("showHomepage").innerHTML = result;
		
		document.getElementById("select-container").style.display = "none";
		document.getElementById("calcAll").style.display = "none";
	}
	else
	{
		//console.log("Query is  a number - " +  travelDistance);

	}
	
}

function doMath(){
        
        var gPrice = getValue(selectGas);
        var miles = travelDistance;
        var mpg = getValue(selectVehicle);

		var gasCost = +(((miles/mpg) * gPrice).toFixed(2));
		
		var hotelPrice = getValue(selectHotel);
		var totalNights = getValue(selectNights);

		var stayPrice = +((hotelPrice * totalNights).toFixed(2));
	
		var totalPrice = +((gasCost + stayPrice).toFixed(2));
		
        document.getElementById("totalGasPrice").innerHTML = "Gas Price: $" + gasCost;
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

calculateBtn.addEventListener('click', function(event){
	
	doMath();
	
	//console.log(travelDistance);
});

var hotelUrlMap = {
	"500" : "http://www3.hilton.com/resources/media/hi/BUEHIHH/en_US/img/shared/full_page_image_gallery/main/HH_exec1n_4_675x359_FitToBoxSmallDimension_Center.jpg",
	"200" : "http://www.wyndhamworldwide.com/sites/default/files/media/Days-1.jpg",
	"700" : "http://tampabay.grand.hyatt.com/content/dam/PropertyWebsites/grandhyatt/tparw/Media/All/Grand-Hyatt-Tampa-Bay-P126-Exterior-from-Road-1280x427.jpg",
	"300" : "",
	"100" : "",
	"400" : "",
	"70" : "http://www.laquintacolumbusedinburgh.com/content/dam/lq/US/IN/columbus/6445/suite/suite.lqimg.slide.jpg",
	"900" : "",
	"250" : "",
	"80" : ""
};