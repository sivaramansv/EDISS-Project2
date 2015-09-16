//logout.js page
//@author: Sivaraman
//@description: This page is responsible for destroying the session variables
var express = require('express');
var router = express.Router();

/* GET logout page. */
router.post('/', function(req, res, next) {

  var sessionID=req.sessionID;
  var user_session_id=req.query.sessionID;
  if(sessionID==user_session_id)
  {
  	res.json({message:"You have been logged out"});
  }
  else
  {
  	res.json({message:"You are not currently logged in"});	
  }
  req.session.destroy();
  //res.render('index', { tagline: "Logged out successfully" });
});

module.exports = router;