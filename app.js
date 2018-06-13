var express = require('express');
var path = require('path');
var session = require('express-session')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
var mongooseConfig=require('./database/config')
var app = express();
const MongoStore = require('connect-mongo')(session);

app.use(cors({
  origin:"http://localhost:8080",
  credentials:true
}))
app.use(session({
  secret:'lzx',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 3600*1000*24*30} ,//是否为安全的cookie(是不是HTTPS)不是则false
  expires: 3600*1000*30,
  store: new MongoStore({
    url: 'mongodb://localhost/dangcrm',
    ttl: 60*60*24*30
})
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use("/api", require("./apiController/api"));

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
