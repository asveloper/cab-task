var express = require('express');
var router = express.Router();
var config = require("config");
var jwt    = require('jsonwebtoken');
var User = require("../models/user");

router.get('/generate_token', function(req, res, next) {

  var token = jwt.sign(new Date(), config.get('secret'));

  User.findOneAndUpdate({
    email: "arslan@gmail.com",
    password: "password",
  }, {
    email: "arslan@gmail.com",
    password: "password",
    jwtAccessToken: token
  }, {upsert: true, 'new': true}, function(err, res) {
      if (err) console.log(err);
  });

  res.send({token: token});
});

module.exports = router;
