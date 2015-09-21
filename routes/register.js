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

var fName=req.query.fName;
var lName=req.query.lName;
var address=req.query.address;
var city=req.query.city;
var state=req.query.state;
var zip=req.query.zip;
var email=req.query.email;
var user=req.query.uName;
var password=req.query.pWord;

if(typeof fName==='undefined'||typeof lName==='undefined'||typeof address==='undefined'||typeof city==='undefined')
{
  res.json({"message":"There was a problem with the registration"}); 
}
if(typeof state==='undefined'||typeof email==='undefined'||typeof user==='undefined'||typeof password==='undefined')
{
  res.json({"message":"There was a problem with the registration"});  
}  

if(state.length!=2 || zip.length!=5)
{
  res.json({"message":"There was a problem with the registration"}); 
}
else
{
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
    if (err) 
    {
      res.json({"message":"There was a problem with the registration"});
    }
    else
    {
      res.json({"message":"Your account has been registered"});  
    }
});
}
//connection.end();

});


module.exports = router;
