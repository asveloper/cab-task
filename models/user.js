'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  fname: { type: String, default: null },
  lname: { type: String, default: null },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  dob: { type: Date, default: '1/1/1950' },
  address: { type: String, default: 'abcd' },
  city: { type: String, default: 'istanbul' },
  state: { type: String, default: 'istanbul' },
  country: [{
    name: { type: String, default: null },
    countryCode: { type: String, default: 'TR' },
    phonePrefix: { type: String, default: '+90' }
  }],
  emergencyDetails: [{
    phone: { type: String, default: '1234567890' },
    name: { type: String, default: null },
    imgUrl: { type: String, default: null }
  }],
  recoveryEmail: { type: String, default: null },
  gpsLoc: {
    type: [Number],
    index: '2d'
  },
  latitudeDelta: { type: Number, default: 0.013 },
  longitudeDelta: { type: Number, default: 0.022 },
  userRating: { type: Number, default: 0 },
  phoneNo: { type: String, default: '1234567890' },
  profileUrl: { type: String, default: null },
  currTripId: { type: String, default: null },
  currTripState: { type: String, default: null },
  userType: { type: String, default: 'rider' },
  loginStatus: { type: Boolean, default: false },
  homeAddress: [{
    address: { type: String, default: null },
    mapCoordinates: {
      type: [Number],
      index: '2d'
    }
  }],
  workAddress: [{
    address: { type: String, default: null },
    mapCoordinates: {
      type: [Number],
      index: '2d'
    }
  }],
  // extra fields which were are not defined in the userSchema diagram
  verified: { type: Number, default: 0 },
  jwtAccessToken: { type: String, default: null },
  // new fields added
  carDetails: [{
    type: { type: String, default: 'hatchback' },
    company: { type: String, default: 'maruti suzuki' },
    color: { type: String, default: 'red' },
    regNo: { type: String, default: 'AB123CD' },
    carModel: { type: String, default: 'swift dzire' },
    regDate: { type: Date, default: '1/1/2016' }
  }],
  mapCoordinates: {
    type: [Number],
    index: '2d'
  },
  deviceId: { type: String, default: null },
  pushToken: { type: String, default: null },
  googleId: { type: String, default: null },
  googleToken: { type: String, default: null },
  facebookId: { type: String, default: null },
  facebookToken: { type: String, default: null },
  authyId: { type: String, default: null },
  lastLoginTime: { type: Date, default: null },
  activeStatus: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {collection: 'users', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("User", UserSchema);
