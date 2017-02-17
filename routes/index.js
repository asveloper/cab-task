var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Cab' });
  if (req.query.token) {
    var socket = require('socket.io-client')('http://localhost:3000', {query: "token="+req.query.token});
    socket.emit("call cab");
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

router.get('/driver', function(req, res, next) {
  res.render('driver');
});

module.exports = router;
