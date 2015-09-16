//post.js page
//@author: Sivaraman
//@description: This is the post.js page is responsible for posting the answers to the db.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/',function(req, res) {
if(req.session.user==undefined)
{
    render('index',{tagline:''});
}
console.log(req.session.user);
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });

connection.connect();

var data = {
  user: req.session.user,
  answer1:req.body.answersFromCustomer.question1Ans,
  answer2:req.body.answersFromCustomer.question2Ans,
  answer3:req.body.answersFromCustomer.question3Ans,
  feedback1:req.body.answersFromCustomer.feedback1,
  feedback2:req.body.answersFromCustomer.feedback2,
  feedback3:req.body.answersFromCustomer.feedback3,
 };
 
connection.query("INSERT INTO answers set ? ",data,function(err, rows, fields) {
    if (err) throw err;
    
});
 
connection.end();

});


module.exports = router;
