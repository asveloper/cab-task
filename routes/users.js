var express = require('express');
var router = express.Router();
var config = require("config");
var jwt    = require('jsonwebtoken');
var User = require("../models/user");

router.get('/generate_token', function(req, res, next) {

  var token = jwt.sign(new Date(), config.get('secret'));

  var user = new User({
    email: "arslan@gmail.com",
    password: "password",
    jwtAccessToken: token
  });

  user.save((err) => { });

  res.send({token: token});
});

module.exports = router;
