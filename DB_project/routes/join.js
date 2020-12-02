var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("joinForm", { title: '회원가입'});
});

router.post('/register', function(req,res,next){
  console.log('req.body : ' + req.body);
  res.json(req.body);
});

module.exports = router;
