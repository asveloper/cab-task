'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  require('mongoose-long')(mongoose);

const rideTrackingSchema = new Schema({
  driverId: Schema.Types.ObjectId,
  latitude: Schema.Types.Long,
  longtitude: Schema.Types.Long,
  timeStamp: {type: Date, default: Date.now}
}, {collection: 'ride_trackings', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("RideTracking", rideTrackingSchema);
