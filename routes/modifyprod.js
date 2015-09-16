//modifyprod.js page
//@author: Sivaraman
//@description: This is the post.js page is responsible for posting the answers to the db.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/',function(req, res) {

var sessionID=req.sessionID;
var user_session_id=req.query.sessionID;
var role=req.session.role;

var productId=req.query.productId;
var productTitle=req.query.productTitle;
var productDescription=req.query.productDescription;

if(sessionID===user_session_id)
{
 if(req.session.role=="admin")
 {
 
  var queryString="UPDATE products SET"+" ";

  if(typeof productTitle!='undefined')
  {
    queryString+="title='"+productTitle+"'"+",";
  }
  if(typeof productDescription!='undefined')
  {
    queryString+="description='"+productDescription+"'"+",";
  }

  var finalQuery=queryString.substr(0,queryString.length-1);
  var finalString=finalQuery+"WHERE productID="+productId+";";

  console.log(finalString);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
    });

  connection.connect();
 
  connection.query(finalString,function(err, rows, fields) {
    if (err) res.json({message:"There was a problem with this action"});
    else res.json({message:"The product information has been updated"});  
  });
  connection.end();
 }
}
else
{
  res.json({message:"You are not logged in"});
}

});


module.exports = router;