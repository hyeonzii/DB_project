var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var multer = require('multer');

var query = require('./lib/query');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//---------- Session and Passport Start ----------//
var parseurl = require('parseurl');
var session = require('express-session');
const { abort } = require('process');
var FileStore = require('session-file-store')(session);

app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new FileStore({path : './sessions/'})
}));

// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log("[!] passport : serialize : ", user.username);
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  console.log("[!] passport : deserialize : " + id);
  query.findid(id, function(err, user) {
    if(user) {
      console.log("[!] passport : deserialize : match found : " + user);
    } else {
      console.log("[!] passport : deserialize : no match");
      done(null, null);
    }
    done(null, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    query.findid(username, function(err, user) {
      console.log("user challenge start : " + user.username + ", " + user.password);
      if(err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        console.log("no id match");
        return done(null, false, {message:"id not match"});
      }
      else if (user.password === password) {
        console.log("match found");
        return done(null, user);
      }
      console.log("pwd not match");
      return done(null, false, {message:"pwd not match"});
    });
}));

app.post('/login/login_process',
  passport.authenticate('local', {
    //successRedirect: '/',
    failureRedirect: '/auth',
    failureFlash:false,
    session: true
  }),
  function (req, res) {
    req.session.save(function () {
      console.log('session saved');
      res.redirect('/');
    })
  }
);

//---------- Session and Passport End ----------//

// Use routers
var enrolment=require('./routes/enrolment');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var authRouter = require('./routes/auth');
var join = require('./routes/join');
var board = require('./routes/board');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/join', join);
app.use('/board', board);
app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.use('/enrolment',enrolment);

// Static file location set
app.use(express.static('./uploads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});


module.exports = app;

