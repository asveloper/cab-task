var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findOne((err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { title: 'Express', token: user.token });
    }
  })
});

router.get('/driver', function(req, res, next) {
  res.render('driver');
});

module.exports = router;
