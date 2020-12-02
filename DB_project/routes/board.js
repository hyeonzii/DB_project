var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({storage: storage});
var query = require('../lib/query');

// // MySQL 로드
// // Connection Pool 생성
// var mysql = require('mysql');
// const { response } = require('../app');
// var pool = mysql.createPool({
//   connectionLimit: 5,
//   host: 'localhost',
//   user: 'root',
//   database: 'tutorial',
//   password: 'mypassword'
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(!req.user) {
    res.redirect("/auth");
  }
  var userinfo = req.user.stunum + " " + req.user.name;
  res.render('list', {
    user: userinfo,
    querymodule: query
   });
});

// // 목록 화면 GET
// router.get('/list/:page', function(req,res,next){
//   pool.getConnection(function (err, connection) {
//     var sqlForSelectList = "SELECT idx, creator_id, title, hit FROM notice_board";
//     connection.query(sqlForSelectList, function(err, rows) {
//       if (err) console.error("err : " + err);
//       console.log("rows : " + JSON.stringify(rows));

//       res.render("list", {title: "게시판 전체 글 조회", rows: rows});
//       connection.release();
//     });
//   });
// });

// // 글쓰기 화면 GET
// router.get('/write', function(req,res,next){
//   res.render('write', {title : "게시판 글 쓰기"});
// });

// // 글쓰기 로직 처리 POST
// router.post('/write', upload.single('userimage'), function(req,res,next){
//   var creator_id = req.body.creator_id;
//   var title = req.body.title;
//   var content = req.body.content;
//   var passwd = req.body.passwd;
//   var image = req.file.originalname;
//   var datas = [creator_id, title, content, passwd, image];

//   pool.getConnection(function(err, connection)  {
//     //Use the connection
//     var sqlForInsertBoard = "insert into board(creator_id, title, content, passwd, image) values(?,?,?,?,?)";
//     connection.query(sqlForInsertBoard, datas, function(err, rows) {
//       if (err) console.error("err : " + err);
//       console.log("rows : " + JSON.stringify(rows));
//       res.redirect("/board");
//       connection.release();
//     });
//   });
// });

// // 글조회 로직 처리 GET
// router.get('/read/:idx', function(req,res,next)
// {
//   var idx = req.params.idx;

//   pool.getConnection(function(err, connection){
//     var sql = "select idx, creator_id, title, content, hit, image from board where idx=?";
//     connection.query(sql,[idx],function(err, row){
//       if (err) console.error(err);
//       console.log("1개 글 조회 결과 확인 : ", row);
//       res.render("read", {title:"글 조회", row:row[0]});
//       connection.release();
//     });
//   });
// });

// // 글수정 화면 표시 GET
// router.get('/update', function(req,res,next)
// {
//   var idx = req.query.idx;

//   pool.getConnection(function(err, connection){
//     if (err) console.error("커넥션 객체 얻어오기 에러 : ", err);
//     var sql = "select idx, creator_id, title, content, hit, image from board where idx=?";
//     connection.query(sql,[idx],function(err, row){
//       if (err) console.error(err);
//       console.log("update에서 1개 글 조회 결과 확인 : ", row);
//       res.render("update", {title:"글 수정", row:row[0]});
//       connection.release();
//     });
//   });
// });

// // 글 수정 로직 처리 POST
// router.post('/update', function(req,res,next){
//   var idx = req.body.idx;
//   var creator_id = req.body.creator_id;
//   var title = req.body.title;
//   var content = req.body.content;
//   var passwd = req.body.passwd;
//   var datas = [creator_id, title, content, passwd];

//   pool.getConnection(function(err, connection)  {
//     var sql = "update board set creator_id=?, title=?, content=? where idx=? and passwd=?";
//     connection.query(sql, [creator_id, title, content, idx, passwd], function(err, result) {
//       console.log(result);
//       if(err) console.error("글 수정 중 에러 발생 err : ", err);
//       if(result.affectedRows == 0)
//       {
//         res.send("<script>alert('패스워드가 일치하지 않거나, 잘못된 요청으로 인해 값이 변경되지 않았습니다.');history.back();</script>");
//       }
//       else
//       {
//         res.redirect('/board/read/' + idx);
//       }
//       connection.release;
//     });
//   });
// });

module.exports = router;



// router.get('/', async function(req, res, next){ // 1
//   var page = Math.max(1, parseInt(req.query.page));   // 2
//   var limit = Math.max(1, 10); // 2
//   page = !isNaN(page)?page:1;                         // 3

//   var skip = (page-1)*limit; // 4
//   var count = await Post.countDocuments({}); // 5
//   var maxPage = Math.ceil(count/limit); // 6
//   var posts = await Post.find({}) // 7
//     .populate('author')
//     .sort('-createdAt')
//     .skip(skip)   // 8
//     .limit(limit) // 8
//     .exec();

//   res.render('list', {
//   });
// });