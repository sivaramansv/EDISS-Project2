//register.js page
//@author: Sivaraman
//@description: This page is responsible for registering the users.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/',function(req, res) {
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });

connection.connect();

if(req.query.fName==""||req.query.lName==""||req.query.address==""||req.query.city==""||req.query.state=="")
{
  res.json({message:"There was a problem with the registration"});
}
if(req.query.email==""||req.query.user==""||req.query.password==""||req.query.zip.length<5)
{
  res.json({message:"There was a problem with the registration"});  
}
if(req.query.state.length < 2 || req.query.state.length > 2 )
{
  res.json({message:"There was a problem with the registration"});   
}

var data = {
  fName:req.query.fName,
  lName:req.query.lName,
  address:req.query.address,
  city:req.query.city,
  state:req.query.state,
  zip:req.query.zip,
  email:req.query.email,
  user:req.query.uName,
  password:req.query.pWord,
  role:"customer",
 };
 
connection.query("INSERT INTO login set ? ",data,function(err, rows, fields) {
    if (err) res.json({message:"There was a problem with the registration"});
    else res.json({message:"Your account has been registered"});  
});
 
connection.end();

});


module.exports = router;
