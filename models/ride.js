'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  require('mongoose-long')(mongoose),
  require('mongoose-double')(mongoose);

const rideSchema = new Schema({
  rideId: Schema.Types.ObjectId,
  clientId: Schema.Types.ObjectId,
  driverId: Schema.Types.ObjectId,
  rideBeginPlace: String, // the departure place we got from client
  rideEndPlace: String, // the destination we got from client , google geocoding
  rideBeginTime: Date,
  rideEndTime: Date,
  rideBeginLoc: {
    type: { type: String },
    coordinates: [Number]
  },
  rideEndLoc: {
    type: { type: String },
    coordinates: [Number]
  },
  estimatedDistance: Schema.Types.Double,
  estimatedArrival: Schema.Types.Double, // estimated arrival time in minutes
  actualDistance: Schema.Types.Double, //realised route’s length in kilometers
  actualArrival: Schema.Types.Double, // actual arrival time in minutes
  staticMapURL: String,  // url of static map showing the ride
  rideTerminated: Boolean,
  pricePaid: Boolean,
  cabFare: Schema.Types.Long, // amount to be paid recalculated  after the ride
  cashedAmount: Schema.Types.Long,
  rideRating: Number,
  rideStatus: String, // ride status code – the new status of the ride after the action
  rideActions: [{ {  //array of ride actions
    actionType: String, // predefined action types
    issuedBy: Schema.Types.ObjectId, // id of either the driver or the client
    timestamp: {type: Date, default: Date.now}
  }],
  callDispatching: [{ //array of call dispatch results
    userId : Schema.Types.ObjectId,
    first: Boolean, // true only in case of priority given
    response: String, // response: ACCEPT, REJECT, TIMED_OUT
    responseTime: Date
  }]
}, {collection: 'rides', versionKey: false, shardKey: { _id: true } });

rideSchema.index({ "rideBeginLoc": "2dsphere" });
rideSchema.index({ "rideEndLoc": "2dsphere" });

module.exports = mongoose.model("Ride", rideSchema);
