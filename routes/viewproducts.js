//viewproducts.js page
//@author: Sivaraman
//@description: This page is responsible for viewing the users.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/', function(req, res, next) {
  
  var productId=req.query.productId;
  var category=req.query.category;
  var keyword=req.query.keyword;

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });

//var queryString="SELECT * FROM products WHERE productId LIKE '%"+productId+"' AND title LIKE '%"+ keyword +"' AND groups LIKE '%"+category+"';";
  var queryString="SELECT * FROM products p INNER JOIN productcategory pc ON p.productID=pc.productID INNER JOIN categories c WHERE p.productID="+productId+" AND c.category LIKE'%"+category+"' AND p.title LIKE'%"+keyword+"' GROUP BY p.productID";
  console.log(queryString);
  	connection.query(queryString,function(err, rows) {
    	 res.json({product_list:rows});
 	  });

});

module.exports = router;
