// necessary modules
var express = require("express");
var request = require('request');
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
var mysql = require('./dbcon.js');
var path = require('path');

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views/public"));
app.set("port", 3000);

var createHotel = "CREATE TABLE IF NOT EXISTS `hotel`("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "room_price_per_night INT(11))";
        
mysql.pool.query(createHotel, function(err){
if(err){
	console.log(err);
	return;
}
});

var createNights = "CREATE TABLE IF NOT EXISTS `nights`("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "total_nights INT(11))";
        
mysql.pool.query(createNights, function(err){
if(err){
	console.log(err);
	return;
}
});

var createCars = "CREATE TABLE IF NOT EXISTS `cars`("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
		"make VARCHAR(255) NOT NULL,"+
		"model VARCHAR(255) NOT NULL,"+
		"year INT(11),"+
        "miles_per_gallon INT(11))";
        
mysql.pool.query(createCars, function(err){
if(err){
	console.log(err);
	return;
}
});
var createGas = "CREATE TABLE IF NOT EXISTS `gas`("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
		"station_name VARCHAR(255) NOT NULL,"+
		"gas_type VARCHAR(255) NOT NULL,"+
        "price INT(11))";
        
mysql.pool.query(createGas, function(err){
if(err){
	console.log(err);
	return;
}
});

app.get('/',function(req,res,next){
    //load the homepage
	//var context = {};
    //res.render('index', context); 
	res.sendFile(path.join(__dirname + '/views/public/app/index.html'));
});
/*
app.get('/index',function(req,res,next){
    //load the index
	var context = {};
    res.render('index', context); 
});

app.post('/',function(req,res,next){
    //load the homepage
	//var context = {};
    res.redirect.get('/'); 
});
*/
app.get('/select', function(req, res, next) {
  var context = {};
 
  res.render('select', context);
  
  
});
app.get('/selectHotel', function(req, res, next) {
  // Used to retrieve rows that are sent back to client for display
  mysql.pool.query('SELECT name,room_price_per_night FROM hotel', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	
    var tableInfo = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.end(tableInfo);
	
	
	

//	for (var i = 0; i < rows.length; i++) {
//		console.log(rows[i].name) + ", " +console.log(rows[i].room_price_per_night);
//	};


  });
});

app.get('/selectVehicle', function(req, res, next) {
  // Used to retrieve rows that are sent back to client for display
  mysql.pool.query('SELECT make,model,year,miles_per_gallon FROM cars', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	
    var tableInfo2 = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.end(tableInfo2);
	
	
	

//	for (var i = 0; i < rows.length; i++) {
//		console.log(rows[i].name) + ", " +console.log(rows[i].room_price_per_night);
//	};


  });
});

app.get('/selectNights', function(req, res, next) {
  // Used to retrieve rows that are sent back to client for display
  mysql.pool.query('SELECT total_nights FROM nights', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	
    var tableInfo3 = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.end(tableInfo3);
	
	
	

//	for (var i = 0; i < rows.length; i++) {
//		console.log(rows[i].name) + ", " +console.log(rows[i].room_price_per_night);
//	};


  });
});

app.get('/selectGas', function(req, res, next) {
  // Used to retrieve rows that are sent back to client for display
  mysql.pool.query('SELECT station_name,gas_type,price FROM gas', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
	
    var tableInfo = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.end(tableInfo);
	
	
	

//	for (var i = 0; i < rows.length; i++) {
//		console.log(rows[i].name) + ", " +console.log(rows[i].room_price_per_night);
//	};


  });
});
/*
// does not work - er_bad_null_error
app.post('/',function(req,res,next){
	if (req.body.btnType == 'insert') {
		mysql.pool.query("INSERT INTO hotel (`name`, `room_price_per_night`) VALUES (?, ?)", [req.query.name, req.query.room_price_per_night], 
			function(err, result){
			if(err){
					console.log(err);
					return;
			}
		
	
		mysql.pool.query('SELECT * FROM hotel WHERE id=?', [result.insertId], function (err, rows, fields) {
                    if (err) {
                        next(err);
                        return;
                    }

                    //respond to client with the data in the row that was just inserted
                    var table = JSON.stringify(rows);
                    res.type('text/plain');
                    res.send(table);
                });
			});
		}
});






app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});


///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});
*/
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});