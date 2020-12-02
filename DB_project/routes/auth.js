var express = require('express');
var router = express.Router();
var query = require('../lib/query');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("auth", {
    title: 'auth'
  });
});

// router.post('/register', async function(req,res,next){
//   var id = req.body.id;
//   var name = req.body.name;
//   var stunum = req.body.studentnum;
//   var pwd = req.body.password;
//   var dept = req.body.department;
//   var phone = req.body.phonenum;
//   var mail = req.body.email;
//   var checkresult = await query.checkexist(id, name);
//   if( checkresult) {
//     console.log("check");
//   } else {
//     console.log("no check");
//   }
//   if( checkresult === true) {
//     query.register(id, name, stunum, pwd, dept, phone, mail, function(err, result) {
//       if(err) {
//         res.send("<script>alert('오류가 발생했습니다.');window.location.href = '/auth';</script>");
//       }
//       else if(result === true) {
//         res.send("<script>alert('등록되었습니다.');window.location.href = '/auth';</script>");
//       } else {
//         res.send("<script>alert('오류가 발생했습니다.');window.location.href = '/auth';</script>");
//       }
//     })
//   } 
//   else {
//     res.send("<script>alert('이미 존재하는 사용자 또는 아이디입니다.');window.history.back();</script>");
//   }
// });


// router.post('/register', async function(req,res,next){
//   var id = req.body.id;
//   var name = req.body.name;
//   var stunum = req.body.studentnum;
//   var pwd = req.body.password;
//   var dept = req.body.department;
//   var phone = req.body.phonenum;
//   var mail = req.body.email;
  
//   query.register(id, name, stunum, pwd, dept, phone, mail, function(err, result) {
//     if(result === "exist") {
//       res.send("<script>alert('오류가 발생했습니다.');window.location.href = '/auth';</script>");
//     }
//     else if(result === "added") {
//       res.send("<script>alert('등록되었습니다.');window.location.href = '/auth';</script>");
//     } else {
//       res.send("<script>alert('오류가 발생했습니다.');window.location.href = '/auth';</script>");
//     }
//   })
// });

router.post('/register', async function(req,res,next){
  var id = req.body.id;
  var name = req.body.name;
  var stunum = req.body.studentnum;
  var pwd = req.body.password;
  var dept = req.body.department;
  var phone = req.body.phonenum;
  var mail = req.body.email;
  
  var checkexist = query.checkexist(id, name).then(() => {
    console.log("check result : " + checkexist);
    if (checkexist === true) {
      res.send("<script>alert('존재하는 사용자 또는 아이디입니다.');window.location.href = '/auth';</script>");
    }
    else {
      query.register(id, name, stunum, pwd, dept, phone, mail, function(err, result) {
        if(err) {
          res.send("<script>alert('존재하는 사용자 또는 아이디입니다.');window.location.href = '/auth';</script>");
        }
        else if(result === "added") {
          res.send("<script>alert('등록되었습니다.');window.location.href = '/auth';</script>");
        } else {
          res.send("<script>alert('오류가 발생했습니다.');window.location.href = '/auth';</script>");
        }
      })
    }
  });

});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy(function(err){
    res.redirect('/auth');
  });
});

module.exports = router;
