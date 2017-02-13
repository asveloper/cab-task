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
  rideBeginPlace: String,
  rideEndPlace: String,
  rideBeginTime: Date,
  rideEndTime: Date,
  rideBeginLat: Schema.Types.Double,
  rideBeginLong: Schema.Types.Double,
  rideEndLat: Schema.Types.Double,
  rideEndLong: Schema.Types.Double,
  estimatedDistance: Schema.Types.Double,
  estimatedArrival: Schema.Types.Double,
  actualDistance: Schema.Types.Double,
  actualArrival: Schema.Types.Double,
  staticMapURL: String,
  rideTerminated: Boolean,
  pricePaid: Boolean,
  cabFare: Schema.Types.Long,
  cashedAmount: Schema.Types.Long,
  rideRating: Number,
  rideActions: [{
    actionType: String,
    issuedBy: Schema.Types.ObjectId,
    rideStatus: String,
    timestamp: {type: Date, default: Date.now}
  }],
  callDispatching: [{
    driverId : Schema.Types.ObjectId,
    first: Boolean,
    response: String,
    responseTime: Date
  }]
}, {collection: 'rides', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Ride", rideSchema);
