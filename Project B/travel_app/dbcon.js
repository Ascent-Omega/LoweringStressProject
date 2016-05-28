var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'test',
  password: 'default',
  database: 'test'
});

module.exports.pool = pool;