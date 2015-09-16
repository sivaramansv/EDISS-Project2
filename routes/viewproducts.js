//viewproducts.js page
//@author: Sivaraman
//@description: This page is responsible for viewing the users.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/', function(req, res, next) {
  
  console.log("Entered");

  var productId=req.query.productId;
  console.log(productId);
  var category=req.query.category;
  console.log(category);
  var keyword=req.query.keyword;
  console.log(keyword);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });

var queryString="SELECT * FROM products WHERE productId LIKE '%"+productId+"' AND title LIKE '%"+ keyword +"' AND groups LIKE '%"+category+"';";
  console.log(queryString);
  	connection.query(queryString,function(err, rows) {
    	 res.json({product_list:rows});
 	  });

});

module.exports = router;
