//update.js page
//@author: Sivaraman
//@description: This is the post.js page is responsible for updating the contact information.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/',function(req, res) {

var sessionID=req.sessionID;
var user_session_id=req.query.sessionID;
var userName=req.session.user;

var fName=req.query.fName;
var lName=req.query.lName;
var address=req.query.address;
var city=req.query.city;
var state=req.query.state;
var zip=req.query.zip;
var email=req.query.email;
var user=req.query.uName;
var password=req.query.pWord;
var role="customer";
console.log("Entered");
console.log("sessionID"+sessionID);
console.log("user_session_id"+user_session_id);
console.log("zip"+zip);
console.log("mail"+email);
console.log("user"+user);
console.log("User name:"+userName);

if(sessionID===user_session_id)
{
 console.log("Session Entered");
var queryString="UPDATE login SET"+" ";

if(typeof fName!='undefined')
{
  console.log("fName");
  queryString+="fName='"+fName+"'"+",";
}
if(typeof lName!='undefined')
{
  console.log("lName");
  queryString+="lName='"+lName+"'"+",";
}
if(typeof address!='undefined')
{
  console.log("address");
  queryString+="address='"+address+"'"+",";
}
if(typeof city!='undefined')
{
  console.log("city");
  queryString+="city='"+city+"'"+",";
}
if(typeof state!='undefined')
{
  console.log("state");
 if(state.length===2)
  {
    queryString+="state='"+state+"'"+",";
  }
}
if(typeof zip!='undefined')
{
  if(zip.length===5)
  {
    queryString+="zip='"+zip+"'"+",";
 }
}
if(typeof user!='undefined')
{ 
  req.session.user=user;
  console.log("Session changed:"+req.session.user);
  queryString+="user='"+user+"'"+",";
}
if(typeof password!='undefined')
{ 
  if(password.length > 0)
  {
    queryString+="password='"+password+"'"+",";
  }
}

var finalQuery=queryString.substr(0,queryString.length-1);
var finalString=finalQuery+"WHERE user='"+userName+"';";


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });
  
connection.connect();
 
connection.query(finalString,function(err, rows, fields) {
    if (err) res.json({message:"There was a problem with the registration"});
    res.json({message:"Your information has been updated"});  
});
connection.end();
}
else
{
  res.json({message:"You are not logged in"});
}

});


module.exports = router;