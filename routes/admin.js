//admin.js page
//@author: Sivaraman
//@description: This is the app.js page that displays the customer's answers for the admin.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET admin page. */
router.get('/', function(req, res, next) {
  
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });
  var queryString= 'SELECT * FROM answers';
  
  connection.query(queryString,function(err, rows) {
	res.render('admin', { data: rows });
  });
});
module.exports = router;
