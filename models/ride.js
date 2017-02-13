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
  rideBeginLat: Schema.Types.Double,
  rideBeginLong: Schema.Types.Double,
  rideEndLat: Schema.Types.Double,
  rideEndLong: Schema.Types.Double,
  estimatedDistance: Schema.Types.Double,
  estimatedArrival: Schema.Types.Double,
  actualDistance: Schema.Types.Double,
  actualArrival: Schema.Types.Double,
  rideTerminated: Boolean,
  pricePaid: Boolean,
  cashedAmount: Schema.Types.Long,
  rideRating: Number,
  rideActions: [{
    actionType: String,
    issuedBy: Schema.Types.ObjectId,
    rideStatus: String,
    timestamp: {type: Date, default: Date.now}
  }]
}, {collection: 'rides', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Ride", rideSchema);
