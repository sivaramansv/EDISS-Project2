//index.js page
//@author: Sivaraman
//@description: This is the app.js page is responsible for verifying the login credentials of the user 
//and redirecting them to the required page.
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var isSession=req.session.user;
  //check if the user has logged in
  if(typeof isSession==='undefined')
  {  
    res.render('index',{tagline:''});
  }
  else
  {
     if(req.session.role=='customer')
     {
        res.render('answers',{ username:req.session.user }); 
     } 
     else
     {
        res.redirect('/admin');
     }
  }
});

router.post('/login',function(req, res) {
//check the credentials provided by user

 var userName=req.query.username;
 console.log(userName);
 var password=req.query.password;
 console.log(password);

 var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'medida',
    database : 'project1'
  });


var queryString = 'SELECT * FROM login where user = ? AND password = ?';
 
connection.query(queryString,[userName,password],function(err, rows) {
    if (err) throw err;

    if(rows.length > 0)
    {
        req.session.user=userName;
    	if(rows[0].role=="customer")
    	{   req.session.role="customer";
          res.json({"err_message":"The username and password is correct","Session ID":req.sessionID});
    		  //res.render('answers',{ username:req.session.user});
    	}
    	else
    	{
            req.session.role="admin";
           res.json({"err_message":"The username and password is correct","Session ID":req.sessionID});
    		  //res.redirect('/admin');

    	}
    }
    else
    {
    	var authenticationFail='Incorrect password or username. Try again.';
      res.json({"err_message":"The username and password is incorrect","Session ID":req.sessionID});
    	 //res.render('index', { tagline: authenticationFail });
    }
});
if(userName==''||password=='')
{
	var authenticationFail='Incorrect password/username';
  //res.json({"err_message":"The username and password is incorrect","Session ID":req.session.user});
    //res.render('index', { tagline: authenticationFail });
}

});

module.exports = router;
