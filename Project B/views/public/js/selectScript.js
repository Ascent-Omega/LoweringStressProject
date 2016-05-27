var url = "http://52.11.246.123:3000";
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  });
var selectHotel = document.getElementById("selectHotel");
var selectVehicle = document.getElementById("selectVehicle");
var selectNights = document.getElementById("selectNights");
var allowH = true;
var allowN = true;
var allowV = true;



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

selectHotel.addEventListener('click', function(event){

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
		

		
		console.log(response);
		//alert(response.name[0]);
		selectHOption(response);
		//document.getElementById('status').innerHTML = req.responseText;

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
});

selectNights.addEventListener('click', function(event){
	//event.preventDefault();

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
		

		
		console.log(response);
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
}	event.stopPropagation();

});

selectVehicle.addEventListener('click', function(event){
	//event.preventDefault();
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
		

		
		console.log(response);
		//alert(response.name[0]);
		selectVOption(response);
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

event.stopPropagation();
});
/*
function works(input){
	var dateObj = {};
	for (key in input) {
	  var obj = input[key];
	  var day = obj.DayPrice;
	  for (dt in day) {
		var dtObj = day[dt];
		var dtKey = dtObj.Date;    
		if (dateObj.hasOwnProperty(dtKey)) {
			dateObj[dtKey].push({ Code: obj.attributes.Code, Rate: dtObj.Rate });
		} else {
			dateObj[dtKey] = [{ Code: obj.attributes.Code, Rate: dtObj.Rate }];
		}
	  }
	}

	for(d in dateObj) {
		var obj = dateObj[d];
		var row = '<tr><td>' + d + '</td><td><ul>';
	  $.each(obj, function(i, val) {
		console.log(val);
		row += '<li>' + val.Code + ': ' + val.Rate + '</li>';
	  });
	  row += '</ul></td></tr>';
	  $('#target').find('tbody').append(row);
	}
}


function loadJSON2(jsonObj, key, selectId, appendTarget) {
  // Get the target to append
  appendTarget = appendTarget ? document.querySelector(appendTarget) : document.body;
  var arr = JSON.parse(jsonObj);
  // Create select and set id.
  var select = document.createElement('select');
  if (selectId != null) {
      select.id = selectId;
  }
  
  // Loop through array
  arr.forEach(function(item) {
    var option = document.createElement('option');
    option.text = item[key];
    select.add(option);
  });

  appendTarget.appendChild(select);
}

function makeTable() {
  var req = new XMLHttpRequest();
  var requestString = url + "/select";
  req.open("GET", requestString, true);
  // Create a load event for the AJAX request (asychronous)
  req.addEventListener('load', function() {
    // Check to make sure valid response is received
    if (req.status >= 200 && req.status < 400) {
      // Parse out the JSON information
      var infoReceived = JSON.parse(req.responseText);
	  console.log("Look Here: "+infoReceived);
		//works(infoReceived);
		//loadJSON2(infoReceived);
      //constructTable(infoReceived);
    } else {
      // If a server error was received, post the response text to the log
      console.log("Error in network request: " + request.statusText);
    }
  });
  // Send the request and prevent default refresh
  req.send(null);
}
/*get elements
var hotel_name = document.getElementById('name');
var price_per_night = document.getElementById('room_price');
var submitBtn = document.getElementById('submitBtn');

// was working here.
/
//creates an html table within a form to store workout data
//content - server response from a sequel query
function makeTable(content){
    //get table elements and create row
    var table = document.getElementById('hotelTable');
    var header = document.getElementById('header');
    var row = document.createElement('tr');

    table.hidden = false; //hide the table

    //if there is no header row, then create one
    if(header == null){
        var headerRow = document.createElement('tr');
        headerRow.id = 'header';
        table.appendChild(headerRow);

        for(prop in content[0]){
            if(prop != 'id') {
                var newHeader = document.createElement('th');
                headerRow.appendChild(newHeader);
                newHeader.textContent = prop.toString().toUpperCase();
            }
        }
    }

    //create a hidden input and append it to the latest row
    table.appendChild(row);
    var hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.id = content[0].id;
    hiddenField.className = 'hiddenInput';
    row.appendChild(hiddenField);

    //create table cells and fill them with textboxes occupied by the submitted form data
    for (prop in content[0]) {
        if (prop != 'id') {
            var data = document.createElement('td');
            var field = document.createElement('input');
            row.appendChild(data);
            data.appendChild(field);
            field.type = 'text';
            field.value = content[0][prop];
            field.id = prop.toString() + hiddenField.id;
        }
    }

    //print a status message and return an object containing the current row and id
    document.getElementById('status').textContent = 'Status: Row successfully inserted into database.';
    return {row: row, hidden: hiddenField.id};
}

//form submit button event listener
submitBtn.addEventListener('click',function(event){
    var btnType = document.getElementById('insert'); //get form submit button
    var valid = true; //boolean flag indicating whether or not all form fields are filled

    //form a AJAX request and its content
    var request = new XMLHttpRequest();
    var payload = {
        name: hotel_name.value,
        room_price_per_night: price_per_night.value,
        btnType: btnType.name
    };

    //ensure all form fields have data
    for(prop in payload){
        if(payload[prop] == ""){
            valid = false;
            document.getElementById('status').textContent = 'Status: Unable to insert row. Make sure all form fields have data.'
        }
    }

    //send the request if all form fields have data, then insert the row into the html and database table
    if(valid) {

        request.open('POST', '/', true);

        request.addEventListener('load', function () {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                insertRow(response);
            }
        });

        //send the request
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(payload));
    }

    event.preventDefault();
});

makeTable();
*/