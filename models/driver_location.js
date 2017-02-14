'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const driverLocationSchema = new Schema({
  driverId: Schema.Types.ObjectId,
  location: {
    type: { type: String },
    coordinates: [Number] // longitude, latitude
  },
  timeStamp: {type: Date, default: Date.now}
}, {collection: 'driver_locations', versionKey: false, shardKey: { _id: true } });

driverLocationSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("DriverLocation", driverLocationSchema);
