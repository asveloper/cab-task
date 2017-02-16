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
var jwt    = require('jsonwebtoken');

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
require("./src/seeds");

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

io.use(function(socket, next){
    // console.log("Query: ", socket.handshake.query);
    // return the result of next() to accept the connection.
    if (socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, config.get('secret'), function(err, decoded) {
        if (err) {
          console.log("Authentication error");
          next(new Error('Authentication error'));
        } else {
          console.log("Authenticated!");
          return next();
        }
      });
    }

    // call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});


// socket connection
io.on('connection', function (socket) {

  socket.on('connect', function () {
    console.log("Connected!");
  });


  // authenticate events
  jwt.verify(socket.handshake.query.token, config.get('secret'), function(err, decoded) {
    if (err) {
      console.log("Authentication error");
      return;
    } else {
      console.log("Authenticated!");
      return;
    }
  });


  socket.on('call cab', function (data) {
    console.log("call cab...");
    console.log(data);

    // Broadcast to all drivers
    socket.broadcast.emit("request ride", {msg: 'ride requested', clientId: socket.id});

  });

  socket.on('accept ride', function (data) {
    console.log("accept ride...");
    console.log(data);

    if (data.driverId && data.clientId) {
      io.to(data.clientId).emit("on its way", {msg: 'driver is on its way', clientId: data.clientId});
    }

  });

  socket.on('disconnect', function () {
    console.log("disconnected");
  });

});

module.exports = app;
