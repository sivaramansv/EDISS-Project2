//users.js page
//@author: Sivaraman
//@description: This page is responsible for getting the user list.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/', function(req, res, next) {
  
  var sessionID=req.sessionID;
  var inputSessionID=req.query.sessionID;
  if(sessionID===inputSessionID)
  {
 	if(req.session.role=="admin")
 	{
 
  var fName=req.query.fName;
  var lName=req.query.lName;

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });

    if(typeof fName === 'undefined' && typeof lName =='undefined')
    {
      var queryString="SELECT * FROM login";      
    }

    else if(typeof fName === 'undefined')
    {
      var queryString="SELECT * FROM login WHERE lName LIKE '%"+lName+"'";      
    }
    else if(typeof lName === 'undefined')
    {
      var queryString="SELECT * FROM login WHERE fName LIKE '%"+fName+"'";       
    }
    else if(fName===''||lName ==='')
    {
      var queryString="SELECT * FROM login"; 
    }
    else
    {
  	 var queryString="SELECT * FROM login WHERE fName LIKE '%"+fName+"' OR lName LIKE '%"+ lName +"'";
    }
  	connection.query(queryString,function(err, rows) {
	
	   res.json({user_list:rows});
 	  });
  
  }
 } 
 else
 {
 	res.json({message:'Admin should login'});
 }
});

module.exports = router;
