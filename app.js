var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var config = require('config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var User = require("./models/user");


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// connect to DB
mongoose.connect(config.get("MONGO_URL"));

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

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// generate token on server startup
require("./src/generate_token");

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);
server.listen(3000);
var io = require('socket.io')(server);

// socket connection
io.on('connection', function (socket) {

  console.log("Socket connected!");

  socket.on('call cab', function (data) {
    console.log("call cab...");
    console.log(data);

    User.findOne((err, user) => {
      if (err) {
        console.log(err);
      } else {
      // Broadcast to all drivers
        socket.broadcast.emit("request ride", {msg: 'ride requested', token: user.jwtAccessToken, clientId: socket.id});
      }
    });

  });

  socket.on('accept ride', function (data) {
    console.log("accept ride...");
    console.log(data);

    if (data.driverId && data.clientId && data.token) {
      // TODO: Save data in db
      io.to(data.clientId).emit("on its way", {msg: 'driver is on its way', clientId: data.clientId});
    }

  });

  socket.on('disconnect', function () {
    console.log("disconnected");
  });

});

module.exports = app;
