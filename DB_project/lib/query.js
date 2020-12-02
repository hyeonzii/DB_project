const query = {};

mysql = require('mysql');
const { response } = require('../app');
query.pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'student_table',
    password: '1234'
});

// find user id and password from database
query.findid = function (id, callback) {
    var userfindquery = "SELECT 아이디 as username, 비밀번호 as password, 학번 as stunum, 이름 as name FROM student_info WHERE 아이디 = \"" + id + "\"";
    query.pool.getConnection(function (err, connection) {
        connection.query(userfindquery, function (err, rows) {
            user = {};
            if (err) {
                console.error("err : " + err);
                return callback(err, false);
            }
            connection.release();
            if(JSON.stringify(rows) === "[]") {
                console.log("No matching id : " + id);
                return callback(null, false);
            } else {
                console.log("Found matching id : " + rows[0].username);
                user.username = rows[0].username;
                user.password = rows[0].password;
                user.stunum = rows[0].stunum;
                user.name = rows[0].name;
            }
        callback(null, user);
    });
})}

// find user name from student number
query.findname = function (stunum) {
    var namefindquery = "SELECT 이름 as name FROM student_info WHERE 학번 = \"" + stunum + "\"";
    query.pool.getConnection(function (err, connection) {
        connection.query(userfindquery, function (err, rows) {
            ret = {};
            if (err) {
                console.error("err : " + err);
                return err;
            }
            connection.release();
            if(JSON.stringify(rows) === "[]") {
                return false;
            } else {
                ret = stunum + " " + rows[0].name;
                return ret;
            }
    });
})}

query.getnoticelist = function (deptnum) {
    console.log("get notices");
    var getnoticelistquery = "SELECT 제목 as name, 게시자 as admin, 작성시간 as time FROM notice_board WHERE 학정번호 = \"" + deptnum + "\"";
    query.pool.getConnection(function (err, connection) {
        connection.query(getnoticelistquery, function (err, rows) {
            if (err) {
                console.error("err : " + err);
                return err;
            }
            connection.release();
            if(JSON.stringify(rows) === "[]") {
                return false;
            } else {
                console.log(rows.length);
                return row;
            }
        });
})}

query.checkexist = async function (id, name) {
    console.log("register new user");
    var checkexistinguser = "SELECT * \
                             FROM student_info \
                             WHERE 아이디 = ? or 학번 = ?";
    query.pool.getConnection(function (err, connection) {
        connection.query(checkexistinguser, [id, name], function (err, rows) {
            console.log("check : " + id + name);
            if (err) {
                console.error("err : " + err);
                return err;
            }
            connection.release();
            if(JSON.stringify(rows) === "[]") {
                return false;
            } else {
                return true;
            }
        });
})}

// query.register = async function (id, name, stunum, pwd, dept, phone, mail, callback) {
//     var checkresult = await query.checkexist(id, name);
//     if( checkresult === false ) {
//         return callback(err, "exist");
//     }
//     else if( checkresult === false ) {
//         var checkexistinguser = "INSERT INTO student_info(학번, 이름, 아이디, 비밀번호, 학과, 전화번호, 메일) \
//                                  VALUES(?, ?, ?, ?, ?, ?, ?)";
//         console.log("register new user");
//         query.pool.getConnection(function (err, connection) {
//             connection.query(checkexistinguser, [id, name, stunum, pwd, dept, phone, mail], function (err, rows) {
//                 if (err) {
//                     console.error("err : " + err);
//                     connection.release();
//                     return callback(err, "failed");
//                 }
//                 connection.release();
//                 return callback(err, "added");
//             });
//         })
//     }
// }


query.register = async function (id, name, stunum, pwd, dept, phone, mail, callback) {
    var insertuser = "INSERT INTO student_info(학번, 이름, 아이디, 비밀번호, 학과, 전화번호, 메일) \
                                VALUES(?, ?, ?, ?, ?, ?, ?)";
    console.log("register new user");
    query.pool.getConnection(function (err, connection) {
        connection.query(insertuser, [id, name, stunum, pwd, dept, phone, mail], function (err, rows) {
            if (err) {
                console.error("err : " + err);
                connection.release();
                return callback(err, "failed");
            }
            connection.release();
            return callback(err, "added");
        });
    });
}

module.exports = query;
