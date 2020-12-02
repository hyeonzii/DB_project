var express = require('express');
var router = express.Router();
var query = require('../lib/query');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.user) {}
  else {
    res.redirect('auth');
  }
  console.log(req.user);
  res.render('index', { 
    title: 'main',
    usernum: req.user.stunum + "",
    username: req.user.name
   });
});

module.exports = router;
