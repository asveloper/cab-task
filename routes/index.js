var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var socket = io.connect('http://localhost:3000');

  var callCab = confirm("Do you want to call cab?");

  if (callCab) {
    socket.emit('call cab', { clientId: 'client_id_here' });
  }

  socket.on('on its way', function (data) {
    console.log("on its way....");
    console.log(data);
  });

  res.sendStatus(200);

});

router.get('/driver', function(req, res, next) {
  res.render('driver');
});

module.exports = router;
