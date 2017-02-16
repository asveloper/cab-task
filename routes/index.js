var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Cab' });
  var socket = require('socket.io-client')('http://localhost:3000', {query: "token="+req.query.token});
  socket.emit("call cab");
  res.sendStatus(200);
});

router.get('/driver', function(req, res, next) {
  res.render('driver');
});

module.exports = router;
