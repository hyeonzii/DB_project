var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user) {
    console.log(req.user)
    res.redirect('/');
  } else {
    res.render("login", { 
      title: 'login'
    });
  }
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy(function(err){
    res.redirect('/login');
  });
});

module.exports = router;
