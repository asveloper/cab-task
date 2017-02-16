var User = require("../models/user");
var config = require("config");
var jwt    = require('jsonwebtoken');

// riders
User.findOneAndUpdate({
  email: "rider1@abc.com",
  password: "password",
}, {
  email: "rider1@abc.com",
  password: "password",
  jwtAccessToken:  jwt.sign(new Date(), config.get('secret')),
  userType: "rider"
}, {upsert: true, 'new': true}, function(err, res) {
    if (err) console.log(err);
});

User.findOneAndUpdate({
  email: "rider2@abc.com",
  password: "password",
}, {
  email: "rider2@abc.com",
  password: "password",
  jwtAccessToken:  jwt.sign(new Date(), config.get('secret')),
  userType: "rider"
}, {upsert: true, 'new': true}, function(err, res) {
    if (err) console.log(err);
});

// drivers
User.findOneAndUpdate({
  email: "driver1@abc.com",
  password: "password",
}, {
  email: "driver1@abc.com",
  password: "password",
  jwtAccessToken:  jwt.sign(new Date(), config.get('secret')),
  userType: "driver"
}, {upsert: true, 'new': true}, function(err, res) {
    if (err) console.log(err);
});


User.findOneAndUpdate({
  email: "driver2@abc.com",
  password: "password",
}, {
  email: "driver2@abc.com",
  password: "password",
  jwtAccessToken:  jwt.sign(new Date(), config.get('secret')),
  userType: "rider"
}, {upsert: true, 'new': true}, function(err, res) {
    if (err) console.log(err);
});
