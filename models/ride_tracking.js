'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  require('mongoose-long')(mongoose);

// Collected GPS tracking data during the ride
const rideTrackingSchema = new Schema({
  driverId: Schema.Types.ObjectId,
  latitude: Schema.Types.Long,
  longitude: Schema.Types.Long,
  accuracy: Schema.Types.Long,
  bearing: Schema.Types.Long,
  speed: Schema.Types.Long,
  altitude: Schema.Types.Long,
  timeStamp: {type: Date, default: Date.now}
}, {collection: 'ride_trackings', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("RideTracking", rideTrackingSchema);
