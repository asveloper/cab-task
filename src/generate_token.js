var User = require("../models/user");
var config = require("config");
var jwt    = require('jsonwebtoken');

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
